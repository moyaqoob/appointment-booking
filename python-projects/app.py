import datetime


with open("file.txt","w+") as file:
    x  = datetime.datetime.now()
    file.write(f"new file created at {x}")