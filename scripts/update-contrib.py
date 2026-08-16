#!/usr/bin/env python3
"""Fetch daily contribution counts from the public GitHub profile page
and write data/contributions.json (calendar-year, counts per day).

Graceful: on any fetch/parse failure keep the existing file and exit 0,
so the workflow never breaks because of this step.
"""
import json
import re
import sys
import urllib.request
from pathlib import Path

URL = "https://github.com/users/xiuxxx0/contributions"
OUT = Path("data/contributions.json")


def main() -> int:
    try:
        req = urllib.request.Request(URL, headers={"User-Agent": "github-actions-contrib-calendar"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            html = resp.read().decode("utf-8", "replace")
    except Exception as exc:  # noqa: BLE001
        print(f"fetch failed, keeping existing calendar: {exc}", file=sys.stderr)
        return 0

    if "data-count" not in html:
        print("no contribution data in page, keeping existing calendar", file=sys.stderr)
        return 0

    pairs = [
        (m.group(1), int(m.group(2)))
        for m in re.finditer(r'data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-count="(\d+)"', html)
    ]
    if not pairs:
        print("no contribution days found, keeping existing calendar", file=sys.stderr)
        return 0

    year = int(max(d for d, _ in pairs)[:4])
    days = [{"d": d, "c": c} for d, c in pairs if d.startswith(str(year))]
    total = sum(e["c"] for e in days)
    OUT.write_text(
        json.dumps({"year": year, "total": total, "days": days}, ensure_ascii=False),
        encoding="utf-8",
    )
    print(f"calendar updated: {len(days)} days, {total} contributions")
    return 0


if __name__ == "__main__":
    sys.exit(main())
