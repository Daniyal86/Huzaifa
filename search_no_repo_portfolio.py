import os

no_repo_dir = r"C:\Users\ITS\.gemini\antigravity\code_tracker\active\no_repo"
if os.path.exists(no_repo_dir):
    print("Searching code_tracker active/no_repo for 'Huzaifa' or 'Pharm.D'...")
    match_count = 0
    for f in os.listdir(no_repo_dir):
        path = os.path.join(no_repo_dir, f)
        if os.path.isfile(path):
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as file:
                    content = file.read()
                if "Huzaifa" in content or "Pharm.D" in content or "calculateHasBled" in content:
                    match_count += 1
                    print(f"FOUND MATCH {match_count}: {f} | Size: {os.path.getsize(path)}")
                    print("Preview:")
                    print(content[:400])
                    print("=" * 80)
            except Exception as e:
                pass
    print(f"Search complete. Found {match_count} matches.")
else:
    print("no_repo folder does not exist.")
