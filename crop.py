import os
from PIL import Image

def get_bounding_box(image):
    width, height = image.size
    left, upper, right, lower = width, height, 0, 0

    # Loop through each pixel to find the bounding box
    for x in range(width):
        for y in range(height):
            pixel = image.getpixel((x, y))
            if pixel[3] != 0:  # Check the alpha value (0 means transparent)
                left = min(left, x)
                upper = min(upper, y)
                right = max(right, x)
                lower = max(lower, y)

    return left, upper, right, lower

def crop_images(input_folder, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for filename in os.listdir(input_folder):
        if filename.lower().endswith('.png'):
            input_path = os.path.join(input_folder, filename)
            output_path = os.path.join(output_folder, filename)

            with Image.open(input_path) as img:
                left, upper, right, lower = get_bounding_box(img)

                # Check if there are non-transparent pixels in the image
                if right >= left and lower >= upper:
                    cropped_img = img.crop((left, upper, right + 1, lower + 1))
                    cropped_img.save(output_path)

if __name__ == "__main__":
    input_folder = "models"   # Replace with the path to the folder containing PNG images
    output_folder = "img" # Replace with the desired output folder

    crop_images(input_folder, output_folder)
