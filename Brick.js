class Brick{
  constructor(lives, color,posx, posy, gameboard, taillex,tailley){
    this.lives = lives; //Nombre de vies de la brique
    this.color = color; //Couleur de la brique (string)
    /*-----------------------------------*/
    this.gameboard = gameboard; //Pateau de jeu
    this.sizex = taillex; 
    this.sizey = tailley;
    /*-----------------------------------*/
    this.posx = posx; //Position en X
    this.posy = posy; //Position en Y
    /*-----------------------------------*/
    this.display();
  }
  /*Affichage de la brique */
  display(){
    if(this.lives != 0){
      var newcolor = "#";
      var x;
      for(var i=1;i<7;i++){
        x = parseInt(this.color[i],16)
        x += 2;
        if(x>15)
          x = 15;
        newcolor += x.toString(16);
      }
      var ctx = this.gameboard.disp.getContext("2d");
      ctx.beginPath();
      ctx.fillStyle = newcolor;
      ctx.fillRect(this.posx, this.posy, this.sizex, this.sizey);
      ctx.stroke();
      ctx.closePath();
      ctx = this.gameboard.disp.getContext("2d");
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.posx + this.sizex/10, this.posy + this.sizey/10,this.sizex/10*8,this.sizey/10*8);
      ctx.stroke();
      ctx.closePath();
    }
  }

  /* Renvoie un entier indiquant si la balle p touche la brique (1 = bord 
   * supérieur ou inférieur, 2 = bord gauche ou droit*/
  isHit(p){
    if(this.lives!=0){
      if(((((p.posy - p.size <= this.posy + this.sizey) && (p.posy + p.size >= this.posy)) 
	&& ((p.posx >= this.posx) && (p.posx <= this.posx + this.sizex))))){
	this.getHit(p);
	return 1;
      }
	else if((p.posy<=this.posy + this.sizey && p.posy >= this.posy) && ((p.posx-p.size <= this.posx + this.sizex)
	  && p.posx + p.size>= this.posx)){
	this.getHit(p);
	  return 2;
	}
    }
    return 0;
  }

  /* Réduction du nombre de vies lorsque la brique est touchée*/
  getHit(p){
    this.lives = this.lives - 1;
    var newcolor = "#";
    if(this.lives>-1){

      //Changement de couleur, blanchissement
      for(var i=1;i<7;i++){
        if(parseInt(this.color[i],16)>11)
          newcolor += "F";
        else
          newcolor += (parseInt(this.color[i],16)+3).toString(16);
      }
      this.color = newcolor;

      this.gameboard.score += p.scoreMult*10;
      p.scoreMult++;
      this.gameboard.info.newScore(this.gameboard.score);
      if(Math.random()<0.1){ //Chance de drop un bonus
        var type = Math.random(); //Le bonus est choisi aléatoirement
        if(type <0.25){
	  this.gameboard.addBonus(new Bonus("sticky",this.posx + this.sizex/2,
	    this.posy + this.sizey/2,this.gameboard, this.sizey));
        }
        else if(type < 0.50){
	  this.gameboard.addBonus(new Bonus("enlarge",this.posx + this.sizex/2,
	    this.posy + this.sizey/2,this.gameboard, this.sizey));
        }
        else if(type < 0.75){

	  this.gameboard.addBonus(new Bonus("missile",this.posx + this.sizex/2, 
	    this.posy + this.sizey/2,this.gameboard, this.sizey));
        }
        else{
	  this.gameboard.addBonus(new Bonus("pellet",this.posx + this.sizex/2,
	    this.posy + this.sizey/2, this.gameboard,this.sizey));
        }
      }
    }
    this.gameboard.addSound("Music/brique.wav")  //Son à Changer
  }

  /*Teste si la brique est morte*/
  isDead(){
    return this.lives < 1;
  }
}

