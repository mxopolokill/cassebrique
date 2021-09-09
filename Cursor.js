const INPUT_DELAY = 5;
const MAX_SPEED = 5;
const ENLARGE_BONUS = 100;

class Cursor{

  constructor(size, gameboard){
    /*--------------------------------*/
    this.size = size; //Taille
    this.gameboard = gameboard; //Zone de jeu 
    /*--------------------------------*/
    /* Position en x et en y*/
    this.posx = this.gameboard.posx + this.gameboard.sizex/2 - this.size/2;
    this.posy = this.gameboard.sizey - this.gameboard.sizey/20
    /*--------------------------------*/
    this.sizex = size;
    this.sizey = this.gameboard.sizey/20;
    /*--------------------------------*/
    this.accel = 0; //Acceleration
    /*--- Bonus ----------------------*/
    this.sticky = true;
    this.enlarge = false;
    this.missile = false;
    /*---- Durée des bonus------------*/
    this.stickyTime = -1; 
    this.enlargeTime = 0;
    this.missileTime = 0;
    /*---- Permet d'arrêter la barre lorsque qu'aucune touche n'est appuyée */
    this.counter = 0;
    /*--------------------------------*/
    /* Constante(s) */
    this.speed = this.accel;
  }

  /*Fonction pour afficher le curseur dans sa position de base*/

  display(){ 
    this.updateBonus();
    /*Cette partie sert à arrêter le curseur si aucune touche n'est pressée
     * un certain temps */
    this.oldposx = this.posx;
    this.counter++;
    if(this.counter >= INPUT_DELAY){
      this.accel = 0;
      this.speed = 0;
    }
    if(this.speed<0){
      for(var i=0;i>this.speed;i--){
	if(this.gameboard.isIn(this.posx, this.posy))
	  this.posx --;
	else this.speed = 0;
      }
    }
    else{
      for(var i=0;i<this.speed;i++){
	if(this.gameboard.isIn(this.posx + this.sizex, this.posy))
	  this.posx++;
	else this.speed=0;
      }
    }
    /* Affichage */
    var ctx = this.gameboard.disp.getContext("2d");
    ctx.beginPath();
    ctx.rect(this.posx,this.posy,this.sizex,this.sizey);
    ctx.fillStyle = "purple";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  /* Fonction d'effacement du curseur*/


  moveCursor(direction){ //Fonction de déplacement du curseur
    var dir;
    switch(direction){
      case "left":{
	if(this.accel>0){
	  this.accel=-1;
	  this.speed = 2;
	}
	this.accel -= 0.2;
	if(Math.abs(this.speed)<=MAX_SPEED){
	  this.speed += this.accel;
	}
	this.counter = 0;
	break;
      }
      case "right":{
	if(this.accel<0){
	  this.accel=1;
	  this.speed = -2;
	}
	this.accel+=0.2;
	if(Math.abs(this.speed)<=MAX_SPEED){
	  this.speed += this.accel;
	}
	this.counter = 0;
	break;
      }
      case "special":{
	if(this.sticky){
	  this.sticky = false;
	  this.stickTime = 0;
	}
	else if(this.missile){
	  this.missile = false;
	  this.gameboard.addSound("Music/missiles.wav");
	  this.missileTime = 0;
	}
	break;
      }
    }
  }

  /* Change le status de la barre en fonction du bonus. Le bonus doit être un
   * objet de type Bonus, time décrit la durée du bonus */
  setBonus(bonus,time){
    switch(bonus.type){
      case "sticky":{
	this.sticky = true;
	this.stickyTime = time;
	break;
      }
      case "enlarge":{
	if(!this.enlarge && this.enlargeTime<0){
	  this.enlarge = true;
	  this.enlargeTime = time;
	  this.gameboard.addSound("Music/enlarge.wav");
	}
	break;
      }
      case "missile":{
	if(this.missile!=true){
	  this.missile = true;
	  this.missileTime = time;
	  this.gameboard.bonusMissile();
	}
	break;
      }
      case "pellet":{
	this.gameboard.bonusPellet();
	break;
      }
    }
  }


  /*Renvoie la postion du milieu de la barre*/
  getMiddle(){
    return this.posx + this.sizex/2;
  }

  /*Teste si l'objet p touche la barre*/
  isHit(p){
    return ((p.posy + p.sizey >= this.posy && p.posy + p.sizey <= this.posy+this.sizey) && (p.posx+p.sizex >= this.posx) && (p.posx <=
      this.posx + this.sizex));
  }

  /*Met à jour le status de la barre (timer de bonus)*/
  updateBonus(){
    if(this.sticky && this.stickyTime==0){
      this.sticky = false;
    }
    else{
      this.stickyTime--;
    }
    if(this.missile && this.missileTime==0){
      this.missile = false;
      this.gameboard.addSound("Music/missiles.wav");
    }
    else{
      this.missileTime--;
    }

    if(this.enlarge && this.enlargeTime==0){
      this.enlarge = false;
      this.enlargeTime=ENLARGE_BONUS;
    }

        //Ce bout de code permet l'affichage progressif de l'agrandissement
    else {
      this.enlargeTime--;
      if(this.enlarge && (this.enlargeTime>= ENLARGE_TIME - ENLARGE_BONUS)){
	this.posx -= 0.5;
	this.sizex += 1;
      }
      if(!this.enlarge && this.enlargeTime>=0){
	if(this.enlargeTime == 0){
	  this.enlargeTime = -1;
	}
	this.sizex -= 1;
	this.posx += 0.5;
      }
    }
  }

  /*Une tonne de getters*/

  getPosX(){
    return this.posx;
  }

  getPosY(){
    return this.posy;
  }

  getSizeX(){
    return this.sizex;
  }

  getSizeY(){
    return this.sizey;
  }

  getOldPosX(){
    return this.oldposx;
  }

  getMissileStatus(){
    return this.missile;
  }

  getMissileTime(){
    return this.missileTime;
  }

  getEnlargeStatus(){
    return this.enlarge;
  }

  getEnlargeTime(){
    return this.enlargeTime;
  }

  getStickyTime(){
    return this.stickyTime;
  }

  getStickyStatus(){
    return (this.sticky && this.getStickyTime()>=0);
  }

}

