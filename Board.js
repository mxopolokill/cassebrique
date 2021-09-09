///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//création classe board//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Board{                                                                                                 ///
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(posx, posy, sizex, sizey){                                                                   ///
    this.bricks; //Nombre de briques (pas encore défini)                                                  ///
    this.bricksArray = []; //Déclaration d'un tableau de briques                                         ///
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    this.pellets = 1; //Nombre de balles                                                              ///
    this.pelletsArray = []; //Déclaration d'un tableau de balles                                     ///
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    this.bonus = 0;//Nombre de bonus                                                               ///
    this.bonusArray = [];//Déclaration d'un tableau de bonus                                      ///
    ////////////////////////////////////////////////////////////////////////////////////////////////
    this.posx = posx; //Position sur la page en x                                               ///
    this.posy = posy; //Position sur la page en y                                              ///
    /////////////////////////////////////////////////////////////////////////////////////////////
    this.sizex = sizex; //Largeur de la grille                                               ///
    this.sizey = sizey; //Hauteur de la grille                                              ///
    //////////////////////////////////////////////////////////////////////////////////////////
    this.disp = document.getElementById("can");//récuperation élement HTML via ID         ///
    this.disp.height = window.innerHeight;//hauteur fenetre                              ///
    this.disp.width = window.innerWidth;//largeur fenetre                               ///
    this.cursor = new Cursor(this.sizex/6, this);// ajout paddle                       ///
    /////////////////////////////////////////////////////////////////////////////////////
    var board = this; // Obligatoire car "this" ne référence plus cet objet          ///
    ///////////////quand on rentre dans la fonction anonyme///////////////////////////////////////////////////////////////
    document.addEventListener("keydown",function(e){board.inputDown(e);});//touche clavier presser             ///////////
    document.addEventListener("keyup", function(e){board.inputUp(e);});//touche clavier non presser            ///////////
    this.keypressed = "";                                                                                      ///////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.score = 0; //Score                                                                                            ///
    this.scorePrint = 0; //Permet de savoir si le score est déjà sauvegardé                                            ///
    this.started = 0;   //état de jeu de 0 à 5                                                                         ///
    this.select = 2;    // Position du curseur dans les menus                                                          ///   
    this.name = "";     // nom du joueur                                                                               ///
    this.lives;         //info vie                                                                                     ///
    this.info;          // Barre d'info                                                                                ///
    this.nbSound = 0;   // Id du prochain son à ajouter                                                                ///
    this.music = 1;     // Musique active ou non                                                                       ///
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.printNameScreen();//ajout du nom selectionner                                                                 ///
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Affiche l'écran de choix de Pseudo////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  printNameScreen(){                                                                                             ///
    var ctx = this.disp.getContext("2d");//ajout du contexte                                                    ///
    ctx.beginPath();//ouverture chemin                                                                         ///
    ctx.rect(this.posx, this.posy, this.sizex, this.sizey);//dessin rectangle                                 ///
    ctx.fillStyle = "#222222";//remplissage via couleur                                                      ///
    ctx.fill();//remplissage                                                                                ///
    ctx.stroke();//dessine chemin actuelle                                                                 ///
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    var fontSize = this.sizey /10 ;// changement taille texte                                            ///
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
    ctx.fillStyle = "#ffffff"; //remplissage via couleur                                               ///
    ctx.strokeStyle = "#ffffff"; //dessine chemin avec remplissage d'un couleur spécifique            ///
    ctx.font = fontSize + "px Arial";// changement style de police                                   ///
    ctx.textAlign = "center";// alignement du texte au centre                                       ////////
    ctx.fillText("Enter your name :",this.posx + this.sizex/2, //remplissage de l'élement avec du texte ///
      this.posy + this.sizey/2);// position et taille                                              ///////
    ctx.fillText(this.name,this.posx + this.sizex/2, // remplissage                               ///
      this.posy + this.sizey/2 + fontSize); // position et taille                                ///
    ctx.closePath();//fermeture chemin                                                          ///
  }///////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Affiche l'écran de choix de difficulté (sans curseur)///////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  printStartScreen(){                                                                                  ///
    var ctx = this.disp.getContext("2d"); //choix contexte                                            ///
    ctx.beginPath();// ouverture chemin                                                              ///
    ctx.rect(this.posx, this.posy, this.sizex, this.sizey);//création d'un bloc                     ///
    ctx.fillStyle = "#222222"; //remplissage avec couleur                                          ///
    ctx.fill();// remplissage chemin                                                              /// 
    ctx.stroke();//dessine chemin actuellement crée                                              ///
  /////////////////////////////////////////////////////////////////////////////////////////////////
    var fontSize = this.sizey/10;// changement taille texte                                    ///
  ///////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////
    ctx.fillStyle = "white";//remplissage avec couleur                                      ///
    ctx.strokeStyle = "white"; //dessine chemin avec remplissage d'un couleur spécifique   ///
    ctx.font = fontSize + "px Arial";// changement style de police d'"écriture"           ///
    ctx.textAlign = "center"; // alignement du texte au centre                           ///////////////////////
    ctx.fillText("Choose your level!",this.posx + this.sizex/2 ,  //remplissage de l'élement avec du texte  ///
      this.posy + this.sizey/4); // position et taille                                                     ///
    ctx.fillText("Easy",this.posx + this.sizex/2 ,  //remplissage de l'élement avec du texte              ///
      this.posy + this.sizey/2); // position et taille                                                   ///
    ctx.fillText("Medium",this.posx + this.sizex/2 ,  //remplissage de l'élement avec du texte          ///
      this.posy + this.sizey/2 + fontSize*2); // position et taille                                    ///
    ctx.fillText("Hard",this.posx + this.sizex/2 ,  //remplissage de l'élement avec du texte          ///
      this.posy + this.sizey/2 + fontSize*4); // position et taille                                  ///
    ctx.closePath();//fermeture chemin                                                              ///
  }///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //affiche le curseur ou valide le choix de l'utilisateur dans les 2 menus////////////
  ////////////////////////////////////////////////////////////////////////////////////
  startScreenLoop(e){                                                              ///
    // ouverture switch//////////////////////////////////////////////////////////////
    switch(e){                                                                   ///
      case "select":{                                                           ///
        if(this.started==1){                                                   ///
	  this.setup(this.select);                                                  ///
          this.select = 2;                                                   ///
          this.info = new Info(this);                                       ///
	  this.started=2;                                                        ///
        }////////////////////////////////////////////////////////////////////
        else if(this.started==5){                                         ///
          if(this.select==1){                                             ///
            this.restart(1);                                              ///
          }//////////////////////////////////////////////////////////////////
           else if(this.select==2){                                       ///
            this.restart(0);                                              ///
          }//////////////////////////////////////////////////////////////////
        }////////////////////////////////////////////////////////////////////
	return;                                                                 ///
      }/////////////////////////////////////////////////////////////////////
      case "up":{                                                        ///
	if(this.select>1){                                                    ///
	  this.select--;                                                     ///
	}//////////////////////////////////////////////////////////////////////
	break;                                                             ///
      }/////////////////////////////////////////////////////////////////
      case "down":{                                                 ///////////////////////////
	if((this.select<3 && this.started==1) || (this.select<2 && this.started==5)){             ///
	  this.select++;                                                                           ///
	}////////////////////////////////////////////////////////////////////////////////////////////////////////////
	break;                                                                                                    ///
      }////////////////////////////////////////////////////////////////////////////////////////////////////////
    }//////////////////////////////////////////////////////////////////////////////////////////////////////////
    var ctx = this.disp.getContext("2d");//choix contexte                                                   ///
    var fontSize = this.sizey/10; // changement style de police                                             ///
    ctx.beginPath();//ouverture chemin                                                                      ///
    ctx.moveTo(this.posx + this.sizex/5,//déplacement chemin                                                //////////////////
      this.posy + (this.select-1)*(fontSize*2) + this.sizey/2 - fontSize/4);// modificitaion position et t'aille font      ///
    ctx.lineTo(this.posx + this.sizex/6,// connexion du chemin                                                             ///
      this.posy + (this.select-1)*(fontSize*2) + this.sizey/2);// modificitaion position et t'aille font                   ///  
    ctx.moveTo(this.posx + this.sizex/5,//déplacement chemin                                                               ///
      this.posy + (this.select-1)*(fontSize*2) + this.sizey/2 - fontSize/4);// modificitaion position et t'aille font      ///
    ctx.lineTo(this.posx + this.sizex/6,// connexion du chemin                                                             ///
      this.posy + (this.select-1)*(fontSize*2) + this.sizey/2 - fontSize/2);// modificitaion position et t'aille font      ///
    ctx.lineTo(this.posx + this.sizex/6,// connexion du chemin                                                            ///
      this.posy + (this.select-1)*(fontSize*2) + this.sizey/2);                                                          ///
    ctx.lineWidth = 3;// Largeur  de la ligne                                                                           ///
    ctx.stroke();//dessine le chemin                                                                                   ///
    ctx.lineWidth = 0.5;//largeur de la ligne                                                                         ///
    ctx.closePath();//fermeture chemin                                                                               ///
  }////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  ////////////////////////////////////////////////////////////////////////////
  //Préparation du jeu et de la difficulté (affecte le nombre de briques//////
  //et le tableau de briques /////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  setup(lvl){                                                              ///
    var level = new Level(this);// créatio variable Level                  ///
    for(var i=0;i<this.pellets;i++){                                       ///
      this.pelletsArray[i] = new Pellet(this);                             ///
    }                                                                      ///
    level.setupLevel(lvl);                                                 ///
    this.lives=3;//ajout 3 vies du paddle                                  ///                          
  }///////////////////////////////////////////////////////////////////////////






  /////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  //Affichage de la zone de jeu et des éléments du jeu///////////////////////
  //////////////////////////////////////////////////////////////////////////
    display(){                                                          ///
      if(this.testPellets()){                                          ///
      if(this.lives==1)                                               ///
	     this.printLoseScreen();                                       ///
      else{                                                         ///
	      this.lives--;                                              ///
	      this.pelletsArray[this.pellets++]= new Pellet(this);      ///
	      this.cursor.sticky = true;                               ///
	      this.cursor.stickyTime = 500;                           ///
          this.info.supprLives();                              ///
        }                                                     ///
    }//////////////////////////////////////////////////////////////////////
    else if(!this.testBricks()){                                        ///
      var ctx = this.disp.getContext("2d");                             ///
      ctx.beginPath();                                                  ///
      ctx.rect(this.posx, this.posy, this.sizex, this.sizey);           ///
      ctx.fillStyle = "#222222";                                        ///
      ctx.fill();                                                       ///
      ctx.stroke();                                                     ///
      ctx.closePath();                                                  ///
      //Affichage du curseur///////////////////////////////////////////////                     
      this.cursor.display();                                            ///
      this.displayBricks();                                             ///
      this.displayPellets();                                            ///
      this.displayBonus();                                              ///
      this.info.display();                                              ///
    }//////////////////////////////////////////////////////////////////////
    else{                                                               ///
      this.printWinScreen();                                            ///
    }                                                                   ///
  }////////////////////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  //Affichage des briques ///////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////
  displayBricks(){                                                  ///
    for(var i=0;i<this.bricks;i++){                               ///
      this.bricksArray[i].display();                              ///
    } /////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  }//////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ///Vérifie si toutes les briques ont été détruites/////////////
  testBricks(){                                              ///
    var test=1;                                             ///
    for(var i=0;i<this.bricks;i++){                        ///
      test = this.bricksArray[i].isDead();                ///
      if(!test){                                         ///
	break;                                                ///
      }/////////////////////////////////////////////////
    }//////////////////////////////////////////////////
    return test;                                     ///
  }/////////////////////////////////////////////////////
  //////////////////////////////////////////////////////

  // Renvoie 0 si il reste une balle et 1 sinon
  testPellets(){
    var test=1;
    for(var i=0;i<this.pellets;i++){
      test = this.pelletsArray[i].isOut();
      if(!test){
	break;
      }
    }
    return test;
  }

  /* Affichage des balles */
  displayPellets(){
    for(var i=0;i<this.pellets;i++){
      this.pelletsArray[i].display();
    }
  }

  /* Affichage des bonus */
  displayBonus(){
    for(var i=0;i<this.bonus;i++){
      this.bonusArray[i].display();
    }
  }

  // Ajoute un bonus
  addBonus(b){
    this.bonus++;
    this.bonusArray.push(b);
  }

  // Ces deux fonctions donnent la taille d'une brique dans la grille //
  //(c'était plus pratique de mettre ces méthodes dans board plutôt que dans brick //

  getBrickSizeX(x){
    return this.sizex/x;
  }

  getBrickSizeY(y){
    return this.sizey/y;
  }

  /*Fonction permettant de rafraîchir l'affichage*/
  refresh(){
    var ctx = this.disp.getContext("2d");
    /* On commence par efface tout ce qui se trouve dans le canvas */
    this.clear();
    /* Puis on affiche à nouveau le canvas */
    /* On vérifie dans quel écran on est: */
    if(this.started==3){
      this.printTabScore();
    }
    else {
      if(this.started == 2){
        this.display();
      }
      else {
        if(this.started==1){
          this.printStartScreen();
          this.startScreenLoop("");
        }
        else {
          if(this.started==0){
            this.printNameScreen();
          }
          else {
            if(this.started==4){
              this.printPauseScreen();
            }
            else 
              if(this.started==5){
                this.printScreenRestart();
                this.startScreenLoop("");
              }
          }
        }
      }
    }
    /* Gestion des inputs */
    this.getInput(this.keypressed);
  }

  //Affiche l'écran de pause du jeu
  printPauseScreen(){
    var ctx = this.disp.getContext("2d");// choix contexte
    ctx.beginPath();//ouverture chemin 
    ctx.rect(this.posx + this.sizex*0.1, this.posy + this.sizey*0.1, this.sizex*0.8, this.sizey*0.8);//création bloc 
    ctx.fillStyle = "#666666";// remplissage couleur 
    ctx.fill();// remplissage
    ctx.stroke();//dessinne 
    ctx.fillStyle = "#ffffff"//choix couleur remplissage
    ctx.strokeStyle = "#ffffff";//dessine avec couleur de remplissage spécifique 
    var fontSize = this.sizey/10; // taille d'ecriture 
    ctx.font = fontSize + "px Arial";//format d'écriture
    ctx.textAlign = "center";//alignement du texte au centre
    var txt;// variable txt  choix entre son activé ou désactiver//
    if(this.music)
      txt = "ON"// activation de l'audio 
    else
      txt = "OFF"// désactivation de l'audio 
    ctx.fillText("Musique :" + txt,this.posx + this.sizex/2,this.posy + this.sizey/2 + fontSize/4);// ajout texte
    ctx.closePath();// fermeture chemin 
  }

  /* Fonction qui efface l'affichage*/
  clear(){
    var ctx = this.disp.getContext("2d");
    ctx.clearRect(0,0,this.disp.width,this.disp.height);
  }


  /* Fonction renvoyant 1 si le point (x,y) est dans le plateau ou 0 sinon */
  isIn(x,y){
    return ((x>this.posx) && (x<(this.sizex + this.posx)) && (y>this.posy) &&
      (y<(this.sizey + this.posy)));
  }

  /* Fonction renvoyant 1 si la balle p touche le bord nord, 2 si elle touche
   * un des bords verticaux, et 3 si elle touche le bord sud. Elle envoie 0 sinon */

  touchesSide(p){
    if(p.posy - p.sizey <= this.posy){
      return 1;
    }
    if((p.posx - p.sizey <= this.posx) || (p.posx + p.sizex >= this.posx + this.sizex)){
      return 2;
    }
    if(p.posy + p.sizey >= this.posy + this.sizey){
      return 3;
    }
    else{
      return 0;
    }
  }

  ///////////////////////////////////////////////////////////////////////////
  /// Fonction qui déplace le curseur en fonction d'un pression de touche ///
  ///////////////////////////////////////////////////////////////////////////
   getInput(e){                                                            //
     this.cursor.moveCursor(e);                                            //
    }                                                                      //
  ///////////////////////////////////////////////////////////////////////////



  /* Affiche l'écran de victoire */
  printWinScreen(){
    var ctx = this.disp.getContext("2d");
    ctx.beginPath();
    ctx.rect(this.posx, this.posy, this.sizex, this.sizey);
    ctx.fillStyle = "#222222";
    ctx.fill();
    ctx.stroke();

    var fontSize = this.sizey/9;

    ctx.fillStyle = "white";
    ctx.font = fontSize + "px Arial";
    ctx.textAlign = "center";
    ctx.fillText("You win!",this.posx + this.sizex/2 ,this.posy + this.sizey/2);
    ctx.fillText("Score : " + this.score ,this.posx + this.sizex/2 ,this.posy + this.sizey/2 + fontSize*2);
    ctx.closePath();

    sleep(5000).then(()=> {
      this.started=3;
      this.StorageScore(this.score);
    });

  }

  printLoseScreen(){
    var ctx = this.disp.getContext("2d");
    ctx.beginPath();
    ctx.rect(this.posx, this.posy, this.sizex, this.sizey);
    ctx.fillStyle = "#222222";
    ctx.fill();
    ctx.stroke();

    var fontSize = this.sizey/9;

    ctx.fillStyle = "white";
    ctx.font = fontSize + "px Arial";
    ctx.textAlign = "center";
    ctx.fillText("You lose!",this.posx + this.sizex/2 ,this.posy + this.sizey/2);
    ctx.fillText("Score : " + this.score ,this.posx + this.sizex/2 ,this.posy + this.sizey/2 + fontSize*2);
    ctx.closePath();
    sleep(5000).then(()=> {
      this.started=3;
      this.StorageScore(this.score);
    });

  }


  printTabScore(){
    var i,ctx = this.disp.getContext("2d");
    ctx.beginPath();
    ctx.rect(this.posx, this.posy, this.sizex, this.sizey);
    ctx.fillStyle = "#222222";
    ctx.fill();
    ctx.stroke();
    var fontSize = this.sizey/20;
    ctx.fillStyle = "white";
    ctx.font = fontSize + "px Courier";
    ctx.textAlign = "center";
    var stored = window.localStorage.getItem("BestScore");
    var scoreTab = JSON.parse(stored);
    ctx.fillText("High Score",this.posx + this.sizex/2, this.posy + this.sizey/11);

    ctx.textAlign = "left";
    for(i=0;i<9;i++){
      ctx.fillText(scoreTab[i][0] + " : " + scoreTab[i][1], this.posx + this.sizex/10, this.posy + this.sizey/11 * (i+2));
    }

    sleep(5000).then(()=> {
      this.started=5;
    });
    ctx.closePath();
  }

  inputUp(e){
    switch(e.keyCode){
      case 81:{
	e.preventDefault();
	this.keypressed = "";
	break;
      }
      case 68:{
	e.preventDefault();
	this.keypressed = "";
	break;
      }
      case 83:{
	e.preventDefault();
	this.keypressed = "";
	break;
      }
      case 90:{
	e.preventDefault();
	this.keypressed = "";
	break;
      }
    }
  }

  inputDown(e){
    if(this.started==0){
      if(e.keyCode == 32 || e.keyCode == 13){
	e.preventDefault();
	while((this.name).length<7)
	  this.name = this.name + " ";
        if(this.nbSound==0)
          this.addSound("Music/mainSound.mp3");
	this.started = 1;
      }
      else if(e.keyCode < 91 && e.keyCode > 47){
	e.preventDefault();
	if((this.name).length>=7)
	  this.name= this.name.substr(0,6);
	this.name = this.name + String.fromCharCode(e.keyCode);
      }
      else if(e.keyCode == 8 && this.name.length>0){
	this.name = this.name.substr(0,this.name.length-1);
      }
    }
    else{
      switch(e.keyCode){
	case 81:{
	  e.preventDefault();
	  this.keypressed = "left";
	  break;
	}
	case 68:{
	  e.preventDefault();
	  this.keypressed = "right";
	  break;
	}
	case 32:{
	  e.preventDefault();
	  if(this.started == 1 || this.started == 5){
	    this.startScreenLoop("select");
	  }
	  else{
	    this.cursor.moveCursor("special");
	  }
	  break;
	}
	  //touches pour le enu
	case 90:{
	  e.preventDefault();
	  if(this.started == 1 || this.started == 5){
	    this.startScreenLoop("up");
	  }
	  break;
	}
	case 83:{
	  e.preventDefault();
	  if(this.started == 1 || this.started == 5){
	    this.startScreenLoop("down");
	  }
	  break;
	}
	case 80:{
	  if(this.started==2){
	    this.started = 4;
	  }
	  else if(this.started == 4){
	    this.started = 2;
	  }
	  break;
	}
	case 13:{
	  if(this.started==2){
	    this.started = 4;
	  }
	  else if(this.started == 4){
	    this.started = 2;
	  }
	  break;
	}
	case 77:{
	  if(this.getMusicStatus()){
	    this.toggleMusic();
	  }
	  else{
	    this.toggleMusic();
	  }
	  break;
	}
      }
    }
  }

  StorageScore(score){
    if(this.scorePrint == 1)
      return ;
    var TabScore, i, j;
    var stored = window.localStorage.getItem("BestScore");
    if(stored)
      TabScore = JSON.parse(stored);
    else
      TabScore = [["       ",0],["       ",0],["       ",0],["       ",0],
	["       ",0],["       ",0],["       ",0],["       ",0],
	["       ",0],["       ",0]];

    for(i=0;i<10;i++){
      if(score>TabScore[i][1]){
	for(j=9;j>i;j--){
	  TabScore[j][0]=TabScore[j-1][0];
	  TabScore[j][1]=TabScore[j-1][1];
	}
	TabScore[i][0]=this.name;
	TabScore[i][1]=score;
	break;
      }
    }
    window.localStorage.setItem("BestScore",JSON.stringify(TabScore));
    this.scorePrint=1;
  }

  bonusPellet(){
    this.pellets += 2;
    this.pelletsArray.push(new Pellet(this));
    this.pelletsArray.push(new Pellet(this));
    this.pelletsArray[this.pellets-1].bonusPelletFromPellet(1);
    this.pelletsArray[this.pellets-2].bonusPelletFromPellet(2);
  }

  bonusMissile(){
      this.pellets += 2;
      this.pelletsArray.push(new Missile(this,1));
      this.pelletsArray.push(new Missile(this,2));
  }

  addSound(link){
    if(this.getMusicStatus()){
      var node = document.createElement("audio");
      document.getElementById("body").appendChild(node);
      node.id = "" + this.nbSound;
      node.src = link;
      node.play();
      node.onended = function(){ supprSound(this)};
      this.nbSound++;
    }
  }

  supprSound(elem){
    if(elem.id=="0"){
      elem.currentTime = 0;
      if(this.getMusicStatus())
        elem.play();
    }
    else{
      document.getElementById("body").removeChild(elem);
    }
  }


  printScreenRestart(){
    var ctx = this.disp.getContext("2d");
    ctx.beginPath();
    ctx.rect(this.posx, this.posy, this.sizex, this.sizey);
    ctx.fillStyle = "#222222";
    ctx.fill();
    ctx.stroke();
   
    var fontSize = this.sizey/10;
  
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.font = fontSize + "px Arial";
    ctx.textAlign = "center";
    ctx.fillText("options de redémarrage :",this.posx + this.sizex/2 ,this.posy + this.sizey/4);
    ctx.fillText("redelarrer avec le même nom",this.posx + this.sizex/2 ,this.posy + this.sizey/2);
    ctx.fillText("redemarrer avec un pseudo different",this.posx + this.sizex/2 ,this.posy + this.sizey/2 + fontSize*2);
    ctx.closePath();
  }

  restart(newState){
    if(newState==0){
      this.name = "";
    }
    this.pellets=1;
    this.pelletsArray = []; //Garbage Collector will clean last tab
    this.bonus=0;
    this.bonus = [];
    this.bricks=0;
    this.bricksArray = [];
    this.score=0;
    this.scoreprint=0;
    this.cursor = new Cursor(this.sizex/6, this);
    sleep(1000).then(()=> {
      this.started = newState;
    });
  }

  getCursorPosX(){
    return this.cursor.getPosX();
  }

  getCursorSizeX(){
    return this.cursor.getSizeX();
  }
  getCursorPosY(){
    return this.cursor.getPosY();
  }

  getCursorSizeY(){
    return this.cursor.getSizeY();
  }

  getCursorOldPosX(){
    return this.cursor.getOldPosX();
  }

  getCursorMissileStatus(){
    return this.cursor.getMissileStatus();
  }

  toggleMusic(){
    this.music = this.music==1? 0:1;
    if(!this.getMusicStatus()){
      document.getElementById("0").pause();
    }
    else{
      document.getElementById("0").play();
    }
  }

  getMusicStatus(){
    return this.music;
  }

  getCursorMissileTime(){
    return Math.floor(this.cursor.getMissileTime()/60);
  }

  getCursorEnlargeStatus(){
    return this.cursor.getEnlargeStatus();
  }

  getCursorEnlargeTime(){
    return Math.floor(this.cursor.getEnlargeTime()/60);
  }

  getCursorStickyStatus(){
    return this.cursor.getStickyStatus();
  }

  getCursorStickyTime(){
    return Math.floor(this.cursor.getStickyTime()/60);
  }



}
