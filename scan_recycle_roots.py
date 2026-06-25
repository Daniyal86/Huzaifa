import os

bin_path = r"C:\$Recycle.Bin\S-1-5-21-1665114266-1477906365-2916095043-1002"
if os.path.exists(bin_path):
    print("Listing files in recycle bin (excluding node_modules):")
    for root, dirs, files in os.walk(bin_path):
        if "node_modules" in root:
            continue
        for f in files:
            full_path = os.path.join(root, f)
            name_lower = f.lower()
            ext = os.path.splitext(f)[1].lower()
            if ext in ['.html', '.css', '.js', '.txt'] or any(k in name_lower for k in ['style', 'script', 'index']):
                try:
                    size = os.path.getsize(full_path)
                    if size > 1000000: # skip huge files
                        continue
                    with open(full_path, 'r', encoding='utf-8', errors='ignore') as file:
                        head = file.read(1000)
                    
                    # Search keywords in the head
                    keywords = ["Huzaifa", "HAS-BLED", "Cockcroft", "shaikh", "pharm", "clinical", "medication safety", "calculators"]
                    matched_kws = [kw for kw in keywords if kw.lower() in head.lower() or kw.lower() in name_lower]
                    if len(matched_kws) > 0:
                        print(f"MATCH: {full_path} | Size: {size} | Keywords: {matched_kws}")
                        print(f"Head: {head[:300].strip()}")
                        print("-" * 80)
                except Exception as e:
                    pass
print("Scan completed.")
