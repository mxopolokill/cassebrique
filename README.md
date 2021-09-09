# Acapella Arkanoid

## Faire fonctionner le jeu

Pour jouer, il suffit de décompresser l'archive et d'ouvrir le fichier 
`casse_briques.html` à l'aide de votre navigateur (de préférence Mozilla Firefox
car nous n'avons pas testé la compatibilité avec d'autres navigateurs).

Veillez à ce que la hiérarchie de fichiers reste inchangée afin que le jeu
fonctionne correctement.

Dans les menus, `Z`et `S` permettent de séléctionner les options. La barre
espace vous permet de valider.

Enfin, pour jouer, utiliser les touches `Q`et `D` pour déplacer la barre et
la touche espace pour lancer les missiles ou lancer les balles aimantées.

Lors du jeu les touches `P` ainsi que la touche entrée mettent le jeu en pause
ou le sortent de la pause.

Il est aussi possible d'activer et désactiver les sons à l'aide de la touche `M`
ou en cliquant sur le bouton situé dans la barre d'informations.

## Fonctionnalités

Lors de l'ouverture de la page, le jeu vous propose d'entrer votre nom pour le
sauvegarder parmis les meilleurs scores. Le nom fait au maximum 7 caractères 
(pour des raisons de facilité d'affichage), mais il est possible de supprimer 
des caractères pour corriger des erreurs.

Une fois la validation du nom effectuée, le jeu vous propose trois niveaux
de difficulté : `Easy`, `Medium`, et `Hard`.
Le mode `Easy` ne présente que des briques classiques, là où les deux autres
présentent des briques à casser en deux coups. Le mode `Hard` quant a lui,
dispose de briques incassables.

Une fois dans le jeu, la barre espace permet de lancer votre première balle !

Le rebond de la balle ne dépend pas de sa position d'atterissage sur la barre,
mais de l'impulsion que vous lui donnez en bougeant le curseur (nous avons
trouvé ce choix plus intuitif pour le joueur, même si cela est une libertée vis
à vis du jeu original).

Les bonus disponibles sont : 
- 2 missiles qu'il est possible de lancer avec la barre espace

- Un bonus faisant apparaître deux nouvelles balles (vous pouvez avoir un 
nombre infini de balles ! En revanche, nous ne garantissons pas que les
performances soient correcte avec beaucoup de balles.)

- Un bonus agrandissant la barre (Attention, attrapper ce bonus si votre
barre est déjà grande n'aura aucun effet !).

- Un bonus rendant la barre aimantée (Faîtes décoller les balles avec la barre 
espace).

à la fin de la partie, votre score est affiché, suivi des 10 meilleurs
score (les scores étant stockés dans le cache du navigateur).

Enfin, le jeu vous proposera de recommencer en changeant de nom ou pas (vous
pouvez également recharger la page avec F5).

## Implémentation et choix techniques

Afin de programmer ce casse briques, nous avons choisi d'utiliser les
fonctionnalités de l'ES6 afin de faire de la programmation orientée
objets à l'aide de classes (et non de prototype, comme en Javascript classique).

Ce choix a été motivé par notre familiarité avec les langages à classe, et
également car ce jeu n'aurait pas pu être réalisé sans le niveau d'abstraction
que la programmation orientée objets apporte.

Nous avions certaines classes en tête avant de commencer à coder, mais certaines
ont dûes être rajoutée pour régler des problèmes auquels nous n'avions pas 
pensé.

Voici une listre complète de nos classes et un petit descriptif pour les
accompagner :

- Board
  Plateau de jeu principal qui supervise l'ensemble du jeu.
  Il est passé en argument d'un bon nombre de classes afin
  que les objets de cette classes puissent effectuer des tests
  sur d'autres membres du jeu (par exemple, pour que les 
  balles sachent qu'elles touchent des briques.

- Bonus
  Cette classe représente les bonus qui tombent des briques.
  Ce sont les briques qui ont une chance de créer
  des instances de cette classe lorsqu'elles sont détruites.

- Brick
  Classe représentant des briques. Ce sont des objets que l'ont trouve dans 
  le tableau de briques du Board.

- Cursor
  Barre représentant le joueur. Elle doit gérer son état courant 
  (bonus, etc,...). Et donner des informations sur ses collisions aux autres
  objets.

- Info
  Il s'agit de la barre d'information située en haut du jeu.
  Elle récupère des information des différents autres objets (score, nom du
  joueur, nombre de vies, état de la barre), afin de les afficher à 
  l'utilisateur.

- Level
  Une classe qui regroupe les différents niveaux du jeu. Nous expliquerons
  plus tard les détails de la génération de niveaux. Dans cette classe, chaque 
  briques est placée individuellement, donc le code représente simplement des
  dessins à l'aide de briques.

- Missile
  Une classe qui représente les missiles. En fait, elle hérite de Pellet, mais
  certains fonction sont redéfinies (comme la collision, et la mise à jour de
  position) pour en faire des missiles.

- Pellet
  Cette classe représente les balles. Ce sont les objets présents dans le tableau
  de balles de la classe Board.

Pour les sons, une balise audio est créée à la volée lorsqu'ils doivent être
joués, et nous la supprimons dès que le son se termine.

La gestion du mouvement de la balle se fait simplement à l'aide une vitesse
horizontale et une vitesse verticale. Ces vitesses sont modifiées si la balle
touche le bord, le haut ou le bas d'une brique, de même pour les bords de
l'écran.

Ces collisions sont simplement effectuées à l'aide de tests. On regarde si
les coordonées de la balle se trouvent à l'intérieur d'une brique, hors du jeu,
etc...

## Génération des niveaux

Nous avons décidé de créer des dessins pour chaque niveau du casse brique, dans
le but de les rendre moins monotones. Créer ces dessins n'auraient pas été
facile normalement (il faut placer chaque brique selon des coordonées que nous 
devons calculer en fonction de la taille des autres briques, etc..)

C'est pour celà que nous avons créé un script python nous permettant de générer
le code Javascript dont nous avions besoin à partir d'une grille de caractères
ASCII représentant un dessin. Bien sûr, ce script est spécifique à notre projet
en raison des noms de variables et des prototypes de fonction trouvés dans
le résultat du script. Ce script est inclu dans l'archive.

## Musique et bruitages

Le Acapella Arkanoid porte bien son nom : la plupart des bruitages sont faits
à la bouche, car nous avons beaucoup de moyens. C'est pour cette même raison
que nous avons utilisé une musique libre de droits en guise de musique de fond.

## Calcul du score

Le calcul du score se fait à l'aide d'un multiplicateur de score associé à
chaque balle. Par défaut, chaque brique détruite donne 10 points. Ces point sont
multipliés par le multiplicateur de la balle qui augmente si vous touchez 
plusieurs briques d'affilé, mais diminue si vous touchez la balle avec votre 
barre.

