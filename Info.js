class Info{


  constructor(gameboard){
  
    this.gameboard = gameboard;
    this.sizex = gameboard.sizex;
    this.sizey = gameboard.sizey/10;
    this.posx = gameboard.posx;
    this.posy = gameboard.posy - this.sizey;
    
    this.name = gameboard.name;
    this.score = gameboard.score;
    this.lives = gameboard.lives;

    this.context = gameboard.disp.getContext("2d");
    this.display();
    var info = this;
    document.addEventListener("click",function(e){info.clickHandler(e);});
  }

  display(){
    var ctx = this.context;
    ctx.beginPath();
    ctx.rect(this.posx,this.posy,this.sizex,this.sizey);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    this.drawScore(ctx);

    this.drawLives(ctx);

    this.drawBonusStatus(ctx);

        

    this.drawMusic(ctx);
  }

  newScore(n){
    this.score = n;
  }

  supprLives(){
    this.lives-=1;
  }

  drawMusic(ctx){
    ctx.beginPath();
    ctx.save();
    ctx.fillStyle="#FFFFFF";
    ctx.arc(this.posx + this.sizex*0.97,this.posy + this.sizey*0.6,
      this.sizex*0.004,0,2*Math.PI);
    ctx.fill();
    ctx.restore();
    ctx.closePath();
    ctx.beginPath();
    ctx.save()
    ctx.strokeStyle="#FFFFFF";
    ctx.lineWidth=this.sizex*0.0025;
    ctx.moveTo(this.posx + this.sizex*0.968 + this.sizex*0.005, this.posy + 
      this.sizey*0.6,0,2*Math.PI)
    ctx.lineTo(this.posx + this.sizex*0.977,this.posy+this.sizey*0.3);
    ctx.lineTo(this.posx+this.sizex*0.985,this.posy+this.sizey*0.4);
    ctx.stroke();
    ctx.restore()
    ctx.closePath();
    if(this.gameboard.getMusicStatus()==0){
      ctx.beginPath();
      ctx.save();
      ctx.strokeStyle="#FF0000";
      ctx.arc(this.posx + this.sizex*0.975,this.posy + this.sizey*0.5,
	this.sizex*0.015,0,2*Math.PI);
      ctx.lineWidth=this.sizex*0.003;
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.fillStyle="#FF0000";
      ctx.rect(this.posx + this.sizex*0.975 - this.sizex*0.015,this.posy + 
	this.sizey*0.5 - this.sizex*0.0025,this.sizex*0.030,this.sizex*0.005);
      ctx.fill();
      ctx.fillStyle="#000000";
      ctx.restore();
      ctx.closePath();
    }
  }
  
  drawScore(ctx){
    ctx.beginPath();
    var fontSize = this.sizey*0.8;
    ctx.fillStyle = "#FF00FF";
    ctx.textAlign = "left";
    ctx.font = fontSize + "px Courier";
    ctx.fillText(this.name,this.posx + this.sizex*0.05,this.posy + this.sizey*0.75 );

    ctx.textAlign = "right";
    ctx.fillText(this.score,this.posx + this.sizex*0.95,this.posy + this.sizey*0.75);
    ctx.closePath();
  }
  drawLives(ctx){
    if(this.lives==2){
      ctx.moveTo(this.posx + this.sizex*0.46, this.posy + this.sizey/2);
      ctx.bezierCurveTo(this.posx + this.sizex*0.46, this.posy + this.sizey*0.10 , this.posx + this.sizex*0.44 ,
	this.posy + this.sizey*0.10, this.posx + this.sizex*0.44, this.posy + this.sizey/2);
      ctx.bezierCurveTo(this.posx + this.sizex*0.44, this.posy + this.sizey*0.70, this.posx + this.sizex*0.45,
	this.posy + this.sizey*0.82,this.posx + this.sizex*0.46, this.posy + this.sizey*0.9);
      ctx.bezierCurveTo(this.posx + this.sizex*0.47, this.posy + this.sizey*0.82,this.posx + this.sizex*0.48,
	this.posy + this.sizey*0.70, this.posx + this.sizex*0.48, this.posy + this.sizey*0.5);
      ctx.bezierCurveTo(this.posx + this.sizex*0.48, this.posy + this.sizey*0.10, this.posx + this.sizex*0.46,
	this.posy + this.sizey*0.10, this.posx + this.sizex*0.46, this.posy + this.sizey/2);
      ctx.fill();
    }
    if(this.lives==3){
      ctx.moveTo(this.posx + this.sizex*0.46, this.posy + this.sizey/2);
      ctx.bezierCurveTo(this.posx + this.sizex*0.46, this.posy + this.sizey*0.10 , this.posx + this.sizex*0.44 ,
	this.posy + this.sizey*0.10, this.posx + this.sizex*0.44, this.posy + this.sizey/2);
      ctx.bezierCurveTo(this.posx + this.sizex*0.44, this.posy + this.sizey*0.70, this.posx + this.sizex*0.45,
	this.posy + this.sizey*0.82,this.posx + this.sizex*0.46, this.posy + this.sizey*0.9);
      ctx.bezierCurveTo(this.posx + this.sizex*0.47, this.posy + this.sizey*0.82,this.posx + this.sizex*0.48,
	this.posy + this.sizey*0.70, this.posx + this.sizex*0.48, this.posy + this.sizey*0.5);
      ctx.bezierCurveTo(this.posx + this.sizex*0.48, this.posy + this.sizey*0.10, this.posx + this.sizex*0.46,
	this.posy + this.sizey*0.10, this.posx + this.sizex*0.46, this.posy + this.sizey/2);
      ctx.fill();
      ctx.moveTo(this.posx + this.sizex*0.54, this.posy + this.sizey/2);
      ctx.bezierCurveTo(this.posx + this.sizex*0.54, this.posy + this.sizey*0.10 , this.posx + this.sizex*0.52 ,
	this.posy + this.sizey*0.10, this.posx + this.sizex*0.52, this.posy + this.sizey/2);
      ctx.bezierCurveTo(this.posx + this.sizex*0.52, this.posy + this.sizey*0.70, this.posx + this.sizex*0.53,
	this.posy + this.sizey*0.82,this.posx + this.sizex*0.54, this.posy + this.sizey*0.9);
      ctx.bezierCurveTo(this.posx + this.sizex*0.55, this.posy + this.sizey*0.82,this.posx + this.sizex*0.56,
	this.posy + this.sizey*0.70, this.posx + this.sizex*0.56, this.posy + this.sizey*0.5);
      ctx.bezierCurveTo(this.posx + this.sizex*0.56, this.posy + posy*0.10, this.posx + this.sizex*0.54,
	this.posy + this.sizey*0.10, this.posx + this.sizex*0.54, this.posy + this.sizey/2);
      ctx.fill();
      ctx.closePath();
    }
  }

  drawBonusStatus(ctx){
    ctx.beginPath();
    ctx.save();
    var fontSize = this.sizey*0.6;
    ctx.font = fontSize + "px Courier";
    ctx.textAlign = "left";
    if(this.gameboard.getCursorMissileStatus()){
      this.drawMissile(ctx,this.posx+this.sizex*0.6,this.posy + this.sizey*0.05,
      this.sizex*0.03,this.sizey*0.8);
      ctx.fillText(this.gameboard.getCursorMissileTime(),this.posx+this.sizex*0.6
	+ this.sizex*0.03,this.posy + this.sizey*0.75);
    }
    if(this.gameboard.getCursorEnlargeStatus()){
      this.drawEnlarge(ctx,this.posx+this.sizex*0.64 + fontSize,this.posy+
	this.sizey*0.05,this.sizex*0.06,this.sizey*0.8);
      ctx.fillText(this.gameboard.getCursorEnlargeTime(),this.posx+this.sizex*
	0.7 + fontSize,this.posy + this.sizey*0.75);
    }
    if(this.gameboard.getCursorStickyStatus()){
      this.drawSticky(ctx,this.posx+this.sizex*0.73 + fontSize,this.posy+
	this.sizey*0.05,this.sizex*0.03,this.posy + this.sizey*0.8);
      ctx.fillText(this.gameboard.getCursorStickyTime(),this.posx + this.sizex*
	0.77 + fontSize,this.posy + this.sizey*0.75);
    }
    ctx.restore();
    ctx.closePath();
  }


  clickHandler(e){
    var posx = this.posx + this.sizex*0.975 - this.sizex*0.015;
    var posy = this.posy + this.sizey*0.5 - this.sizex*0.015;
    var sizex = this.sizex*0.030;
    var sizey = sizex;
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    if(mouseX >= posx && mouseX <= posx + sizex && mouseY >=
      posy && mouseY <= posy + sizey)
      this.gameboard.toggleMusic();
  }

  drawMissile(ctx,posx,posy,sizex,sizey){
    ctx.beginPath();
    ctx.fillStyle="#FFFFFF";
    ctx.rect(posx+sizex/3,posy+sizey/4,sizex/3,
      sizey*3/4);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle="#FF0000";
    ctx.moveTo(posx+sizex/3,posy+sizey/4);
    ctx.bezierCurveTo(posx+sizex/3,posy,posx+sizex*2/3,
      posy,posx+sizex*2/3,posy+sizey/4);
    ctx.lineTo(posx+sizex/3,posy+sizey/4);
    ctx.fill();
    ctx.fillStyle="#FFFFFF";
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle="#BBBBBB";
    ctx.moveTo(posx+sizex/3,posy+sizey);
    ctx.lineTo(posx,posy+sizey);
    ctx.lineTo(posx+sizex/3,posy+sizey/2);
    ctx.moveTo(posx+sizex*2/3,posy+sizey);
    ctx.lineTo(posx+sizex,posy+sizey);
    ctx.lineTo(posx+sizex*2/3,posy+sizey/2);
    ctx.fill();
    ctx.fillStyle="#FFFFFF";
    ctx.closePath();
  }

  drawEnlarge(ctx,posx,posy,sizex,sizey){
    ctx.beginPath();
    ctx.fillStyle="#f0f71b"
    ctx.moveTo(posx+sizex/4,posy+sizey/4);
    ctx.lineTo(posx+(sizex*3)/4,posy+sizey/4);
    ctx.lineTo(posx+(sizex*3)/4,posy);
    ctx.lineTo(posx+sizex,posy+sizey/2);
    ctx.lineTo(posx+(sizex*3)/4,posy+sizey);
    ctx.lineTo(posx+(sizex*3)/4,posy+(sizey*3)/4);
    ctx.lineTo(posx+sizex/4,posy+(sizey*3)/4);
    ctx.lineTo(posx+sizex/4,posy+sizey);
    ctx.lineTo(posx,posy+sizey/2);
    ctx.lineTo(posx+sizex/4,posy);
    ctx.fill()
    ctx.fillStyle="#FFFFFF";
    ctx.closePath();
  }

  drawSticky(ctx,posx,posy,sizex,sizey){
    ctx.beginPath();
    ctx.fillStyle="#FF0000";
    ctx.moveTo(posx,posy+sizey/4);
    ctx.bezierCurveTo(posx,posy+sizey,posx+sizex,
      posy+sizey,posx+sizex,posy+sizey/4);
    ctx.lineTo(posx+(sizex*3)/4,posy+sizey/4);
    ctx.bezierCurveTo(posx+(sizex*3)/4,posy+(sizey*3)/4,
      posx+sizex/4,posy+(sizey*3)/4,posx+sizex/4,
      posy+sizey/4);
    ctx.lineTo(posx,posy+sizey/4);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle="#FFFFFF";
    ctx.rect(posx,posy,sizex/4,sizey/4);
    ctx.rect(posx+sizex,posy,-sizex/4,sizey/4);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle="#FFFFFF";
  }

}
