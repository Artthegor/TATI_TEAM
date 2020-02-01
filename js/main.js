//Var
var ctx = null;
var inGame = true;
var old_date = Date.now();
var perso;
var listEchelle = [{x : 150, y : 20}, {x : 80, y : 150}];
var hauteurEchelle = 80;
var fleche = {haut: false, bas: false, gauche: false, droite: false};
var anomalys;
var incrementTime = 0;
var probaAparitionEvent = 0.3;
var score =0;
var eventApparitionTrigger = 10000;
var lastTime =0;
var thisTime = 0;



document.addEventListener("DOMContentLoaded", function () {

    //init du jeu
    function init() {
        ctx = document.getElementById("zoneJeu").getContext("2d");
        ctx.width = document.getElementById("zoneJeu").width;
        ctx.height = document.getElementById("zoneJeu").height;

        document.addEventListener("keydown", captureAppuiToucheClavier);
        document.addEventListener("keyup", captureRelacheToucheClavier);

        anomalys = [new Anomaly(new Position(666, 666), material.EXTINGUISHER, type.BARREL_FIRE),
            new Anomaly(new Position(500, 150), material.IRON, type.PIPE),
            new Anomaly(new Position(750, 250), material.WOOD, type.LEAK)];
        perso = new Perso(50, 50);
        gameLoop();

    }

    function isPositionValide(axe, value) {
        switch (axe) {
            case "x":
                return (value > 0 && value < ctx.width - 25);
            case "y":
                return (value > 0 && value < ctx.height - 50);
            default:
                break;
        }
    }

	function isPossibleToUp(){
		console.log("ttttttt");
		console.log(perso.pos);
		for (const echelle of listEchelle){
			if(echelle.x <= perso.pos.x && echelle.x + 20 > perso.pos.x && echelle.y < perso.pos.y){
				console.log(echelle);
				return true;
			}
		}
		
		return false;
	}

	function isPossibleToDown(){
		for (const echelle of listEchelle){
			if(echelle.x <= perso.pos.x && echelle.x + 20 > perso.pos.x && echelle.y+hauteurEchelle >= perso.pos.y){
				console.log(echelle);
				return true;
			}
		}

		return false;
	}

    gameLoop = function () {

        render();
		if (inGame) {
			update(Date.now());
		}
		render();
		requestAnimationFrame(gameLoop);
	}

	

    randomlyCreateAnomaly = function () {
        if (Math.random() < probaAparitionEvent) {
            var index = Math.floor(Math.random() * this.anomalys.length);
            anomalys[index].isBroken = true;

            console.log("****Create Anomalie****");
            console.log(anomalys[index]);
            if (Math.random() > 0.5) {
                probaAparitionEvent += 0.05;
            } else if (eventApparitionTrigger > 1000) {
                eventApparitionTrigger -= 100;
            }
        }
    };

    update = function (d) {

        var dt = d - old_date;
        old_date = d;

        if (fleche.gauche == true && isPositionValide("x", perso.pos.x - 1)) {
            console.log('Left was pressed');
            perso.goLeft();

        }

        if (fleche.haut == true && isPositionValide("y", perso.pos.y - 1)&& isPossibleToUp()) {
            console.log('Up was pressed');
            perso.goUp();

        }

        if (fleche.droite == true && isPositionValide("x", perso.pos.x + 1)) {
            console.log('droite was pressed');
            perso.goRight();
        }

        if (fleche.bas == true && isPositionValide("y", perso.pos.y + 1)&& isPossibleToDown()) {
            console.log('down was pressed');
            perso.goDown();
        }
        thisTime += dt;
        if(lastTime+333<thisTime){
            lastTime=thisTime;
            score++;
        }

        incrementTime += dt;

        if (incrementTime > eventApparitionTrigger) {
            incrementTime = 0;
            randomlyCreateAnomaly();
        }

    };

    render = function () {
		ctx.clearRect(0, 0, ctx.width, ctx.height);
		drawAnomaly();
		drawPersonage();
		drawScore();
    };

    drawPersonage = function(){


		switch (perso.direction) {
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
		ctx.strokeStyle = '#888888';
		ctx.strokeRect(150, 20, 20, 80);
	};
	

    drawAnomaly = function() {
    	for (const anomaly of this.anomalys){
    		if (anomaly.isBroken){
				ctx.beginPath();
				ctx.lineWidth = "2";
				ctx.arc(anomaly.position.x, anomaly.position.y, 10, 0, 2 * Math.PI);
				ctx.fillStyle = "#FF4422";
				ctx.fill();
			}
		}
	};

    drawScore =function(){

        document.getElementById("score").innerHTML=score+" m";
    } ;

    captureAppuiToucheClavier = function (event) {
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

    captureRelacheToucheClavier = function (event) {
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

