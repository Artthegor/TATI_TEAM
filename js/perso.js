class Perso {

    ORIENTATION = {
        RIGHT: 'right',
        LEFT: 'left',
        BACK: 'back',
        FRONT: 'front'
    };

    pos = null;
    pointRef = null;
    largeur = 85;
    hauteur = 120;
    holdType = material.EMPTY;
    direction = this.ORIENTATION.FRONT;
    spritesPersoD = null;
    persoFront = null;



    constructor(x, y, n) {
        this.pos = new Position(x, y);
        this.pointRef = new Position(0,0);
        this.indexFrame = 0;
        this.cntTime = 0;


        
        

        //perso1
        if(n==1){
	        //droite
	        this.spritesPersoD = new Array(8);
			this.spritesPersoD[0] = new Image();
			this.spritesPersoD[0].src = "images/persoD0.png";

			this.spritesPersoD[1] = new Image();
			this.spritesPersoD[1].src = "images/persoD1.png";

			this.spritesPersoD[2] = new Image();
			this.spritesPersoD[2].src = "images/persoD2.png";

			this.spritesPersoD[3] = new Image();
			this.spritesPersoD[3].src = "images/persoD3.png";

			this.spritesPersoD[4] = new Image();
			this.spritesPersoD[4].src = "images/persoD4.png";

			this.spritesPersoD[5] = new Image();
			this.spritesPersoD[5].src = "images/persoD5.png";

			this.spritesPersoD[6] = new Image();
			this.spritesPersoD[6].src = "images/persoD6.png";

			this.spritesPersoD[7] = new Image();
			this.spritesPersoD[7].src = "images/persoD7.png";

			//gauche
			this.spritesPersoG = new Array(8);
			this.spritesPersoG[0] = new Image();
			this.spritesPersoG[0].src = "images/persoG0.png";

			this.spritesPersoG[1] = new Image();
			this.spritesPersoG[1].src = "images/persoG1.png";

			this.spritesPersoG[2] = new Image();
			this.spritesPersoG[2].src = "images/persoG2.png";

			this.spritesPersoG[3] = new Image();
			this.spritesPersoG[3].src = "images/persoG3.png";

			this.spritesPersoG[4] = new Image();
			this.spritesPersoG[4].src = "images/persoG4.png";

			this.spritesPersoG[5] = new Image();
			this.spritesPersoG[5].src = "images/persoG5.png";

			this.spritesPersoG[6] = new Image();
			this.spritesPersoG[6].src = "images/persoG6.png";

			this.spritesPersoG[7] = new Image();
			this.spritesPersoG[7].src = "images/persoG7.png";

			//de face
			this.persoFront = new Image();
			this.persoFront.src = "images/persoFront.png";

			//de dos
			this.spritesPersoB = new Array(8);
			this.spritesPersoB[0] = new Image();
			this.spritesPersoB[0].src = "images/persoB0.png";

			this.spritesPersoB[1] = new Image();
			this.spritesPersoB[1].src = "images/persoB1.png";

			this.spritesPersoB[2] = new Image();
			this.spritesPersoB[2].src = "images/persoB0.png";

			this.spritesPersoB[3] = new Image();
			this.spritesPersoB[3].src = "images/persoB1.png";

			this.spritesPersoB[4] = new Image();
			this.spritesPersoB[4].src = "images/persoB0.png";

			this.spritesPersoB[5] = new Image();
			this.spritesPersoB[5].src = "images/persoB1.png";

			this.spritesPersoB[6] = new Image();
			this.spritesPersoB[6].src = "images/persoB0.png";

			this.spritesPersoB[7] = new Image();
			this.spritesPersoB[7].src = "images/persoB1.png";

			////////// STICK

			//gauche
			this.spritesPersoGBaton = new Array(8);
			this.spritesPersoGBaton[0] = new Image();
			this.spritesPersoGBaton[0].src = "images/persoGBaton0.png";

			this.spritesPersoGBaton[1] = new Image();
			this.spritesPersoGBaton[1].src = "images/persoGBaton1.png";

			this.spritesPersoGBaton[2] = new Image();
			this.spritesPersoGBaton[2].src = "images/persoGBaton2.png";

			this.spritesPersoGBaton[3] = new Image();
			this.spritesPersoGBaton[3].src = "images/persoGBaton3.png";

			this.spritesPersoGBaton[4] = new Image();
			this.spritesPersoGBaton[4].src = "images/persoGBaton4.png";

			this.spritesPersoGBaton[5] = new Image();
			this.spritesPersoGBaton[5].src = "images/persoGBaton5.png";

			this.spritesPersoGBaton[6] = new Image();
			this.spritesPersoGBaton[6].src = "images/persoGBaton6.png";

			this.spritesPersoGBaton[7] = new Image();
			this.spritesPersoGBaton[7].src = "images/persoGBaton7.png";

			//droite
			this.spritesPersoDBaton = new Array(8);
			this.spritesPersoDBaton[0] = new Image();
			this.spritesPersoDBaton[0].src = "images/persoDBaton0.png";

			this.spritesPersoDBaton[1] = new Image();
			this.spritesPersoDBaton[1].src = "images/persoDBaton1.png";

			this.spritesPersoDBaton[2] = new Image();
			this.spritesPersoDBaton[2].src = "images/persoDBaton2.png";

			this.spritesPersoDBaton[3] = new Image();
			this.spritesPersoDBaton[3].src = "images/persoDBaton3.png";

			this.spritesPersoDBaton[4] = new Image();
			this.spritesPersoDBaton[4].src = "images/persoDBaton4.png";

			this.spritesPersoDBaton[5] = new Image();
			this.spritesPersoDBaton[5].src = "images/persoDBaton5.png";

			this.spritesPersoDBaton[6] = new Image();
			this.spritesPersoDBaton[6].src = "images/persoDBaton6.png";

			this.spritesPersoDBaton[7] = new Image();
			this.spritesPersoDBaton[7].src = "images/persoDBaton7.png";

			////////// PLANCHE

			//gauche
			this.spritesPersoGPlanche = new Array(8);
			this.spritesPersoGPlanche[0] = new Image();
			this.spritesPersoGPlanche[0].src = "images/persoGPlanche0.png";

			this.spritesPersoGPlanche[1] = new Image();
			this.spritesPersoGPlanche[1].src = "images/persoGPlanche1.png";

			this.spritesPersoGPlanche[2] = new Image();
			this.spritesPersoGPlanche[2].src = "images/persoGPlanche2.png";

			this.spritesPersoGPlanche[3] = new Image();
			this.spritesPersoGPlanche[3].src = "images/persoGPlanche3.png";

			this.spritesPersoGPlanche[4] = new Image();
			this.spritesPersoGPlanche[4].src = "images/persoGPlanche4.png";

			this.spritesPersoGPlanche[5] = new Image();
			this.spritesPersoGPlanche[5].src = "images/persoGPlanche5.png";

			this.spritesPersoGPlanche[6] = new Image();
			this.spritesPersoGPlanche[6].src = "images/persoGPlanche6.png";

			this.spritesPersoGPlanche[7] = new Image();
			this.spritesPersoGPlanche[7].src = "images/persoGPlanche7.png";

			//droite
			this.spritesPersoDPlanche = new Array(8);
			this.spritesPersoDPlanche[0] = new Image();
			this.spritesPersoDPlanche[0].src = "images/persoDPlanche0.png";

			this.spritesPersoDPlanche[1] = new Image();
			this.spritesPersoDPlanche[1].src = "images/persoDPlanche1.png";

			this.spritesPersoDPlanche[2] = new Image();
			this.spritesPersoDPlanche[2].src = "images/persoDPlanche2.png";

			this.spritesPersoDPlanche[3] = new Image();
			this.spritesPersoDPlanche[3].src = "images/persoDPlanche3.png";

			this.spritesPersoDPlanche[4] = new Image();
			this.spritesPersoDPlanche[4].src = "images/persoDPlanche4.png";

			this.spritesPersoDPlanche[5] = new Image();
			this.spritesPersoDPlanche[5].src = "images/persoDPlanche5.png";

			this.spritesPersoDPlanche[6] = new Image();
			this.spritesPersoDPlanche[6].src = "images/persoDPlanche6.png";

			this.spritesPersoDPlanche[7] = new Image();
			this.spritesPersoDPlanche[7].src = "images/persoDPlanche7.png";

			////////// METAL

			//gauche
			this.spritesPersoGMetal = new Array(8);
			this.spritesPersoGMetal[0] = new Image();
			this.spritesPersoGMetal[0].src = "images/persoGMetal0.png";

			this.spritesPersoGMetal[1] = new Image();
			this.spritesPersoGMetal[1].src = "images/persoGMetal1.png";

			this.spritesPersoGMetal[2] = new Image();
			this.spritesPersoGMetal[2].src = "images/persoGMetal2.png";

			this.spritesPersoGMetal[3] = new Image();
			this.spritesPersoGMetal[3].src = "images/persoGMetal3.png";

			this.spritesPersoGMetal[4] = new Image();
			this.spritesPersoGMetal[4].src = "images/persoGMetal4.png";

			this.spritesPersoGMetal[5] = new Image();
			this.spritesPersoGMetal[5].src = "images/persoGMetal5.png";

			this.spritesPersoGMetal[6] = new Image();
			this.spritesPersoGMetal[6].src = "images/persoGMetal6.png";

			this.spritesPersoGMetal[7] = new Image();
			this.spritesPersoGMetal[7].src = "images/persoGMetal7.png";

			//droite
			this.spritesPersoDMetal = new Array(8);
			this.spritesPersoDMetal[0] = new Image();
			this.spritesPersoDMetal[0].src = "images/persoDMetal0.png";

			this.spritesPersoDMetal[1] = new Image();
			this.spritesPersoDMetal[1].src = "images/persoDMetal1.png";

			this.spritesPersoDMetal[2] = new Image();
			this.spritesPersoDMetal[2].src = "images/persoDMetal2.png";

			this.spritesPersoDMetal[3] = new Image();
			this.spritesPersoDMetal[3].src = "images/persoDMetal3.png";

			this.spritesPersoDMetal[4] = new Image();
			this.spritesPersoDMetal[4].src = "images/persoDMetal4.png";

			this.spritesPersoDMetal[5] = new Image();
			this.spritesPersoDMetal[5].src = "images/persoDMetal5.png";

			this.spritesPersoDMetal[6] = new Image();
			this.spritesPersoDMetal[6].src = "images/persoDMetal6.png";

			this.spritesPersoDMetal[7] = new Image();
			this.spritesPersoDMetal[7].src = "images/persoDMetal7.png";





		}else{
			//droite
        this.spritesPersoD = new Array(8);
		this.spritesPersoD[0] = new Image();
		this.spritesPersoD[0].src = "images/persoBD0.png";

		this.spritesPersoD[1] = new Image();
		this.spritesPersoD[1].src = "images/persoBD1.png";

		this.spritesPersoD[2] = new Image();
		this.spritesPersoD[2].src = "images/persoBD2.png";

		this.spritesPersoD[3] = new Image();
		this.spritesPersoD[3].src = "images/persoBD3.png";

		this.spritesPersoD[4] = new Image();
		this.spritesPersoD[4].src = "images/persoBD4.png";

		this.spritesPersoD[5] = new Image();
		this.spritesPersoD[5].src = "images/persoBD5.png";

		this.spritesPersoD[6] = new Image();
		this.spritesPersoD[6].src = "images/persoBD6.png";

		this.spritesPersoD[7] = new Image();
		this.spritesPersoD[7].src = "images/persoBD7.png";

		//gauche
		this.spritesPersoG = new Array(8);
		this.spritesPersoG[0] = new Image();
		this.spritesPersoG[0].src = "images/persoBG0.png";

		this.spritesPersoG[1] = new Image();
		this.spritesPersoG[1].src = "images/persoBG1.png";

		this.spritesPersoG[2] = new Image();
		this.spritesPersoG[2].src = "images/persoBG2.png";

		this.spritesPersoG[3] = new Image();
		this.spritesPersoG[3].src = "images/persoBG3.png";

		this.spritesPersoG[4] = new Image();
		this.spritesPersoG[4].src = "images/persoBG4.png";

		this.spritesPersoG[5] = new Image();
		this.spritesPersoG[5].src = "images/persoBG5.png";

		this.spritesPersoG[6] = new Image();
		this.spritesPersoG[6].src = "images/persoBG6.png";

		this.spritesPersoG[7] = new Image();
		this.spritesPersoG[7].src = "images/persoBG7.png";

		//de face
		this.persoFront = new Image();
		this.persoFront.src = "images/persoBFront.png";

		//de dos
		this.spritesPersoB = new Array(8);
		this.spritesPersoB[0] = new Image();
		this.spritesPersoB[0].src = "images/persoBB0.png";

		this.spritesPersoB[1] = new Image();
		this.spritesPersoB[1].src = "images/persoBB1.png";

		this.spritesPersoB[2] = new Image();
		this.spritesPersoB[2].src = "images/persoBB0.png";

		this.spritesPersoB[3] = new Image();
		this.spritesPersoB[3].src = "images/persoBB1.png";

		this.spritesPersoB[4] = new Image();
		this.spritesPersoB[4].src = "images/persoBB0.png";

		this.spritesPersoB[5] = new Image();
		this.spritesPersoB[5].src = "images/persoBB1.png";

		this.spritesPersoB[6] = new Image();
		this.spritesPersoB[6].src = "images/persoBB0.png";

		this.spritesPersoB[7] = new Image();
		this.spritesPersoB[7].src = "images/persoBB1.png";

		//objet

		////////// STICK

			//gauche
			this.spritesPersoGBaton = new Array(8);
			this.spritesPersoGBaton[0] = new Image();
			this.spritesPersoGBaton[0].src = "images/persoBGBaton0.png";

			this.spritesPersoGBaton[1] = new Image();
			this.spritesPersoGBaton[1].src = "images/persoBGBaton1.png";

			this.spritesPersoGBaton[2] = new Image();
			this.spritesPersoGBaton[2].src = "images/persoBGBaton2.png";

			this.spritesPersoGBaton[3] = new Image();
			this.spritesPersoGBaton[3].src = "images/persoBGBaton3.png";

			this.spritesPersoGBaton[4] = new Image();
			this.spritesPersoGBaton[4].src = "images/persoBGBaton4.png";

			this.spritesPersoGBaton[5] = new Image();
			this.spritesPersoGBaton[5].src = "images/persoBGBaton5.png";

			this.spritesPersoGBaton[6] = new Image();
			this.spritesPersoGBaton[6].src = "images/persoBGBaton6.png";

			this.spritesPersoGBaton[7] = new Image();
			this.spritesPersoGBaton[7].src = "images/persoBGBaton7.png";

			//droite
			this.spritesPersoDBaton = new Array(8);
			this.spritesPersoDBaton[0] = new Image();
			this.spritesPersoDBaton[0].src = "images/persoBDBaton0.png";

			this.spritesPersoDBaton[1] = new Image();
			this.spritesPersoDBaton[1].src = "images/persoBDBaton1.png";

			this.spritesPersoDBaton[2] = new Image();
			this.spritesPersoDBaton[2].src = "images/persoBDBaton2.png";

			this.spritesPersoDBaton[3] = new Image();
			this.spritesPersoDBaton[3].src = "images/persoBDBaton3.png";

			this.spritesPersoDBaton[4] = new Image();
			this.spritesPersoDBaton[4].src = "images/persoBDBaton4.png";

			this.spritesPersoDBaton[5] = new Image();
			this.spritesPersoDBaton[5].src = "images/persoBDBaton5.png";

			this.spritesPersoDBaton[6] = new Image();
			this.spritesPersoDBaton[6].src = "images/persoBDBaton6.png";

			this.spritesPersoDBaton[7] = new Image();
			this.spritesPersoDBaton[7].src = "images/persoBDBaton7.png";

			////////// PLANCHE

			//gauche
			this.spritesPersoGPlanche = new Array(8);
			this.spritesPersoGPlanche[0] = new Image();
			this.spritesPersoGPlanche[0].src = "images/persoBGPlanche0.png";

			this.spritesPersoGPlanche[1] = new Image();
			this.spritesPersoGPlanche[1].src = "images/persoBGPlanche1.png";

			this.spritesPersoGPlanche[2] = new Image();
			this.spritesPersoGPlanche[2].src = "images/persoBGPlanche2.png";

			this.spritesPersoGPlanche[3] = new Image();
			this.spritesPersoGPlanche[3].src = "images/persoBGPlanche3.png";

			this.spritesPersoGPlanche[4] = new Image();
			this.spritesPersoGPlanche[4].src = "images/persoBGPlanche4.png";

			this.spritesPersoGPlanche[5] = new Image();
			this.spritesPersoGPlanche[5].src = "images/persoBGPlanche5.png";

			this.spritesPersoGPlanche[6] = new Image();
			this.spritesPersoGPlanche[6].src = "images/persoBGPlanche6.png";

			this.spritesPersoGPlanche[7] = new Image();
			this.spritesPersoGPlanche[7].src = "images/persoBGPlanche7.png";

			//droite
			this.spritesPersoDPlanche = new Array(8);
			this.spritesPersoDPlanche[0] = new Image();
			this.spritesPersoDPlanche[0].src = "images/persoBDPlanche0.png";

			this.spritesPersoDPlanche[1] = new Image();
			this.spritesPersoDPlanche[1].src = "images/persoBDPlanche1.png";

			this.spritesPersoDPlanche[2] = new Image();
			this.spritesPersoDPlanche[2].src = "images/persoBDPlanche2.png";

			this.spritesPersoDPlanche[3] = new Image();
			this.spritesPersoDPlanche[3].src = "images/persoBDPlanche3.png";

			this.spritesPersoDPlanche[4] = new Image();
			this.spritesPersoDPlanche[4].src = "images/persoBDPlanche4.png";

			this.spritesPersoDPlanche[5] = new Image();
			this.spritesPersoDPlanche[5].src = "images/persoBDPlanche5.png";

			this.spritesPersoDPlanche[6] = new Image();
			this.spritesPersoDPlanche[6].src = "images/persoBDPlanche6.png";

			this.spritesPersoDPlanche[7] = new Image();
			this.spritesPersoDPlanche[7].src = "images/persoBDPlanche7.png";

			////////// METAL

			//gauche
			this.spritesPersoGMetal = new Array(8);
			this.spritesPersoGMetal[0] = new Image();
			this.spritesPersoGMetal[0].src = "images/persoBGMetal0.png";

			this.spritesPersoGMetal[1] = new Image();
			this.spritesPersoGMetal[1].src = "images/persoBGMetal1.png";

			this.spritesPersoGMetal[2] = new Image();
			this.spritesPersoGMetal[2].src = "images/persoBGMetal2.png";

			this.spritesPersoGMetal[3] = new Image();
			this.spritesPersoGMetal[3].src = "images/persoBGMetal3.png";

			this.spritesPersoGMetal[4] = new Image();
			this.spritesPersoGMetal[4].src = "images/persoBGMetal4.png";

			this.spritesPersoGMetal[5] = new Image();
			this.spritesPersoGMetal[5].src = "images/persoBGMetal5.png";

			this.spritesPersoGMetal[6] = new Image();
			this.spritesPersoGMetal[6].src = "images/persoBGMetal6.png";

			this.spritesPersoGMetal[7] = new Image();
			this.spritesPersoGMetal[7].src = "images/persoBGMetal7.png";

			//droite
			this.spritesPersoDMetal = new Array(8);
			this.spritesPersoDMetal[0] = new Image();
			this.spritesPersoDMetal[0].src = "images/persoBDMetal0.png";

			this.spritesPersoDMetal[1] = new Image();
			this.spritesPersoDMetal[1].src = "images/persoBDMetal1.png";

			this.spritesPersoDMetal[2] = new Image();
			this.spritesPersoDMetal[2].src = "images/persoBDMetal2.png";

			this.spritesPersoDMetal[3] = new Image();
			this.spritesPersoDMetal[3].src = "images/persoBDMetal3.png";

			this.spritesPersoDMetal[4] = new Image();
			this.spritesPersoDMetal[4].src = "images/persoBDMetal4.png";

			this.spritesPersoDMetal[5] = new Image();
			this.spritesPersoDMetal[5].src = "images/persoBDMetal5.png";

			this.spritesPersoDMetal[6] = new Image();
			this.spritesPersoDMetal[6].src = "images/persoBDMetal6.png";

			this.spritesPersoDMetal[7] = new Image();
			this.spritesPersoDMetal[7].src = "images/persoBDMetal7.png";

		}


    }

	incrementTime (time, nbFrame) {
    	this.cntTime += time;
    	if (this.cntTime > 350){
    		this.cntTime = 0;
    		this.indexFrame++;
    		if(this.indexFrame>=nbFrame){
    			this.indexFrame = 0;
    		}
    	}
    }
    
    getSprite (time) {

    	switch (this.direction){
    		case "front":
    			return this.persoFront;
    			break;
    		case "left":
    			this.incrementTime(time, this.spritesPersoG.length);
    			switch(this.holdType){
    				case 'stick':
    					return this.spritesPersoGBaton[this.indexFrame];
    				break;
    				case 'wood':
    					return this.spritesPersoGPlanche[this.indexFrame];
    				break;
    				case 'iron':
    					return this.spritesPersoGMetal[this.indexFrame];
    				break;
    				default:
    				return this.spritesPersoG[this.indexFrame];
    			}		
    			
    			break;
    		case "right":
    			this.incrementTime(time, this.spritesPersoD.length);
    			switch(this.holdType){
    				case 'stick':
    					return this.spritesPersoDBaton[this.indexFrame];
    				break;
    				case 'wood':
    					return this.spritesPersoDPlanche[this.indexFrame];
    				break;
    				case 'iron':
    					return this.spritesPersoDMetal[this.indexFrame];
    				break;
    				default:
    				return this.spritesPersoD[this.indexFrame];
    			}
    			
    			break;
    		case "back":
    			this.incrementTime(time,this.spritesPersoB.length);
    			return this.spritesPersoB[this.indexFrame];
    			break;
    	}
    }

    


    get pos() {
        return this.pos;
    }

    get holdObject() {
        return this.holdObject;
    }

    get direction() {
        return this.direction;
    }

    get pointRef(){
    	return this.pointRef;
    }

    get largeur(){
    	return this.largeur;
    }

    get hauteur(){
    	return this.hauteur;
    }

    updatePointRef(){
    	this.pointRef.x = this.pos.x+(this.largeur/2);
    	this.pointRef.y = this.pos.y+this.hauteur;
    }

    stoped(){
    	this.direction = this.ORIENTATION.FRONT;
    }

    goLeft() {
        this.pos.x -= 1.5;
        this.direction = this.ORIENTATION.LEFT;
    }

    goRight() {
        this.pos.x += 1.5;
        this.direction = this.ORIENTATION.RIGHT;
    }

    goUp() {
    	this.onALadder=true;
        this.pos.y -= 1;
        this.direction = this.ORIENTATION.BACK;
    }

    goDown() {
    	this.onALadder=true;
        this.pos.y += 1;
        this.direction = this.ORIENTATION.BACK;
    }

    takeObject(obj) {

        switch (obj.type) {
            case "wood":
                //change sprite to wood holder
                this.holdType = material.WOOD;
                break;
            case "iron":
                //change sprite to iron holder
                this.holdType = material.IRON;
                break;
            case "extinguisher" :
                //change sprite to extinguisher holder
				this.holdType=material.EXTINGUISHER;
                break;
            case "stick" :
                //change sprite to stick holder
                this.holdType= material.STICK;
            default:
                break;

        }
    }

    repair(anoma) {
        if (this.holdType === anoma.idMaterialRepair) {
            console.log("repare");
			anoma.repaired();
			if (!this.holdType=== material.EXTINGUISHER)
			this.holdType = material.EMPTY;
        }
    }

}
