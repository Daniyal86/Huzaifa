import os

bin_path = r"C:\$Recycle.Bin\S-1-5-21-1665114266-1477906365-2916095043-1002"
if os.path.exists(bin_path):
    print("Listing files in recycle bin:")
    for root, dirs, files in os.walk(bin_path):
        for f in files:
            full_path = os.path.join(root, f)
            ext = os.path.splitext(f)[1].lower()
            if ext in ['.html', '.css', '.js']:
                try:
                    size = os.path.getsize(full_path)
                    with open(full_path, 'r', encoding='utf-8', errors='ignore') as file:
                        head = file.read(200)
                    print(f"Path: {full_path} | Size: {size} | Head: {head[:100].strip()}")
                except Exception as e:
                    print(f"Error reading {full_path}: {e}")
