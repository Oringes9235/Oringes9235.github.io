gcc = gcc
gccFlags = -c -Iinclude
target = ./obj
bin = ./bin
src = ./src
clean = del
clear = cls

complile:
	$(gcc) $(gccFlags) $(src)/main.c -o $(target)/main.o
	$(gcc) $(gccFlags) $(src)/lexer.c -o $(target)/lexer.o
	$(gcc) $(gccFlags) $(src)/parser.c -o $(target)/parser.o
	$(gcc) $(gccFlags) $(src)/vm.c -o $(target)/vm.o
	$(gcc) $(gccFlags) $(src)/utils.c -o $(target)/utils.o

run:
	$(gcc) $(target)/main.o $(target)/lexer.o $(target)/parser.o $(target)/vm.o $(target)/utils.o -o $(bin)/Coffeepp.exe

clean:
	$(clean) $(target)\*.o
	
clearScreen:
	$(clear)