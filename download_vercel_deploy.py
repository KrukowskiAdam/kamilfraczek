#!/usr/bin/env python3
import base64
import json
import os
import urllib.parse
import urllib.request


TOKEN = os.environ.get("VERCEL_TOKEN", "")
DEPLOYMENT_ID = os.environ.get("DEPLOYMENT_ID", "")
TEAM_ID = os.environ.get("TEAM_ID", "")
OUT_DIR = os.environ.get("OUT_DIR", "recovered")


def fail(message: str) -> None:
    raise SystemExit(message)


if not TOKEN:
    fail("Missing VERCEL_TOKEN env")
if not DEPLOYMENT_ID:
    fail("Missing DEPLOYMENT_ID env")


query_params = {}
if TEAM_ID:
    query_params["teamId"] = TEAM_ID
query = urllib.parse.urlencode(query_params)
query_suffix = f"?{query}" if query else ""

list_url = f"https://api.vercel.com/v6/deployments/{DEPLOYMENT_ID}/files{query_suffix}"
file_base = f"https://api.vercel.com/v8/deployments/{DEPLOYMENT_ID}/files"
headers = {"Authorization": f"Bearer {TOKEN}"}


def get_json(url: str):
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode("utf-8"))


def get_bytes(url: str) -> bytes:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as response:
        raw = response.read()

    try:
        payload = json.loads(raw.decode("utf-8"))
    except Exception:
        return raw

    if isinstance(payload, dict) and "data" in payload:
        data = payload.get("data")
        if isinstance(data, str):
            return base64.b64decode(data)

    return raw


def walk(node, prefix=""):
    if isinstance(node, list):
        for item in node:
            yield from walk(item, prefix)
        return

    if not isinstance(node, dict):
        return

    node_type = node.get("type")
    name = node.get("name")

    if node_type == "file" and name and node.get("uid"):
        yield (f"{prefix}{name}", node["uid"])
        return

    if node_type == "directory":
        next_prefix = f"{prefix}{name}/" if name else prefix
        yield from walk(node.get("children", []), next_prefix)


os.makedirs(OUT_DIR, exist_ok=True)

tree = get_json(list_url)
roots = tree if isinstance(tree, list) else tree.get("files", [])
files = list(walk(roots, ""))

if not files:
    fail("No files found for deployment")

print(f"Found files: {len(files)}")

for index, (path, uid) in enumerate(files, 1):
    target = os.path.join(OUT_DIR, path)
    os.makedirs(os.path.dirname(target), exist_ok=True)
    file_url = f"{file_base}/{uid}{query_suffix}"
    content = get_bytes(file_url)
    with open(target, "wb") as handle:
        handle.write(content)

    if index % 100 == 0 or index == len(files):
        print(f"Downloaded {index}/{len(files)}")

print(f"Done: {OUT_DIR}")
