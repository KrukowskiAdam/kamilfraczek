#!/usr/bin/env python3
from pathlib import Path
import hashlib
import shutil
import sys


def main() -> int:
    if len(sys.argv) < 2:
        print("Usage: sanitize_recovered_names.py <source_dir> [target_dir]")
        return 1

    source = Path(sys.argv[1]).resolve()
    if not source.exists() or not source.is_dir():
        print(f"Source dir not found: {source}")
        return 1

    if len(sys.argv) >= 3:
        target = Path(sys.argv[2]).resolve()
    else:
        target = source.parent / f"{source.name}-clean"

    if target.exists():
        shutil.rmtree(target)
    shutil.copytree(source, target)

    renamed = 0
    removed_duplicates = 0
    conflict_renames = 0

    for file_path in sorted(target.rglob("*"), key=lambda x: len(str(x)), reverse=True):
        if not file_path.is_file() or "?" not in file_path.name:
            continue

        base, query = file_path.name.split("?", 1)
        qhash = hashlib.sha1(query.encode("utf-8")).hexdigest()[:8]
        safe_name = f"{base}__q_{qhash}"
        destination = file_path.with_name(safe_name)

        if destination.exists():
            if destination.is_file() and file_path.read_bytes() == destination.read_bytes():
                file_path.unlink()
                removed_duplicates += 1
                continue

            index = 1
            while destination.exists():
                destination = file_path.with_name(f"{safe_name}_{index}")
                index += 1
            conflict_renames += 1

        file_path.rename(destination)
        renamed += 1

    all_files = [x for x in target.rglob("*") if x.is_file()]
    with_question = [x for x in all_files if "?" in x.name]

    print(f"target={target}")
    print(
        f"renamed={renamed} removed_duplicates={removed_duplicates} conflict_renames={conflict_renames}"
    )
    print(f"files={len(all_files)} with_question={len(with_question)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
