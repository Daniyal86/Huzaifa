import os

tracker_dir = r"C:\Users\ITS\.gemini\antigravity\code_tracker"
if os.path.exists(tracker_dir):
    print("Listing files in code_tracker recursively:")
    for root, dirs, files in os.walk(tracker_dir):
        if len(files) > 0:
            print(f"Dir: {root} | files: {len(files)}")
            for f in files[:10]: # print up to 10 files
                print(f"  {f}")
else:
    print("Code tracker directory does not exist.")
