import os

pb_path = r"C:\Users\ITS\.gemini\antigravity\conversations\a9193afc-5de4-4352-a5ac-574be203aa3c.pb"
if os.path.exists(pb_path):
    print("Found pb file.")
    with open(pb_path, 'rb') as f:
        data = f.read()
    
    chunks = []
    current_chunk = []
    for b in data:
        # printable characters + tab, newline, carriage return
        if (32 <= b <= 126) or b in [10, 13, 9]:
            current_chunk.append(chr(b))
        else:
            if len(current_chunk) > 100:
                chunks.append("".join(current_chunk))
            current_chunk = []
    if len(current_chunk) > 100:
        chunks.append("".join(current_chunk))
        
    print(f"Extracted {len(chunks)} chunks.")
    with open("pb_extracted_chunks.txt", "w", encoding="utf-8", errors='ignore') as f_out:
        for idx, chunk in enumerate(chunks):
            # Check if chunk contains keywords related to Dr. Huzaifa
            keywords = ["Huzaifa", "HAS-BLED", "Cockcroft", "calculateHasBled"]
            has_kw = any(kw in chunk for kw in keywords)
            if has_kw:
                f_out.write(f"\n\n=== CHUNK {idx} (len={len(chunk)}) ===\n")
                f_out.write(chunk)
                f_out.write("\n=====================================\n")
    print("Filtered chunks saved to pb_extracted_chunks.txt")
else:
    print("PB file not found.")
