import os

no_repo_dir = r"C:\Users\ITS\.gemini\antigravity\code_tracker\active\no_repo"
if os.path.exists(no_repo_dir):
    print("Files in active/no_repo:")
    for f in os.listdir(no_repo_dir):
        path = os.path.join(no_repo_dir, f)
        if os.path.isfile(path):
            try:
                size = os.path.getsize(path)
                with open(path, 'rb') as file:
                    head = file.read(200)
                # Decode with ignore to print the text preview
                preview = head.decode('utf-8', errors='ignore')
                print(f"File: {f} | Size: {size}")
                print(f"  Preview: {preview[:100].strip()}")
                print("-" * 50)
            except Exception as e:
                print(f"File: {f} | Error: {e}")
else:
    print("no_repo folder does not exist.")
