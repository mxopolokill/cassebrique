//////////////////////////////////////////////////
///création constante temps bonus/////////////////
const STICKY_TIME = 500; //délais sticky bonus ///
const ENLARGE_TIME = 500; //délais enlarge bonus///
const MISSILE_TIME = 500;  //délais MISSILE bonus///
/////////////////////////////////////////////////
////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
class Bonus{                                                     ////////
  constructor(type,posx,posy,gameboard,size){                     //////
    this.type = type;                                             /////
    this.posy = posy;                                             ////
    /////////////////////////////////////////////////////////////////
    this.gameboard = gameboard                                  ///
    this.sizey = size //Le diamètre du bonus est égal à         ///
    //La taille verticale d'une brique/////////////////////////////
    this.speed = 3; //Constante de vitesse                     ///
    this.display();                                           ////
  // Temps de chaque bonus //////////////////////////////////////
  //fonction temps bonnus Collant/////////////////////////////////
    if(this.type == "sticky"){                                 ///
      this.sizex = size;                                      ///
      this.time = STICKY_TIME;                               ///
    }//////////////////////////////////////////////////////////
     //fonction temps bonnus doublement///////////////////////
    if(this.type == "enlarge"){                           ///
      this.sizex = size*2;                               ///
      this.time = ENLARGE_TIME;                         ///
    }/////////////////////////////////////////////////////
     //fonction temps bonnus missile/////////////////////
    if(this.type == "missile"){                      ///
      this.sizex = size;                            ///
      this.time = MISSILE_TIME;                    ///
    }////////////////////////////////////////////////
     //fonction temps bonnus pellet/////////////////
    if(this.type == "pellet"){                  ///
      this.sizex = size;                       ///
    }/////////////////////////////////////////////
    this.posx = posx-this.sizex/2;            ///
  }//////////////////////////////////////////////
  //////////////////////////////////////////////
 
 
 
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  //Affiche le bonus/////////////////////////////////////////////////////////////////////////
  display(){                                                                             ///
    if(this.speed != -1){ //On dit qu'un bonus sorti du jeu a une vitesse de -1         ///
      this.updatePos();                                                                ///
      var ctx = this.gameboard.disp.getContext("2d");//création d'un context variable  ///
      if(this.type == "sticky"){//si bonus collant                                     ///
	this.drawSticky(ctx);//dessinner sticky                                              ///
      }///////////////////////////////////////////////////////////////////////////////////
      else if(this.type == "enlarge"){//alors si bonus enlarge                        ///
	this.drawEnlarge(ctx);//dessiner Enlarge                                            ///
      }/////////////////////////////////////////////////////////////////////////////////
      else if(this.type == "missile"){//alors si bonus missile                       ///
	this.drawMissile(ctx);//dessiner Missile                                           ///
      }///////////////////////////////////////////////////////////////////////////////
      else if(this.type == "pellet"){//alors si bonus pellet                        ///
	this.drawPellets(ctx);//dessiner pellet                                           ///
      }///////////////////////////////////////////////////////////////////////////////
    }////////////////////////////////////////////////////////////////////////////////
  }//////////////////////////////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  //Met à jour la position du bonus////////////////////////////
  /////////////////////////////////////////////////////////////
  updatePos(){                                             ///
      if(this.gameboard.cursor.isHit(this)){              ///
      this.gameboard.cursor.setBonus(this, this.time);    ///
      this.speed = -1;                                    ///
      return;                                             ///
    }////////////////////////////////////////////////////////
    if(this.gameboard.touchesSide(this)==3){              ///
      this.speed=-1;                                      ///
    }///////////////////////////////////////////////////////
    this.posy = this.posy + this.speed;                 ////
  }/////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////






