from PIL import Image

img = Image.open("/Users/vigneshbalasubramaniyan/Documents/Github/zyox/src/assets/images/man_cooking.png")
width, height = img.size
pixdata = img.load()

# Print colors of a few corner pixels
print("Top-left corner pixels:")
for y in range(10):
    row = [pixdata[x, y] for x in range(10)]
    print(row)
