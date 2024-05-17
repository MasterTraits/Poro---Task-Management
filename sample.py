count_with_7 = 0
for i in range(5, 201):
    if '7' in str(i):
        count_with_7 += 1

print("Number of integers from 5 to 200 containing the digit 7:", count_with_7)

# Part b
count_start_7_end_9 = 0
for i in range(70, 200, 10):
    count_start_7_end_9 += 1

print("Number of integers starting with 7 and ending with 9:", count_start_7_end_9)