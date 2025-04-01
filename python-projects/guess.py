import random 



# def hello_world():
#     return "Hello, Docker!"

def guess(x):
    random_number = random.randint(10,x)
    guess = 0
    while guess != random_number:
        guess = int(input(f"Guess a number between 1 to {x}: "))
        if guess < random_number:
            print('Sorry, guess again')
        elif guess > random_number:
            print("bad luck, you are close ")

    print("You are correct {x}")

guess(10)
