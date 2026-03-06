#!/usr/bin/env bash
set -euo pipefail

if ! command -v curl >/dev/null 2>&1; then
  echo "Error: curl is required." >&2
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "Error: jq is required (brew install jq)." >&2
  exit 1
fi

usage() {
  cat <<'EOF'
Usage:
  ./restore-vercel.sh --deployment <DEPLOYMENT_ID> --token <VERCEL_TOKEN> [--output <DIR>] [--team <TEAM_ID>]

Examples:
  ./restore-vercel.sh --deployment 6S4bY9b4jNZcVb6tSU19tpMq1Ax3 --token "$VERCEL_TOKEN"
  ./restore-vercel.sh --deployment 6S4bY9b4jNZcVb6tSU19tpMq1Ax3 --token "$VERCEL_TOKEN" --output recovered
  ./restore-vercel.sh --deployment 6S4bY9b4jNZcVb6tSU19tpMq1Ax3 --token "$VERCEL_TOKEN" --team team_xxxxx

Notes:
  - This restores deployment snapshot files, not Git history.
  - Keep token private and rotate if exposed.
EOF
}

DEPLOYMENT_ID=""
VERCEL_TOKEN="${VERCEL_TOKEN:-}"
OUTPUT_DIR="recovered"
TEAM_ID=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --deployment)
      DEPLOYMENT_ID="${2:-}"
      shift 2
      ;;
    --token)
      VERCEL_TOKEN="${2:-}"
      shift 2
      ;;
    --output)
      OUTPUT_DIR="${2:-}"
      shift 2
      ;;
    --team)
      TEAM_ID="${2:-}"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ -z "$DEPLOYMENT_ID" || -z "$VERCEL_TOKEN" ]]; then
  echo "Error: --deployment and token are required (pass --token or set VERCEL_TOKEN env)." >&2
  usage
  exit 1
fi

LIST_API_BASE="https://api.vercel.com/v6/deployments/${DEPLOYMENT_ID}/files"
FILE_API_BASE="https://api.vercel.com/v8/deployments/${DEPLOYMENT_ID}/files"
QUERY=""
if [[ -n "$TEAM_ID" ]]; then
  QUERY="?teamId=${TEAM_ID}"
fi

mkdir -p "$OUTPUT_DIR"

TMP_FILES_JSON="$(mktemp)"
trap 'rm -f "$TMP_FILES_JSON"' EXIT

echo "Fetching file list for deployment: $DEPLOYMENT_ID"
curl -fsS \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  "${LIST_API_BASE}${QUERY}" > "$TMP_FILES_JSON"

FILE_COUNT="$(jq '
  def walk($prefix):
    if type == "array" then
      .[] | walk($prefix)
    elif type == "object" then
      if .type == "file" and (.uid? != null) and (.name? != null) then
        { path: ($prefix + .name), uid: .uid }
      elif .type == "directory" then
        ((.children // []) | walk($prefix + (.name // "") + "/"))
      else
        empty
      end
    else
      empty
    end;

  [
    (
      if type == "array" then .
      elif (.files? | type) == "array" then .files
      else []
      end
      | walk("")
    )
  ] | length
' "$TMP_FILES_JSON")"
if [[ "$FILE_COUNT" -eq 0 ]]; then
  echo "No files returned from API. Check deployment ID, token scope, and optional team ID." >&2
  exit 1
fi

echo "Downloading ${FILE_COUNT} files into: $OUTPUT_DIR"

jq -r '
  def walk($prefix):
    if type == "array" then
      .[] | walk($prefix)
    elif type == "object" then
      if .type == "file" and (.uid? != null) and (.name? != null) then
        { path: ($prefix + .name), uid: .uid }
      elif .type == "directory" then
        ((.children // []) | walk($prefix + (.name // "") + "/"))
      else
        empty
      end
    else
      empty
    end;

  (
    if type == "array" then .
    elif (.files? | type) == "array" then .files
    else []
    end
    | walk("")
  ) | @base64
' "$TMP_FILES_JSON" | while IFS= read -r row; do
  item="$(printf '%s' "$row" | base64 --decode)"
  path="$(printf '%s' "$item" | jq -r '.path')"
  uid="$(printf '%s' "$item" | jq -r '.uid')"

  target_path="${OUTPUT_DIR}/${path}"
  mkdir -p "$(dirname "$target_path")"

  curl -fsS \
    -H "Authorization: Bearer $VERCEL_TOKEN" \
    "${FILE_API_BASE}/${uid}${QUERY}" \
    --output "$target_path"
done

echo "Done. Files restored in: $OUTPUT_DIR"
