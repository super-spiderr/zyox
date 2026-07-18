import os
import sys
import collections
from PIL import Image

def remove_background(image_path, target_color=(255, 255, 255), tolerance=15):
    """
    Finds and removes the background of an image using edge-based flood fill.
    Ensures that details inside the image matching the background color are preserved.
    """
    if not os.path.exists(image_path):
        print(f"Error: File not found at '{image_path}'")
        return False
        
    try:
        img = Image.open(image_path).convert("RGBA")
        width, height = img.size
        pixdata = img.load()
    except Exception as e:
        print(f"Error loading image: {e}")
        return False

    visited = set()
    queue = collections.deque()

    # Add all border pixels to start flood fill from the edges
    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
        visited.add((x, 0))
        visited.add((x, height - 1))

    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))
        visited.add((0, y))
        visited.add((width - 1, y))

    # Define color matching function based on tolerance
    tr, tg, tb = target_color
    def is_match(r, g, b):
        return abs(r - tr) <= tolerance and abs(g - tg) <= tolerance and abs(b - tb) <= tolerance

    # Flood fill
    bg_pixel_count = 0
    while queue:
        x, y = queue.popleft()
        r, g, b, a = pixdata[x, y]
        
        if is_match(r, g, b):
            # Set alpha to 0 (make transparent)
            pixdata[x, y] = (r, g, b, 0)
            bg_pixel_count += 1
            
            # Check adjacent pixels
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height:
                    if (nx, ny) not in visited:
                        r2, g2, b2, a2 = pixdata[nx, ny]
                        if is_match(r2, g2, b2):
                            visited.add((nx, ny))
                            queue.append((nx, ny))

    # Save output
    try:
        base, ext = os.path.splitext(image_path)
        output_path = base + ".png" if ext.lower() != '.png' else image_path
        img.save(output_path, "PNG")
        print(f"\nSuccess! Saved transparent image to: {output_path}")
        print(f"Made {bg_pixel_count} pixels transparent.")
        return True
    except Exception as e:
        print(f"Error saving image: {e}")
        return False

if __name__ == "__main__":
    print("=== Background Remover Tool ===")
    
    # 1. Get image path
    if len(sys.argv) > 1:
        img_path = sys.argv[1]
    else:
        img_path = input("Enter the path to the image file (e.g. src/assets/images/my_image.png): ").strip()
    
    # Expand ~ or relative paths
    img_path = os.path.abspath(os.path.expanduser(img_path))
    
    # 2. Configure target color
    color_choice = input("Remove white background? (y/n, default is y): ").strip().lower()
    
    target_color = (255, 255, 255)
    tolerance = 15
    
    if color_choice == 'n':
        rgb_str = input("Enter RGB color to remove (e.g., 0,0,0 for black or 255,255,255): ").strip()
        try:
            target_color = tuple(map(int, rgb_str.split(",")))
        except Exception:
            print("Invalid RGB format, defaulting to white (255, 255, 255)")
            target_color = (255, 255, 255)
            
        tol_str = input("Enter color tolerance (1-255, default is 15): ").strip()
        if tol_str.isdigit():
            tolerance = int(tol_str)

    remove_background(img_path, target_color, tolerance)