  ///////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  /////////////ajout dessin bonus Enlarge//////////////////////////////
  ////////////////////////////////////////////////////////////////////
  drawEnlarge(ctx){                                                 ////
    ctx.beginPath();//ouverture chemin                             ///
    ctx.fillStyle="#f0f71b";//choix couleur de remplissage        ///////////////////////////////
    ctx.moveTo(this.posx+this.sizex/4,this.posy+this.sizey/4); ////déplacement chemin        ///
    ctx.lineTo(this.posx+(this.sizex*3)/4,this.posy+this.sizey/4);///// connexion du chemin  ///
    ctx.lineTo(this.posx+(this.sizex*3)/4,this.posy);//// connexion du chemin                ///
    ctx.lineTo(this.posx+this.sizex,this.posy+this.sizey/2);///// connexion du chemin        ///
    ctx.lineTo(this.posx+(this.sizex*3)/4,this.posy+this.sizey);// connexion du chemin       ///
    ctx.lineTo(this.posx+(this.sizex*3)/4,this.posy+(this.sizey*3)/4);// connexion du chemin ///
    ctx.lineTo(this.posx+this.sizex/4,this.posy+(this.sizey*3)/4);// connexion du chemin     ///
    ctx.lineTo(this.posx+this.sizex/4,this.posy+this.sizey);// connexion du chemin           ///
    ctx.lineTo(this.posx,this.posy+this.sizey/2);// connexion du chemin                      ///
    ctx.lineTo(this.posx+this.sizex/4,this.posy);// connexion du chemin                      ///
    ctx.fill();                                                                              ///
    ctx.fillStyle="#FFFFFF";                                                                 ///
    ctx.closePath();                                                                         ///
  }/////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////





  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////ajout dessin bonus sticky/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  drawSticky(ctx){                                                                                                                                                                   ///
    ctx.beginPath();//ouverture chemin                                                                                                                                               ///
    ctx.fillStyle="#FF0000";// choix couleur de remplissage                                                                                                                          ///
    ctx.moveTo(this.posx,this.posy+this.sizey/4);///déplacement chemin                                                                                                               ///
    ctx.bezierCurveTo(this.posx,this.posy+this.sizey,this.posx+this.sizex,this.posy+this.sizey,this.posx+this.sizex,this.posy+this.sizey/4); // ajout de courbe de bezier            //////////////////////////
    ctx.lineTo(this.posx+(this.sizex*3)/4,this.posy+this.sizey/4);// connexion du chemin                                                                                                    //////////////////
    ctx.bezierCurveTo(this.posx+(this.sizex*3)/4,this.posy+(this.sizey*3)/4,this.posx+this.sizex/4,this.posy+(this.sizey*3)/4,this.posx+this.sizex/4,this.posy+this.sizey/4);// ajout de courbe de bezier  ///
    ctx.lineTo(this.posx,this.posy+this.sizey/4);// connexion du chemin                                                                                                                     /////////////////
    ctx.fill();                                                                                                                                                                      ////////////////////////
    ctx.closePath();//fermeture chemin                                                                                                                                           ////
    ctx.beginPath();//Ouverture chemin                                                                                                                                        ////
    ctx.fillStyle="#FFFFFF";//Choix remplissage couleur                                                                                                                   ////
    ctx.rect(this.posx,this.posy,this.sizex/4,this.sizey/4);// ajout d'un bloc                                                                                         ////
    ctx.rect(this.posx+this.sizex,this.posy,-this.sizex/4,this.sizey/4); // ajout d'un bloc                                                                         ////
    ctx.fill();//remplissage                                                                                                                                     ////
    ctx.closePath();//fermeture chemin                                                                                                                        ////
    ctx.fillStyle="#FFFFFF";//choix couleur de remplissage                                                                                                  ////
  }//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  
  
  ///////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////
  /////////////ajout dessin bonus Pellets//////////////////////////////
  ////////////////////////////////////////////////////////////////////
  drawPellets(ctx){                                               ///
    ctx.beginPath();//ouverture chemin                           ///
    ctx.textAlign = "left";//alignement du text a gauche        ///
    ctx.fillText("+2",this.posx,this.posy);//ajout text        ///
    ctx.stroke();//dessine chemin                             ///
    ctx.closePath();//fermeture Chemin                     /////
  }////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////






  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////ajout dessin bonus Missile////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  drawMissile(ctx){                                                                                                   ///////
    ctx.beginPath();//ouverture chemin                                                                                ///////
    ctx.fillStyle="#FFFFFF";//remplissage couleur                                                                     ///////
    ctx.rect(this.posx+this.sizex/3,this.posy+this.sizey/4,this.sizex/3,                                              ///////
      this.sizey*3/4);// ajout bloc                                                                                       ///
    ctx.fill();// remplissage                                                                                             ///
    ctx.closePath();//fermeture                                                                                           ///
    ctx.beginPath();//ouverture                                                                                           ///
    ctx.fillStyle="#FF0000";//remplissage  via couleur                                                                    ///
    ctx.moveTo(this.posx+this.sizex/3,this.posy+this.sizey/4);//déplacement                                               ///
    ctx.bezierCurveTo(this.posx+this.sizex/3,this.posy,this.posx+this.sizex*2/3,                                          ///
      this.posy,this.posx+this.sizex*2/3,this.posy+this.sizey/4);//création d'une curver de bezier                        ///
    ctx.lineTo(this.posx+this.sizex/3,this.posy+this.sizey/4);//connexion avec dernier chemin                             /// 
    ctx.fill();//remplissage                                                                                              ///
    ctx.fillStyle="#FFFFFF";//couleur remplissage                                                                         ///
    ctx.closePath();//fermeture chemin                                                                                    ///
    ctx.beginPath();//ouverture                                                                                           ///
    ctx.fillStyle="#BBBBBB";//couleur remplissage                                                                         ///
    ctx.moveTo(this.posx+this.sizex/3,this.posy+this.sizey);//déplacement                                                 ///
    ctx.lineTo(this.posx,this.posy+this.sizey);//connexion avec dernier chemin                                            ///
    ctx.lineTo(this.posx+this.sizex/3,this.posy+this.sizey/2);//connexion avec dernier chemin                             ///
    ctx.moveTo(this.posx+this.sizex*2/3,this.posy+this.sizey);//déplacement                                               ///
    ctx.lineTo(this.posx+this.sizex,this.posy+this.sizey);//connexion avec dernier chemin                                 ///
    ctx.lineTo(this.posx+this.sizex*2/3,this.posy+this.sizey/2);//connexion avec dernier chemin                           ///
    ctx.fill();// remplissage chemin                                                                                      ///
    ctx.fillStyle="#FFFFFF"; //couleur de remplissage                                                                     ///
    ctx.closePath();// fermeture chemin                                                                                   ///
  }//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
