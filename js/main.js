//Var
var ctx = null;
var inGame = true;
var old_date = Date.now();
var perso;
var fleche = {haut: false, bas: false, gauche: false, droite:false};
var anomaly;

document.addEventListener("DOMContentLoaded", function(){

	//init du jeu
	function init(){
		ctx = document.getElementById("zoneJeu").getContext("2d");
    	ctx.width = document.getElementById("zoneJeu").width;
    	ctx.height = document.getElementById("zoneJeu").height;

    	document.addEventListener("keydown", captureAppuiToucheClavier);
    	document.addEventListener("keyup", captureRelacheToucheClavier);


		console.log('tamere');
		anomaly = [   new Anomaly(new Position(0,1),material.EXTINGUISHER,type.BARREL_FIRE),
			new Anomaly(new Position(50,50),material.IRON,type.PIPE),
			new Anomaly(new Position(75,25),material.WOOD,type.LEAK)];
		perso = new Perso(50, 50);
		gameLoop();

	}

	function isPositionValide(axe,value){
		switch(axe){
			case "x":
				return (value>0 && value<ctx.width-25);
				break;
			case "y":
				return (value>0 && value<ctx.height-50);
				break;
			default:
				break;
		}

	}


	gameLoop = function(){

		if(inGame) {
        	update(Date.now());   
    	}
    	render();
		requestAnimationFrame(gameLoop);
			
	};

	randomlyCreateAnomaly = function(){
		if(Math.random()<0.1){
			var tabanomalys =this.anomalys;
			tabanomalys[Math.floor(Math.random()*tabanomalys.length)-1].isBroken=true;
		}
	}

	update = function(d){

		var dt = d - old_date;
    	old_date = d;

		if (fleche.gauche == true && isPositionValide("x",perso.pos.x-1)) {
			console.log('Left was pressed');
			perso.goLeft();
	       			
    	}

	    if (fleche.haut == true && isPositionValide("y",perso.pos.y-1) ) {
	    	console.log('Up was pressed');
	       	perso.goUp();
	       			
	    }

	    if (fleche.droite == true && isPositionValide("x",perso.pos.x+1)) {
			console.log('droite was pressed');
	       	perso.goRight();
	    }	

	    if (fleche.bas == true && isPositionValide("y",perso.pos.y+1)) {
			console.log('down was pressed');
	       	perso.goDown();
	    }
		
	};

	render = function(){
		ctx.clearRect(0, 0, ctx.width, ctx.height);


		switch(perso.direction){
			case 'right' :
				ctx.strokeStyle = '#4444CC';
			break;
			case 'left' :
				ctx.strokeStyle = '#FFF56E';
			break;
			case 'back' :
				ctx.strokeStyle = '#111114';
			break;
			default :
			break;
		}
		
		
		ctx.strokeRect(perso.pos.x, perso.pos.y, 25, 50);
	};
	

	captureAppuiToucheClavier = function(event) {
	//Capture de l'appuie des touches du clavier
		switch (event.keyCode) {
	        case 37 : 
				fleche.gauche = true;
	        break;
	        case 38 : 
	            fleche.haut = true;
	        break;
	        case 39 : 
	       	    fleche.droite = true;
	        break;
	        case 40 : 
	            fleche.bas = true;
	        break;
	    }

	};

	captureRelacheToucheClavier = function(event) {
		//Capture du relachement des touches du clavier
	    switch (event.keyCode) {
	        case 37 : 
	            fleche.gauche = false;
	        break;
	        case 38 : 
	            fleche.haut = false;
	        break;
	        case 39 : 
	            fleche.droite = false;
	        break;
	        case 40 : 
	            fleche.bas = false;
		}
	};

	init();


	
});

