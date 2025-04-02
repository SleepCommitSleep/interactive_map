img_width = 9500
img_height = 9000
grid_size = 6
grid_width = img_width // grid_size
grid_height = img_height // grid_size


def open_mask(mask_file_name):
    mask = []
    with open(mask_file_name, "r") as mask_file:
        (width, height) = mask_file.readline().split(" ")
        for row_num in range(int(height)):
            row = mask_file.readline().replace("\n", "").split(" ")
            for cell_num in range(int(width)):
                row[cell_num] = int(row[cell_num])
            mask.append(row)
    return mask


def find_path(start_point, end_point, mask):
    old_wave = [start_point]
    new_wave = []
    length_map = []
    for i in range(grid_height):
        length_map.append([])
        for j in range(grid_width):
            if (mask[i][j] == 1):
                length_map[i].append(-1)
            else:
                length_map[i].append(0)
    length_map[start_point[0]][start_point[1]] = 0

    current_length = 0
    end_found = 0
    while (not end_found):
        current_length += 1
        for cell in old_wave:
            length_map[cell[0]][cell[1]] = current_length
            if (cell[0] != 0):
                if (length_map[cell[0] - 1][cell[1]] == 0):
                    length_map[cell[0] - 1][cell[1]] = current_length + 1
                    new_wave.append([cell[0] - 1, cell[1]])
            if (cell[0] != grid_height - 1):
                if (length_map[cell[0] + 1][cell[1]] == 0):
                    length_map[cell[0] + 1][cell[1]] = current_length + 1
                    new_wave.append([cell[0] + 1, cell[1]])
            if (cell[1] != grid_width - 1):
                if (length_map[cell[0]][cell[1] + 1] == 0):
                    length_map[cell[0]][cell[1] + 1] = current_length + 1
                    new_wave.append([cell[0], cell[1] + 1])
            if (cell[1] != 0):
                if (length_map[cell[0]][cell[1] - 1] == 0):
                    length_map[cell[0]][cell[1] - 1] = current_length + 1
                    new_wave.append([cell[0], cell[1] - 1])
        if new_wave.__len__() == 0:
            print(current_length)
            end_found = 1
        old_wave = new_wave
        new_wave = []

    found_dest = 0
    path = []
    current_cell = end_point
    current_length = length_map[current_cell[0]][current_cell[1]]
    while (not found_dest):
        if current_length == 0 or current_length == -1:
            found_dest = 1
        if (current_cell[0] != 0):
            if (length_map[current_cell[0] - 1][current_cell[1]] < current_length) and length_map[current_cell[0] - 1][
                current_cell[1]] > 0:
                current_length = length_map[current_cell[0] - 1][current_cell[1]]
                path.append([current_cell[0] - 1, current_cell[1]])
                current_cell = [current_cell[0] - 1, current_cell[1]]
        if (current_cell[0] != grid_height - 1):
            if (length_map[current_cell[0] + 1][current_cell[1]] < current_length) and length_map[current_cell[0] + 1][
                current_cell[1]] > 0:
                current_length = length_map[current_cell[0] + 1][current_cell[1]]
                path.append([current_cell[0] + 1, current_cell[1]])
                current_cell = [current_cell[0] + 1, current_cell[1]]
        if (current_cell[1] != grid_width - 1):
            if (length_map[current_cell[0]][current_cell[1] + 1] < current_length) and length_map[current_cell[0]][
                current_cell[1] + 1] > 0:
                current_length = length_map[current_cell[0]][current_cell[1] + 1]
                path.append([current_cell[0], current_cell[1] + 1])
                current_cell = [current_cell[0], current_cell[1] + 1]
        if (current_cell[1] != 0):
            if (length_map[current_cell[0]][current_cell[1] - 1] < current_length) and length_map[current_cell[0]][
                current_cell[1] - 1] > 0:
                current_length = length_map[current_cell[0]][current_cell[1] - 1]
                path.append([current_cell[0], current_cell[1] - 1])
                current_cell = [current_cell[0], current_cell[1] - 1]
        if current_length == 1:
            found_dest = 1
    return path
