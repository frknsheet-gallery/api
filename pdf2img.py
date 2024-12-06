from pdf2image import convert_from_path
import os

# Specify the path to your PDF file
pdf_path = 'pdf'
# Specify the output folder for images
output_folder = 'img'
j = 0
# Convert PDF to images
for i in range(1, 4):
    images = convert_from_path(os.path.join(pdf_path, f'{i}.pdf'))
    for i, image in enumerate(images):
        j+=1
        image.save(os.path.join(output_folder, f'{j}.png'), 'PNG')

print("Successfully converted PDF to images.")
