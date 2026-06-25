import os
import time

user_dir = r"C:\Users\ITS"
print("Scanning C:\\Users\\ITS for portfolio files...")
match_count = 0
for root, dirs, files in os.walk(user_dir):
    # Skip folders that are not relevant or too large to speed up search
    skip_folders = ["node_modules", ".git", "AppData\\Local\\Microsoft", "AppData\\Local\\Package Cache", "AppData\\Roaming", "AppData\\Local\\Google\\Chrome\\User Data\\Default\\Cache"]
    if any(sf in root for sf in skip_folders):
        continue
    for f in files:
        if f.lower() in ["style.css", "index.html", "script.js"]:
            path = os.path.join(root, f)
            try:
                # Check file modification time to see if it was modified today
                mtime = os.path.getmtime(path)
                # Only check files modified in the last 24 hours
                if (time.time() - mtime) < 86400 * 2: # last 2 days
                    size = os.path.getsize(path)
                    if size > 100:
                        with open(path, 'r', encoding='utf-8', errors='ignore') as file:
                            content = file.read()
                        if "Huzaifa" in content or "Pharm.D" in content:
                            match_count += 1
                            print(f"FOUND: {path} | Size: {size} | Mtime: {time.ctime(mtime)}")
            except Exception as e:
                pass
print(f"Scan complete. Found {match_count} files.")
