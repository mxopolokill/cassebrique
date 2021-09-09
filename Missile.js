class Missile extends Pellet{ 
  constructor(gameboard,pos){
    super(gameboard);

    if(pos == 1){
      this.posx = this.gameboard.getCursorPosX() - this.sizex;
    }
    else if(pos == 2){

      this.posx = this.gameboard.getCursorPosX() + this.gameboard.getCursorSizeX() - this.sizex;
    }
    this.sizey = this.gameboard.getCursorSizeY();
    this.sizex = this.sizey;
    this.posy = this.gameboard.getCursorPosY();
    this.pos = pos;
  }

  /*Redéfinition de la méthode d'affichage des balles*/
  display(){
    if(this.speed != -1){
      this.updatePos();
      var ctx = this.gameboard.disp.getContext("2d");
      this.drawMissile(ctx);
    }
  }

  /*Redéfinition de la méthode de positionnement des balles*/
  updatePos(){
    if(this.hitsBrick()!=0){
      this.speed=-1;
    }
    if(this.gameboard.touchesSide(this)==1){
      this.speed=-1;
    }

    else if(this.gameboard.getCursorMissileStatus() == true && this.posy==
      this.gameboard.getCursorPosY()){
      if(this.pos==1){
	this.posx = this.gameboard.getCursorPosX() - this.sizex;
      }
      else{
	this.posx = this.gameboard.getCursorPosX() + this.gameboard.getCursorSizeX();
      }
    }
    else{
      this.posy -= this.speed;
    }
  }

  /*Dessine un missile*/
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

  /*Teste si le missile est à la position de départ*/
  isAtStartingPos(){
    return this.posy == this.gameboard.getCursorPosY();
  }

  isOut(){
    return true; //Fait en sorte que le joueur perds même si il lui reste des 
    //missiles
  }

}
