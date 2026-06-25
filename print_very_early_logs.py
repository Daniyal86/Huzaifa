import json
import os

log_path = r"C:\Users\ITS\.gemini\antigravity\brain\a9193afc-5de4-4352-a5ac-574be203aa3c\.system_generated\logs\overview.txt"
if os.path.exists(log_path):
    with open(log_path, 'r', encoding='utf-8') as f:
        for i, line in enumerate(f):
            if i >= 82:
                break
            try:
                data = json.loads(line)
                tc_list = data.get("tool_calls", [])
                for j, tc in enumerate(tc_list):
                    name = tc.get("name")
                    args = tc.get("args", {})
                    target = args.get("TargetFile", "")
                    path = args.get("AbsolutePath", "")
                    cmd = args.get("CommandLine", "")
                    print(f"Line {i}, call {j}: {name} | Target: {target} | Path: {path} | Cmd: {cmd[:150]}")
            except Exception as e:
                print(f"Line {i} raw: {line[:150]}")
else:
    print("Log not found.")
