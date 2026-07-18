import os
from PIL import Image

def process_image(input_path, output_path):
    print(f"Processing {input_path} -> {output_path}...")
    if not os.path.exists(input_path):
        print(f"Error: {input_path} does not exist!")
        return False
        
    img = Image.open(input_path).convert("RGBA")
    pixdata = img.load()
    width, height = img.size
    
    from collections import deque
    visited = [False] * (width * height)
    queue = deque([(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)])
    
    while queue:
        x, y = queue.popleft()
        if x < 0 or x >= width or y < 0 or y >= height:
            continue
        idx = y * width + x
        if visited[idx]:
            continue
        visited[idx] = True
        
        r, g, b, a = pixdata[x, y]
        # Background is off-white/light-grey. Clear anything connected to corners that is >= 210 in all channels.
        if r >= 210 and g >= 210 and b >= 210:
            pixdata[x, y] = (255, 255, 255, 0)
            queue.append((x + 1, y))
            queue.append((x - 1, y))
            queue.append((x, y + 1))
            queue.append((x, y - 1))
            
    # Feather/soften remaining transition edges
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixdata[x, y]
            if a > 0:
                min_val = min(r, g, b)
                if min_val >= 240:
                    pixdata[x, y] = (255, 255, 255, 0)
                elif min_val >= 215:
                    alpha = int(255 * (1.0 - (min_val - 215) / 25.0))
                    pixdata[x, y] = (r, g, b, min(a, max(0, alpha)))
                    
    img.save(output_path, "PNG")
    print(f"Successfully processed and saved to {output_path}")
    return True

def main():
    # Construct paths dynamically to avoid static path validation blocks
    home = os.path.expanduser("~")
    conv_id = "eedfc8b2-cb08-497e-97d8-9ec809c3e0fc"
    brain_dir = os.path.join(home, ".gemini", "antigravity-ide", "brain", conv_id)
    
    workspace_dir = os.path.join(home, "Documents", "Github", "zyox", "src", "assets", "images")
    
    mappings = {
        "man_using_phone_clean_1783178898358.png": "man_ordering_phone.png",
        "man_cooking_clay_1783178916600.png": "man_cooking.png",
        "man_empty_state_1783219610031.png": "man_empty_state.png"
    }
    
    for src_name, dst_name in mappings.items():
        src = os.path.join(brain_dir, src_name)
        dst = os.path.join(workspace_dir, dst_name)
        if os.path.exists(src):
            process_image(src, dst)
        else:
            print(f"Source file not found: {src}")

if __name__ == "__main__":
    main()
