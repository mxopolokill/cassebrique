import sys

f = open(sys.argv[1],'r')

content = f.readlines()

# Initisalisation du nombre de lignes de nombre de couleurs
sizex = int(content[0])
sizey = int(content[1])
ncolor = int(content[2])


lst = []

for j in range(sizey):
    l = content[3+j]
    for i in range(sizex):
        lst.append(l[i])

offset = 3 + sizey

for i in range(ncolor):
    col = content[offset + i].split()
    for j in range(len(lst)):
        if(lst[j] == col[0]):
            lst[j] = col[1]

j = 0
for i in range(len(lst)):
    if(lst[i] != '0'):
        print("this.gameboard.bricksArray[" + str(j) + "] = new Brick(1,\""+lst[i] + "\",this.gameboard.posx + (" + str(i % sizex) +"*bsizex),(" + str((int)(i/sizex)) + "*bsizey) + this.gameboard.posy,this.gameboard,bsizex,bsizey);")
        j +=1

f.close()
