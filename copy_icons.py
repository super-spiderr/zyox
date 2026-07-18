import os
import shutil

# Paths
android_src_res = "/Users/vigneshbalasubramaniyan/Downloads/IconKitchen-Output/android/res"
android_dst_res = "/Users/vigneshbalasubramaniyan/Documents/Github/zyox/android/app/src/main/res"

ios_src = "/Users/vigneshbalasubramaniyan/Downloads/IconKitchen-Output/ios"
ios_dst = "/Users/vigneshbalasubramaniyan/Documents/Github/zyox/ios/zyox/Images.xcassets/AppIcon.appiconset"

print("Starting app icon replacement...")

# 1. Android icons copy
if os.path.exists(android_src_res):
    for root, dirs, files in os.walk(android_src_res):
        for name in files:
            src_file = os.path.join(root, name)
            rel_path = os.path.relpath(src_file, android_src_res)
            dst_file = os.path.join(android_dst_res, rel_path)
            
            os.makedirs(os.path.dirname(dst_file), exist_ok=True)
            shutil.copy2(src_file, dst_file)
            print(f"Copied Android: {rel_path} -> {dst_file}")
else:
    print(f"Error: Android source path {android_src_res} does not exist!")

# 2. iOS icons copy
if os.path.exists(ios_src):
    os.makedirs(ios_dst, exist_ok=True)
    for root, dirs, files in os.walk(ios_src):
        for name in files:
            src_file = os.path.join(root, name)
            rel_path = os.path.relpath(src_file, ios_src)
            dst_file = os.path.join(ios_dst, rel_path)
            
            os.makedirs(os.path.dirname(dst_file), exist_ok=True)
            shutil.copy2(src_file, dst_file)
            print(f"Copied iOS: {rel_path} -> {dst_file}")
else:
    print(f"Error: iOS source path {ios_src} does not exist!")

print("App icon replacement completed successfully!")
