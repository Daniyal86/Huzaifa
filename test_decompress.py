import os
import zlib
import gzip
import bz2
import lzma

pb_path = r"C:\Users\ITS\.gemini\antigravity\conversations\a9193afc-5de4-4352-a5ac-574be203aa3c.pb"
if os.path.exists(pb_path):
    with open(pb_path, 'rb') as f:
        data = f.read()
    
    print("Testing decompression algorithms:")
    
    # Try zlib
    try:
        decomp = zlib.decompress(data)
        print("Success: zlib! Decompressed size:", len(decomp))
    except Exception as e:
        print("Failed: zlib:", e)
        
    # Try raw deflate
    try:
        decomp = zlib.decompress(data, -zlib.MAX_WBITS)
        print("Success: raw deflate! Decompressed size:", len(decomp))
    except Exception as e:
        print("Failed: raw deflate:", e)
        
    # Try gzip
    try:
        decomp = gzip.decompress(data)
        print("Success: gzip! Decompressed size:", len(decomp))
    except Exception as e:
        print("Failed: gzip:", e)
        
    # Try bz2
    try:
        decomp = bz2.decompress(data)
        print("Success: bz2! Decompressed size:", len(decomp))
    except Exception as e:
        print("Failed: bz2:", e)
        
    # Try lzma
    try:
        decomp = lzma.decompress(data)
        print("Success: lzma! Decompressed size:", len(decomp))
    except Exception as e:
        print("Failed: lzma:", e)
else:
    print("File not found")
