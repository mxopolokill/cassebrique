class Pellet{
  constructor(gameboard){
    this.size = 10; //Rayon de la balle, à changer en fonction de la taille 
   // de l'écran
    this.sizex = this.size;
    this.sizey = this.size;
    /*--------------------------------------*/
    this.gameboard = gameboard;
    /*--------------------------------------*/
    /* Initialisation de la position */
    this.posx = this.gameboard.cursor.getMiddle();
    this.posy = this.gameboard.cursor.posy - this.size;
    /*--------------------------------------*/
    this.speed = 5; //Constante de vitesse
    this.direction = [0, -1]; //Direction (tableau qui représente direction en x
    //et y
    //
    this.scoreMult = 1;
  }

  /*Fonction d'affichage de la balle*/
  display(){
    if(this.speed != -1){ //On dit qu'une balle sortie du jeu a une vitesse de -1
      this.updatePos();
      var ctx = this.gameboard.disp.getContext("2d");
      ctx.beginPath();
      ctx.arc(this.posx, this.posy, this.size, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    }
  }

  /*Mise à jour de la position de la balle*/
  updatePos(){
    if(this.gameboard.cursor.isHit(this)){
      if(this.gameboard.cursor.sticky){
	this.posx =this.gameboard.cursor.posx + (this.posx - this.gameboard.getCursorOldPosX());
	this.direction[0] = 0;
        this.direction[1] = -1;
	return;
      }
      else{
        if(this.scoreMult!=1)
          this.scoreMult--;
	this.direction[1] = -1;
	this.gameboard.addSound("Music/cursor.wav");
	if(this.gameboard.cursor.speed != 0){
	  this.direction[0] = this.direction[0]/2 + this.gameboard.cursor.speed/2;
	}
      }
    }
    var hit = this.hitsBrick();
    if(hit==2){
      if(this.direction[0] == 0){
	this.direction[1] *= -1;
      }
      else{
      this.direction[0] = this.direction[0] * (-1);
      }
    }
    else if(hit==1){
      this.direction[1] = this.direction[1] * (-1);
    }
    var side = this.gameboard.touchesSide(this);
    if(side == 1){
      this.direction[1] = this.direction[1] * (-1);
      this.gameboard.addSound("Music/bords.wav");
    }
    if(side == 2){
      this.direction [0] = this.direction[0] * (-1);
      this.gameboard.addSound("Music/bords.wav");
    }
    if(side == 3){
      this.speed = -1;
    }
    this.posx = this.posx + this.direction[0];
    this.posy = this.posy + this.direction[1] * this.speed; 
  }

  /*Teste si la balle touche ou non une brique*/
  hitsBrick(){
    var max_i = this.gameboard.bricks;
    var ret;
    for(var i=0;i<max_i;i++){
      ret = this.gameboard.bricksArray[i].isHit(this);
      if(ret!=0){
	return ret;
      }
    }
    return 0;
  }   

  /*Teste si la barre touche le curseur*/
  hitsCursor(){
    return (this.gameboard.cursor.isHit(this));
  }

  /*Teste si la barre est morte*/
  isOut(){
    return this.speed==-1;
  }

  /*Change la direction de la barre*/
  changeDir(dir){
  this.direction[0] += dir;
  }

  /*Initialise les balles bonus*/
  bonusPelletFromPellet(pos){
    if(pos==1){
      this.changeDir(3);
    }
    else if(pos == 2){
      this.changeDir(-3);
    }
    this.changePosY(-1);
  }

  changePosY(arg){
    this.posy += arg;
  }
}
