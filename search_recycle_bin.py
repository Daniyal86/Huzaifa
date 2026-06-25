import os
import winshell

try:
    r = list(winshell.recycle_bin())
    print(f"Total items in Recycle Bin: {len(r)}")
    for item in r:
        original_path = item.original_filename()
        if "Huzaifa" in original_path or "index.html" in original_path or "style.css" in original_path:
            print(f"Match: {item.filename()} -> {original_path}")
except Exception as e:
    print("Error querying Recycle Bin:", e)
