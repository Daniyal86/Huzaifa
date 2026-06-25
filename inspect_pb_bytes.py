import os

pb_path = r"C:\Users\ITS\.gemini\antigravity\conversations\a9193afc-5de4-4352-a5ac-574be203aa3c.pb"
if os.path.exists(pb_path):
    with open(pb_path, 'rb') as f:
        data = f.read(200)
    print("Header bytes:", data)
    # Check if gzip or zip
    if data.startswith(b'\x1f\x8b'):
        print("Gzipped file detected!")
    elif data.startswith(b'PK\x03\x04'):
        print("ZIP file detected!")
    else:
        # Check if it has readable ASCII characters
        readable = [b for b in data if 32 <= b <= 126 or b in [10, 13, 9]]
        print(f"Readable chars count in first 200 bytes: {len(readable)}")
        print("Readable chars preview:", bytes(readable).decode('utf-8', errors='ignore'))
else:
    print("File not found")
