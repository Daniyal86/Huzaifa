import os

def restore_file(src_name, dest_name):
    src_path = os.path.join(r"C:\Users\ITS\.gemini\antigravity\code_tracker\active\no_repo", src_name)
    dest_path = os.path.join(r"c:\Users\ITS\Desktop\Huzaifa", dest_name)
    if os.path.exists(src_path):
        with open(src_path, 'rb') as f:
            data = f.read()
        
        # Find where the text starts. Let's find the first index where bytes are mostly ASCII text.
        # In protobuf, it usually starts with field tags. Let's search for the first character that represents
        # the start of the file: '<' for HTML, and '/' or '@' or 'b' or ':' or '*' for CSS.
        # Actually, let's look at the first few bytes.
        # For CSS: `@import` starts with '@' (ASCII 64). Let's find the index of '@'.
        # For HTML: `<!DOCTYPE` starts with '<' (ASCII 60). Let's find the index of '<'.
        
        start_idx = 0
        if dest_name.endswith('.css'):
            start_idx = data.find(b'@import')
            if start_idx == -1:
                start_idx = data.find(b'/*')
        elif dest_name.endswith('.html'):
            start_idx = data.find(b'<!DOCTYPE')
            if start_idx == -1:
                start_idx = data.find(b'<html')
                
        if start_idx == -1 or start_idx > 50:
            # Fallback: find first printable character
            for i in range(len(data)):
                if data[i] >= 32 and data[i] <= 126:
                    start_idx = i
                    break
        
        text = data[start_idx:].decode('utf-8', errors='ignore')
        # Clean up any trailing binary/non-ascii characters if present
        # Usually it might have some binary suffix at the end in protobuf, but we'll see
        # Let's search if there's a trailing binary footer. Let's look for last common tag.
        if dest_name.endswith('.html'):
            end_idx = text.rfind('</html>')
            if end_idx != -1:
                text = text[:end_idx + 7]
        
        with open(dest_path, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"Restored {dest_name} starting from index {start_idx}, size: {len(text)}")

restore_file("97953e0f64269146b6c5680ea5dc1980_style.css", "style_restored.css")
restore_file("456129ea0f55aed12116df0ed5592118_index.html", "index_restored.html")
