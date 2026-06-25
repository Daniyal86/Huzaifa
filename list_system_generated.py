import os

sys_gen_dir = r"C:\Users\ITS\.gemini\antigravity\brain\a9193afc-5de4-4352-a5ac-574be203aa3c\.system_generated"
if os.path.exists(sys_gen_dir):
    print("Files in .system_generated:")
    for root, dirs, files in os.walk(sys_gen_dir):
        for f in files:
            path = os.path.join(root, f)
            print(f"File: {os.path.relpath(path, sys_gen_dir)} | Size: {os.path.getsize(path)}")
else:
    print(".system_generated directory does not exist.")
