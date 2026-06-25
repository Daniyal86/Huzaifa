import os
import re

pb_path = r"C:\Users\ITS\.gemini\antigravity\conversations\a9193afc-5de4-4352-a5ac-574be203aa3c.pb"
if os.path.exists(pb_path):
    print("Found protobuf file. Size:", os.path.getsize(pb_path))
    with open(pb_path, 'rb') as f:
        data = f.read()
    
    # Decode with errors='ignore' to scan the textual content of protobuf
    text = data.decode('utf-8', errors='ignore')
    
    # Recover HTML: search for <!DOCTYPE html> to </html>
    # Since there could be multiple versions in the chat history, let's list all matches with their sizes and save them
    html_matches = list(re.finditer(r'<!DOCTYPE html>.*?</html>', text, re.DOTALL | re.IGNORECASE))
    print(f"Found {len(html_matches)} HTML matches.")
    for idx, m in enumerate(html_matches):
        print(f"HTML match {idx}: length {len(m.group(0))}")
        # Save the match
        with open(f"html_recovered_{idx}.html", "w", encoding="utf-8") as f_out:
            f_out.write(m.group(0))
            
    # Recover CSS: search for @import url('https://fonts.googleapis.com/...
    # Let's find the start of the CSS file using font imports
    css_starts = [m.start() for m in re.finditer(r'@import url\(\'https://fonts\.googleapis\.com', text)]
    print(f"Found {len(css_starts)} CSS start positions.")
    for idx, start in enumerate(css_starts):
        # Scan forward and collect printable characters
        chunk = []
        for char in text[start:]:
            o = ord(char)
            # Accept standard characters, space, tab, newline
            if (32 <= o <= 126) or o in [10, 13, 9]:
                chunk.append(char)
            else:
                # Stop if we hit control characters/binary data after a reasonable length
                if len(chunk) > 1000 and o < 32 and o not in [10, 13, 9]:
                    break
                chunk.append(char)
        css_content = "".join(chunk)
        print(f"CSS match {idx}: length {len(css_content)}")
        with open(f"css_recovered_{idx}.css", "w", encoding="utf-8") as f_out:
            f_out.write(css_content)
            
    # Recover JS: search for script functions like HAS-BLED calculation or other unique JS terms
    js_keyword = "document.getElementById('hasbled-form')"
    js_starts = [m.start() for m in re.finditer(re.escape(js_keyword), text)]
    if not js_starts:
        # Fallback to general calculator terms
        js_starts = [m.start() for m in re.finditer(r'calculateHasBled', text)]
        
    print(f"Found {len(js_starts)} JS start positions.")
    for idx, start in enumerate(js_starts):
        # We want to scan backwards to find the start of the JS code block, e.g., the first line of JS
        # Let's go backwards up to 5000 characters and look for common starts like "document.addEventListener" or similar.
        back_start = max(0, start - 4000)
        # Let's scan forward from back_start
        chunk = []
        for char in text[back_start:]:
            o = ord(char)
            if (32 <= o <= 126) or o in [10, 13, 9]:
                chunk.append(char)
            else:
                if len(chunk) > 5000 and o < 32 and o not in [10, 13, 9]:
                    break
                chunk.append(char)
        js_content = "".join(chunk)
        print(f"JS match {idx}: length {len(js_content)}")
        with open(f"js_recovered_{idx}.js", "w", encoding="utf-8") as f_out:
            f_out.write(js_content)
            
else:
    print("PB file not found.")
