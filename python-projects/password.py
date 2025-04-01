from cryptography.fernet import Fernet
pwd = input("What is the master password? ")

mode = input("Would you like to add a new password or view existing ones (view,add) ")

# def write_key():
#      key = Fernet.generate_key
#      with open("key.key","wb") as key_file:
#           key_file.write(key)

# write_key()

def load_key():
     file = open("key.key","rb")

fer = Fernet
  
def view():
     with open('password.txt','r') as f:
          for line in f.readlines():
               data = line.rstrip()
               user, pwd = data.split("|")
               print("Account:", user, "| Password", fer.decrypt(pwd.encode()) + "\n") 

def add():
     name = input('Account Name:')
     pwd = input('Password: ')

     with open('password.txt','a') as f:
          f.write(name+"|" + fer.encrypt(pwd.encode()))


while True:
     mode = input(
          "Would you like to add a new password or view the same  ")

     if mode == "q":
          break
          
     if mode == "view":
          view()

     elif mode == "add":
          add()
     else:
          print("Invalid mode")
          continue 
     
     