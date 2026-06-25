import os
path = r"c:\Users\ITS\Desktop\Huzaifa\style_backup.css"
if os.path.exists(path):
    print("Size:", os.path.getsize(path))
    with open(path, 'rb') as f:
        head = f.read(100)
        print("Header bytes:", head)
        try:
            print("Decoded head:", head.decode('utf-8', errors='replace'))
        except Exception as e:
            print("Decode error:", e)
