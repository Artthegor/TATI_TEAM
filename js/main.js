//Var
var ctx = null;
var inGame = true;
var old_date = Date.now();
var perso;
var fleche = {haut: false, bas: false, gauche: false, droite:false}

document.addEventListener("DOMContentLoaded", function(){

	//init du jeu
	function init(){
		ctx = document.getElementById("zoneJeu").getContext("2d");
    	ctx.width = document.getElementById("zoneJeu").width;
    	ctx.height = document.getElementById("zoneJeu").height;

    	document.addEventListener("keydown", captureAppuiToucheClavier)
    	document.addEventListener("keyup", captureRelacheToucheClavier)


		console.log('tamere');
		perso = new Perso(50, 50);
		gameLoop();

	}


	gameLoop = function(){

		if(inGame) {
        	update(Date.now());   
    	}
    	render();
		requestAnimationFrame(gameLoop);
			
	}

	update = function(d){

		var dt = d - old_date;
    	old_date = d;

		if (fleche.gauche == true ) {
			console.log('Left was pressed');
			console.log(perso.pos);
			perso.goLeft();
	       			
    	}

	    if (fleche.haut == true ) {
	    	console.log('Up was pressed');
	       	console.log(perso.pos);
	       	perso.goUp();
	       			
	    }

	    if (fleche.droite == true ) {
			console.log('droite was pressed');
	       	console.log(perso.pos);
	       	perso.goRight();
	    }	

	    if (fleche.bas == true) {
			console.log('down was pressed');
	       	console.log(perso.pos);
	       	perso.goDown();
	    }
		
	}

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
	}
	

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

	}

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
	}

	init();


	
});

