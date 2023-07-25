import os

def list_files_in_directory(directory_path):
    for filename in os.listdir(directory_path):
        if os.path.isfile(os.path.join(directory_path, filename)):
            print(filename)

# Replace 'your_directory_path' with the actual directory path you want to list the files from.
directory_path = 'models'
list_files_in_directory(directory_path)
