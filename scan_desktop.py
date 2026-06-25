import os

desktop_path = r"c:\Users\ITS\Desktop"
print("Scanning Desktop for portfolio files...")
for root, dirs, files in os.walk(desktop_path):
    # Skip node_modules and .git
    if "node_modules" in root or ".git" in root:
        continue
    for f in files:
        if f.lower() in ["style.css", "index.html", "script.js"]:
            full_path = os.path.join(root, f)
            try:
                size = os.path.getsize(full_path)
                with open(full_path, 'r', encoding='utf-8', errors='ignore') as file:
                    head = file.read(200)
                if "Huzaifa" in head or "HAS-BLED" in head or "Cockcroft" in head:
                    print(f"FOUND: {full_path} | Size: {size}")
            except Exception as e:
                pass
print("Scan complete.")
