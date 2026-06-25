import os

temp_dir = r"C:\Users\ITS\.gemini\antigravity\brain\a9193afc-5de4-4352-a5ac-574be203aa3c\.tempmediaStorage"
if os.path.exists(temp_dir):
    print("Listing files in .tempmediaStorage:")
    for root, dirs, files in os.walk(temp_dir):
        for f in files:
            path = os.path.join(root, f)
            if f.endswith('.txt'): # DOM snapshots are text files
                try:
                    with open(path, 'r', encoding='utf-8', errors='ignore') as file:
                        content = file.read()
                    if "Huzaifa" in content or "HAS-BLED" in content:
                        print(f"File: {f} | Size: {len(content)}")
                        # Print first few matches of keywords or lines
                        print("Head:")
                        lines = content.split('\n')
                        for line in lines[:20]:
                            print(line)
                        print("-" * 50)
                except Exception as e:
                    pass
else:
    print("Tempmedia directory does not exist.")
