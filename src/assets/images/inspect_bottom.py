from PIL import Image

img = Image.open("/Users/vigneshbalasubramaniyan/Documents/Github/zyox/src/assets/images/man_cooking.png")
width, height = img.size
pixdata = img.load()

print("Bottom edge pixel colors:")
for y in range(height - 10, height):
    # Print a few pixels from the bottom middle
    row = [pixdata[x, y] for x in range(width // 2 - 10, width // 2 + 10)]
    print(f"y={y}:", row[:5])
