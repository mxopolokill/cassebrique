const STICKY_TIME = 500;
const ENLARGE_TIME = 500;
const MISSILE_TIME = 500;

class Bonus{
  constructor(type,posx,posy,gameboard,size){
    this.type = type;
    this.posy = posy;
    /*-------------------------------------*/
    this.gameboard = gameboard
    this.sizey = size //Le diamètre du bonus est égal à
    //La taille verticale d'une brique
    this.speed = 3; //Constante de vitesse
    this.display();
    /* Temps pour chaque bonus */

    if(this.type == "sticky"){
      this.sizex = size;
      this.time = STICKY_TIME;
    }
    if(this.type == "enlarge"){
      this.sizex = size*2;
      this.time = ENLARGE_TIME;
    }
    if(this.type == "missile"){
      this.sizex = size;
      this.time = MISSILE_TIME;
    }
    if(this.type == "pellet"){
      this.sizex = size;
    }
    this.posx = posx-this.sizex/2;
  }

  /* Affiche le bonus*/
  display(){
    if(this.speed != -1){ //On dit qu'un bonus sorti du jeu a une vitesse de -1
      this.updatePos();
      var ctx = this.gameboard.disp.getContext("2d");
      if(this.type == "sticky"){
	this.drawSticky(ctx);
      }
      else if(this.type == "enlarge"){
	this.drawEnlarge(ctx);
      }
      else if(this.type == "missile"){
	this.drawMissile(ctx);
      }
      else if(this.type == "pellet"){
	this.drawPellets(ctx);
      }
    }
  }

  /*Met à jour la position du bonus*/
  updatePos(){
    if(this.gameboard.cursor.isHit(this)){
      this.gameboard.cursor.setBonus(this, this.time);
      this.speed = -1;
      return;
    }
    if(this.gameboard.touchesSide(this)==3){
      this.speed=-1;
    }
    this.posy = this.posy + this.speed;
  }

  drawEnlarge(ctx){
    ctx.beginPath();
    ctx.fillStyle="#f0f71b"
    ctx.moveTo(this.posx+this.sizex/4,this.posy+this.sizey/4);
    ctx.lineTo(this.posx+(this.sizex*3)/4,this.posy+this.sizey/4);
    ctx.lineTo(this.posx+(this.sizex*3)/4,this.posy);
    ctx.lineTo(this.posx+this.sizex,this.posy+this.sizey/2);
    ctx.lineTo(this.posx+(this.sizex*3)/4,this.posy+this.sizey);
    ctx.lineTo(this.posx+(this.sizex*3)/4,this.posy+(this.sizey*3)/4);
    ctx.lineTo(this.posx+this.sizex/4,this.posy+(this.sizey*3)/4);
    ctx.lineTo(this.posx+this.sizex/4,this.posy+this.sizey);
    ctx.lineTo(this.posx,this.posy+this.sizey/2);
    ctx.lineTo(this.posx+this.sizex/4,this.posy);
    ctx.fill()
    ctx.fillStyle="#FFFFFF";
    ctx.closePath();
  }

  drawSticky(ctx){
    ctx.beginPath();
    ctx.fillStyle="#FF0000";
    ctx.moveTo(this.posx,this.posy+this.sizey/4);
    ctx.bezierCurveTo(this.posx,this.posy+this.sizey,this.posx+this.sizex,this.posy+this.sizey,this.posx+this.sizex,this.posy+this.sizey/4);
    ctx.lineTo(this.posx+(this.sizex*3)/4,this.posy+this.sizey/4);
    ctx.bezierCurveTo(this.posx+(this.sizex*3)/4,this.posy+(this.sizey*3)/4,this.posx+this.sizex/4,this.posy+(this.sizey*3)/4,this.posx+this.sizex/4,this.posy+this.sizey/4);
    ctx.lineTo(this.posx,this.posy+this.sizey/4);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle="#FFFFFF";
    ctx.rect(this.posx,this.posy,this.sizex/4,this.sizey/4);
    ctx.rect(this.posx+this.sizex,this.posy,-this.sizex/4,this.sizey/4);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle="#FFFFFF";
  }

  drawPellets(ctx){
    ctx.beginPath();
    ctx.textAlign = "left";
    ctx.fillText("+2",this.posx,this.posy);
    ctx.stroke();
    ctx.closePath();
  }

  drawMissile(ctx){
    ctx.beginPath();
    ctx.fillStyle="#FFFFFF";
    ctx.rect(this.posx+this.sizex/3,this.posy+this.sizey/4,this.sizex/3,
      this.sizey*3/4);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle="#FF0000";
    ctx.moveTo(this.posx+this.sizex/3,this.posy+this.sizey/4);
    ctx.bezierCurveTo(this.posx+this.sizex/3,this.posy,this.posx+this.sizex*2/3,
      this.posy,this.posx+this.sizex*2/3,this.posy+this.sizey/4);
    ctx.lineTo(this.posx+this.sizex/3,this.posy+this.sizey/4);
    ctx.fill();
    ctx.fillStyle="#FFFFFF";
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle="#BBBBBB";
    ctx.moveTo(this.posx+this.sizex/3,this.posy+this.sizey);
    ctx.lineTo(this.posx,this.posy+this.sizey);
    ctx.lineTo(this.posx+this.sizex/3,this.posy+this.sizey/2);
    ctx.moveTo(this.posx+this.sizex*2/3,this.posy+this.sizey);
    ctx.lineTo(this.posx+this.sizex,this.posy+this.sizey);
    ctx.lineTo(this.posx+this.sizex*2/3,this.posy+this.sizey/2);
    ctx.fill();
    ctx.fillStyle="#FFFFFF";
    ctx.closePath();
  }
}

