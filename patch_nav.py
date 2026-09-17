import sys

def apply():
    with open('css/style.css', 'r') as f:
        content = f.read()

    # Revert failed patch attempts if any
    content = content.replace(':root, [data-theme="light"]', ':root')
    import re
    content = re.sub(r'\[data-theme="dark"\]\s*\{[^}]*\}', '', content)
    
    # 1. Update :root and add [data-theme="dark"]
    root_match = re.search(r':root\s*\{[^}]*\}', content)
    if not root_match: return
    root_block = root_match.group(0)
    new_root_block = root_block.replace(':root', ':root, [data-theme="light"]')
    
    # Add rgb vars to light mode for transparent nav
    new_root_block = new_root_block.replace('--bg-primary: #ffffff;', '--bg-primary: #ffffff;\n    --bg-primary-rgb: 255, 255, 255;')
    
    dark_block = """
[data-theme="dark"] {
    --bg-primary: #111827;
    --bg-primary-rgb: 17, 24, 39;
    --bg-secondary: #1f2937;
    --text-primary: #f9fafb;
    --text-secondary: #d1d5db;
    --accent: #38bdf8;
    --accent-hover: #7dd3fc;
    --border: #374151;
}
"""
    content = content.replace(root_block, new_root_block + dark_block)
    
    # 2. Add transition to body
    body_match = re.search(r'body\s*\{[^}]*\}', content)
    if body_match:
        body_block = body_match.group(0)
        new_body_block = body_block.replace('overflow-x: hidden;', 'overflow-x: hidden;\n    transition: background-color 0.3s ease, color 0.3s ease;')
        content = content.replace(body_block, new_body_block)
        
    # 3. Fix nav background
    nav_match = re.search(r'nav\s*\{[^}]*\}', content)
    if nav_match:
        nav_block = nav_match.group(0)
        new_nav_block = nav_block.replace('background: rgba(255, 255, 255, 0.8);', 'background: rgba(var(--bg-primary-rgb), 0.8);')
        content = content.replace(nav_block, new_nav_block)
        
    nav_scrolled_match = re.search(r'nav\.scrolled\s*\{[^}]*\}', content)
    if nav_scrolled_match:
        nav_scrolled_block = nav_scrolled_match.group(0)
        new_nav_scrolled_block = nav_scrolled_block.replace('background: rgba(255, 255, 255, 0.95);', 'background: rgba(var(--bg-primary-rgb), 0.95);')
        content = content.replace(nav_scrolled_block, new_nav_scrolled_block)
        
    # 4. Add theme toggle styles
    theme_toggle_css = """
#theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-secondary);
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
}

#theme-toggle:hover {
    color: var(--text-primary);
}
"""
    if '#theme-toggle' not in content:
        content += theme_toggle_css
        
    with open('css/style.css', 'w') as f:
        f.write(content)

apply()
