import os

browser_dir = r"C:\Users\ITS\.gemini\antigravity\brain\a9193afc-5de4-4352-a5ac-574be203aa3c\browser"
if os.path.exists(browser_dir):
    for root, dirs, files in os.walk(browser_dir):
        for f in files:
            # Only read the base .md scratchpads (not historical resolved states)
            if f.endswith('.md') and not '.resolved' in f:
                path = os.path.join(root, f)
                try:
                    with open(path, 'r', encoding='utf-8', errors='ignore') as file:
                        content = file.read()
                    print(f"File: {f} | Size: {len(content)}")
                    print(content[:600])
                    print("=" * 80)
                except Exception as e:
                    print(f"Error reading {f}: {e}")
else:
    print("Browser directory does not exist.")
