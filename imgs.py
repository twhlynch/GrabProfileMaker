import bpy
import os


folder_path = "C:\\__\\models"

bpy.context.scene.render.image_settings.file_format = 'PNG'
bpy.context.scene.render.image_settings.color_mode = 'RGBA'

def convert_obj_to_png(input_obj_file, output_png_file):

    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()

    bpy.ops.import_scene.obj(filepath=input_obj_file)

    bpy.ops.object.camera_add(location=(0, -5, 0), rotation=(1.5708, 0, 0))
    camera = bpy.context.object
    camera.data.type = 'ORTHO'
    camera.data.ortho_scale = 5.0
    bpy.context.scene.camera = camera

    bpy.context.scene.render.filepath = output_png_file

    bpy.context.scene.render.film_transparent = True

    bpy.context.scene.view_settings.exposure = 5.0

    bpy.ops.render.render(write_still=True)

for filename in os.listdir(folder_path):
    if filename.endswith(".obj"):
        input_obj_file = os.path.join(folder_path, filename)
        output_png_file = os.path.splitext(input_obj_file)[0] + ".png"
        convert_obj_to_png(input_obj_file, output_png_file)
