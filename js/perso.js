class Perso {

HOLDING={
		EMPTY : 'empty',
		WOOD : 'wood',
		IRON : 'iron',
		EXTINGUISHER: 'extinguisher'
	};

ORIENTATION={
		RIGHT : 'right',
		LEFT : 'left',
		BACK : 'back'
	};
	pos = null;
	holdType=this.HOLDING.EMPTY;
	direction=this.ORIENTATION.RIGHT;



	constructor(x , y){
		this.pos = new Position(x,y);

	}

	get pos() {
		return this.pos;
	}

	get holdObject(){
		return this.holdObject;
	}

	get direction(){
		return this.direction;
	}


	goLeft(){
		this.pos.x-=1;
		this.direction=this.ORIENTATION.LEFT;
	}

	goRight(){
		this.pos.x+=1;
		this.direction=this.ORIENTATION.RIGHT;
	}

	goUp(){
		this.pos.y-=1;
		this.direction=this.ORIENTATION.BACK;
	}

	goDown(){
		this.pos.y+=1;
		this.direction=this.ORIENTATION.BACK;
	}

	takeObject(obj){
		if(this.holdType!=this.HOLDING.EMPTY){
			//faire quelque chose avec l'objet tenu
		}
		switch(obj.type){
			case "wood":
			//change sprite to wood holder
			this.holdType=this.HOLDING.WOOD;
			break;
			case "iron":
			//change sprite to iron holder
			this.holdType=this.HOLDING.IRON;
			break;
			case "extinguisher" :
			default:
			break;

		}
	}

	repair(anoma){

	}

}
