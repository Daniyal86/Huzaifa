import os

antigravity_dir = r"C:\Users\ITS\.gemini\antigravity"
if os.path.exists(antigravity_dir):
    print("Files in antigravity folder:")
    for root, dirs, files in os.walk(antigravity_dir):
        # Skip node_modules or large data folders
        if "node_modules" in root or ".git" in root or "browser" in root:
            continue
        for f in files:
            path = os.path.join(root, f)
            if f.endswith(('.html', '.css', '.js', '.txt')):
                try:
                    size = os.path.getsize(path)
                    if size < 500000:
                        with open(path, 'r', encoding='utf-8', errors='ignore') as file:
                            content = file.read()
                        if "Huzaifa" in content or "calculateHasBled" in content:
                            print(f"FOUND: {path} | Size: {size}")
                except Exception as e:
                    pass
else:
    print("Antigravity folder not found.")
