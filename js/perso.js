class Perso {

    ORIENTATION = {
        RIGHT: 'right',
        LEFT: 'left',
        BACK: 'back'
    };
    pos = null;
    pointRef = null;
    largeur = 70;
    hauteur = 110;
    holdType = material.EMPTY;
    direction = this.ORIENTATION.RIGHT;



    constructor(x, y) {
        this.pos = new Position(x, y);
        this.pointRef = new Position(0,0);

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
