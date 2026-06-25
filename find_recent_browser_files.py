import os
import time

browser_dir = r"C:\Users\ITS\.gemini\antigravity\brain\a9193afc-5de4-4352-a5ac-574be203aa3c\browser"
now = time.time()
if os.path.exists(browser_dir):
    print("Recent files in browser folder:")
    for root, dirs, files in os.walk(browser_dir):
        for f in files:
            path = os.path.join(root, f)
            try:
                mtime = os.path.getmtime(path)
                age_minutes = (now - mtime) / 60
                if age_minutes < 30: # created in the last 30 minutes
                    print(f"File: {f} | Size: {os.path.getsize(path)} | Age: {age_minutes:.1f} min")
                    with open(path, 'r', encoding='utf-8', errors='ignore') as file:
                        print("Head:", file.read(200).strip())
                    print("-" * 50)
            except Exception as e:
                pass
else:
    print("Browser directory does not exist.")
