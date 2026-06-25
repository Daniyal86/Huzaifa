import os

cache_dir = r"C:\Users\ITS\AppData\Local\Google\Chrome\User Data"
if os.path.exists(cache_dir):
    print("Searching Chrome Cache for portfolio assets...")
    match_count = 0
    for root, dirs, files in os.walk(cache_dir):
        if "Cache" in root or "Code Cache" in root:
            for f in files:
                path = os.path.join(root, f)
                try:
                    size = os.path.getsize(path)
                    if 1000 < size < 1000000:
                        with open(path, 'rb') as file:
                            data = file.read()
                        
                        # Check for portfolio keywords
                        if b"Huzaifa" in data or b"HAS-BLED" in data or b"Cockcroft" in data:
                            match_count += 1
                            print(f"MATCH {match_count}: {path} | Size: {size}")
                            text = data.decode('utf-8', errors='ignore')
                            print("Preview:", text[:300].strip())
                            print("-" * 80)
                            
                            # Let's save a copy in the workspace
                            dest_name = f"cached_asset_{match_count}"
                            if b"<!DOCTYPE html>" in data or b"<html" in data:
                                dest_name += ".html"
                            elif b"body" in data and b"color:" in data:
                                dest_name += ".css"
                            else:
                                dest_name += ".js"
                            
                            dest_path = os.path.join(r"c:\Users\ITS\Desktop\Huzaifa", dest_name)
                            with open(dest_path, 'wb') as out_f:
                                out_f.write(data)
                            print(f"Saved copy to {dest_path}")
                            print("=" * 80)
                except Exception as e:
                    pass
    print(f"Search finished. Found {match_count} matches.")
else:
    print("Chrome User Data folder not found.")
