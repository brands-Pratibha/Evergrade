from PIL import Image
import os

def remove_white_background(image_path):
    try:
        img = Image.open(image_path)
        img = img.convert("RGBA")
        datas = img.getdata()

        new_data = []
        for item in datas:
            # Change all white (also shades of whites)
            # to transparent
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)

        img.putdata(new_data)
        img.save(image_path, "PNG")
        print(f"Successfully processed {image_path}")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

assets_dir = r"c:\Users\ASUS\.gemini\antigravity\scratch\evergrade\assets"
icons = ["icon_mumbai.png", "icon_delhi.png", "icon_dubai.png", "icon_latvia.png"]

for icon in icons:
    path = os.path.join(assets_dir, icon)
    if os.path.exists(path):
        remove_white_background(path)
    else:
        print(f"File not found: {path}")
