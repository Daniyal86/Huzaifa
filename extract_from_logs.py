import json
import os

log_path = r"C:\Users\ITS\.gemini\antigravity\brain\a9193afc-5de4-4352-a5ac-574be203aa3c\.system_generated\logs\overview.txt"
if os.path.exists(log_path):
    with open(log_path, 'r', encoding='utf-8') as f:
        for i, line in enumerate(f):
            try:
                # Some lines might have extra text or not be valid JSON, let's try decoding
                data = json.loads(line)
                tc_list = data.get("tool_calls", [])
                for j, tc in enumerate(tc_list):
                    name = tc.get("name")
                    args = tc.get("args", {})
                    target = args.get("TargetFile", "")
                    content = args.get("CodeContent", "")
                    print(f"Line {i}, call {j}: {name} -> {target} | Content length: {len(content)}")
            except Exception as e:
                # If there's partial JSON, let's see if we can find keywords
                if "write_to_file" in line or "replace_file_content" in line:
                    print(f"Line {i} raw match: {line[:200]}...")
else:
    print("Log path does not exist.")
