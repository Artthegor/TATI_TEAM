class Perso {

    ORIENTATION = {
        RIGHT: 'right',
        LEFT: 'left',
        BACK: 'back',
        FRONT: 'front'
    };

    pos = null;
    pointRef = null;
    largeur = 70;
    hauteur = 115;
    holdType = material.EMPTY;
    direction = this.ORIENTATION.FRONT;
    spritesPersoD = null;
    persoFront = null;



    constructor(x, y) {
        this.pos = new Position(x, y);
        this.pointRef = new Position(0,0);
        this.indexFrame = 0;
        this.cntTime = 0;
        
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
    			this.incrementTime(time, this.spritesPersoD.length);
    			return this.spritesPersoD[this.indexFrame];
    			break;
    		case "right":
    			this.incrementTime(time, this.spritesPersoD.length);
    			return this.spritesPersoD[this.indexFrame];
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
        this.pos.x -= 1;
        this.direction = this.ORIENTATION.LEFT;
    }

    goRight() {
        this.pos.x += 1;
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
        if (this.holdType != material.EMPTY) {
            //faire quelque chose avec l'objet tenu
        }
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
                break;
            case "stick" :
                //change sprite to stick holder
                this.holdType= material.STICK;
            default:
                break;

        }
    }

    repair(anoma) {

        if (this.holdType === anoma.type) {
			anoma.repaired();
        }

    }

}
