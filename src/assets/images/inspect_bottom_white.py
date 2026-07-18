from PIL import Image

img = Image.open("/Users/vigneshbalasubramaniyan/Documents/Github/zyox/src/assets/images/man_cooking.png")
width, height = img.size
pixdata = img.load()

# Find any non-transparent pixels in the bottom row (y = height - 1)
print("Non-transparent pixels in the bottom-most row:")
for x in range(width):
    r, g, b, a = pixdata[x, height - 1]
    if a > 0:
        # Print if it's white or close to it
        if r > 200 and g > 200 and b > 200:
            print(f"x={x}: color=({r},{g},{b},{a})")
