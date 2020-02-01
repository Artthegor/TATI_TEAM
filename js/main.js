//Var
var ctx = null;
var inGame = true;
var old_date = Date.now();
var perso;
var listEchelle = [{x : 295, y : 330, up : true}, {x : 920, y : 330, up : false}, {x : 525 , y : 520, up : true }, {x : 750, y : 520, up : true}, {x : 920, y : 520, up : true}];
var validYLines=[330,520,685];
var hauteurEchelle = 190;
var largeurEchelle = 45;
var fleche = {haut: false, bas: false, gauche: false, droite: false};
var isSpacebarPressed = false;
var anomalys;
var repaireKits;
var shelveWood;
var shelves;
var incrementTime = 0;
var probaAparitionEvent = 0.3;
var score = 0;
var eventApparitionTrigger = 10000;
var lastTime = 0;
var thisTime = 0;
var spritePerso = new Image();
var waterLevel = 520;
spritePerso.src = "images/perso1D.png";
var weatherAPIKey="29b60c733e81a543a8bc59913c04567e";

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    getWeather(pos.coords.latitude,pos.coords.longitude);
}

function error(err) {
    console.warn(`ERREUR (${err.code}): ${err.message}`);
}



function getWeather(latitude,longitude){
    //console.log("https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid="+weatherAPIKey);
    var requestURL="https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid="+weatherAPIKey;
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var currentWeather = request.response;
        //setWeather(currentWeather);
        //console.log(currentWeather);
        var currentPressure=currentWeather.main.pressure;
        //console.log("PRESSURE SA GRAND MERE : "+currentPressure);
        if(currentPressure>1020){
            //GRAND SOLEIL SA GRAND MERE
        }
        else{
            if(currentPressure>1013){
                //UN PEU DE SOLEIL MAIS AUSSI DES NUAGES MA GUEULE
            }
            else{
                // C EST LA TEMPETE DE OUF MON BRO
            }
        }
    };

}









document.addEventListener("DOMContentLoaded", function () {

    /*document.getElementById("zoneJeu").addEventListener('click', getPositionMouse);

    function getPositionMouse(e){
        console.log("(" + e.clientX + "," + e.clientY + ")");

    }*/

    //init du jeu
    function init() {
        ctx = document.getElementById("zoneJeu").getContext("2d");
        ctx.width = document.getElementById("zoneJeu").width;
        ctx.height = document.getElementById("zoneJeu").height;

        document.addEventListener("keydown", captureAppuiToucheClavier);
        document.addEventListener("keyup", captureRelacheToucheClavier);

        let anoDestroy = new Anomaly(new Position(300, 520), material.WOOD, type.LEAK);
        anoDestroy.destroy();

        repaireKits = [];
        shelveWood = new Shelve(new Position(500, 520), material.WOOD, 2);
        shelves = [shelveWood];
        perso = new Perso(350, 520 - 110);
        anomalys = [new Anomaly(new Position(666, 666), material.EXTINGUISHER, type.BARREL_FIRE),
            new Anomaly(new Position(500, 150), material.IRON, type.PIPE),
            new Anomaly(new Position(750, 250), material.WOOD, type.LEAK)];
        navigator.geolocation.getCurrentPosition(success, error, options);
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

    function isPossibleToUp() {
        for (const echelle of listEchelle) {
            if (echelle.up) {
                if (echelle.x <= perso.pointRef.x && echelle.x + largeurEchelle >= perso.pointRef.x && echelle.y < perso.pos.y + perso.hauteur) {
                    console.log(echelle);
                    return true;
                }
            }

        }

        return false;
    }

    function isPossibleToDown() {
        for (const echelle of listEchelle) {
            if (echelle.x <= perso.pointRef.x && echelle.x + largeurEchelle >= perso.pointRef.x && echelle.y + hauteurEchelle > perso.pointRef.y && echelle.y <= perso.pointRef.y && perso.pointRef.y < 685) {
                console.log(perso.pointRef);
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
    };

    increaseWaterLevel = function(){
        var nbAnomaly =0;
        for(const anomaly of anomalys){
            if(anomaly.isBroken) nbAnomaly++;
        }
        waterLevel-=nbAnomaly*0.1;
        return waterLevel <= 250;

    };


    randomlyCreateAnomaly = function () {
        if (Math.random() < probaAparitionEvent) {
            var index = Math.floor(Math.random() * this.anomalys.length);
            anomalys[index].isBroken = true;

            //console.log("****Create Anomalie****");
            //console.log(anomalys[index]);
            if (Math.random() > 0.5) {
                probaAparitionEvent += 0.05;
            } else if (eventApparitionTrigger > 1000) {
                eventApparitionTrigger -= 100;
            }
        }
    };

    testMurLeft = function () {
        return ((perso.pointRef.y == validYLines[0] && perso.pos.x > 295) ||
            ((perso.pointRef.y == validYLines[1] && perso.pos.x > 250) &&
                (perso.pointRef.y == validYLines[1] && ((perso.pos.x) < 709 || perso.pos.x > 711))) ||
            ((perso.pointRef.y == validYLines[2] && perso.pos.x > 400) &&
                (perso.pointRef.y == validYLines[2] && ((perso.pos.x) < 824 || perso.pos.x > 826))));
    }

    testMurRight = function () {
        return ((perso.pointRef.y == validYLines[0] && perso.pos.x + perso.largeur < 1100) ||
            ((perso.pointRef.y == validYLines[1] && perso.pos.x + perso.largeur < 1100) &&
                (perso.pointRef.y == validYLines[1] && ((perso.pos.x + perso.largeur) < 709 || perso.pos.x + perso.largeur > 711))) ||
            ((perso.pointRef.y == validYLines[2] && perso.pos.x + perso.largeur < 1000) &&
                (perso.pointRef.y == validYLines[2] && ((perso.pos.x + perso.largeur - 5) < 824 || perso.pos.x + perso.largeur - 5 > 826))));
    }

    update = function (d) {

        var dt = d - old_date;
        old_date = d;

        if (fleche.gauche == true && isPositionValide("x", perso.pos.x - 1) && validYLines.includes(perso.pointRef.y)) {
            if (testMurLeft()) {
                console.log('Left was pressed');
                perso.goLeft();
            }


        }

        if (fleche.haut == true && isPositionValide("y", perso.pos.y - 1) && isPossibleToUp()) {
            console.log('Up was pressed');
            perso.goUp();

        }

        if (fleche.droite == true && isPositionValide("x", perso.pos.x + 1) && validYLines.includes(perso.pointRef.y)) {
            if (testMurRight()) {
                console.log('droite was pressed');
                console.log(perso.pos);
                perso.goRight();
            }

        }

        if (fleche.bas == true && isPositionValide("y", perso.pos.y + 1) && isPossibleToDown()) {
            console.log('down was pressed');
            perso.goDown();
            perso.onALadder = false;
        }

        if (isSpacebarPressed) {
            isSpacebarPressed = false;
            console.log('space was pressed');
            executeSpace();
        }

        thisTime += dt;
        if (lastTime + 333 < thisTime) {
            lastTime = thisTime;
            score++;
        }

        incrementTime += dt;

        if (incrementTime > eventApparitionTrigger) {
            incrementTime = 0;
            randomlyCreateAnomaly();
        }
         inGame = !increaseWaterLevel();

        perso.updatePointRef();

    };

    render = function () {
        ctx.clearRect(0, 0, ctx.width, ctx.height);
        drawEchelle();
        drawAnomaly();
        drawRepareKit();
        drawShelve();
        drawScore();
        drawPersonage();
        drawWater();
    };

    drawWater = function () {
        ctx.fillStyle = '#3f36e5';
        ctx.globalAlpha =0.4;
        ctx.fillRect(0, waterLevel, ctx.width, ctx.height);
        ctx.globalAlpha =1;
    };

    drawShelve = function () {
        ctx.strokeStyle = '#3f36e5';
        ctx.fillStyle = '#3f36e5';
        for (const shelve of shelves) {
            ctx.fillRect(shelve.position.x, shelve.position.y - shelve.height, shelve.width, shelve.height);
        }
    };

    drawRepareKit = function () {
        for (const repaireKit of repaireKits) {
            console.log("draw repair kit");
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.arc(repaireKit.position.x, repaireKit.position.y, repaireKit.width, 0, 2 * Math.PI);
            ctx.fillStyle = "#2fff2b";
            ctx.fill();
        }
    };

    drawPersonage = function () {


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


        ctx.strokeRect(perso.pos.x, perso.pos.y, perso.largeur, perso.hauteur);
        ctx.drawImage(spritePerso, perso.pos.x, perso.pos.y, perso.largeur, perso.hauteur);

    };

    drawEchelle = function () {
        ctx.strokeStyle = '#888888';

        for (const echelle of listEchelle) {
            ctx.strokeRect(echelle.x, echelle.y, largeurEchelle, hauteurEchelle);
        }
    };

    drawAnomaly = function () {
        for (const anomaly of this.anomalys) {
            if (anomaly.isBroken) {
                ctx.beginPath();
                ctx.lineWidth = "2";
                ctx.arc(anomaly.position.x, anomaly.position.y, 10, 0, 2 * Math.PI);
                ctx.fillStyle = "#FF4422";
                ctx.fill();
            }
        }
    };

    drawScore = function () {

        document.getElementById("score").innerHTML = score + " m";
    };

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
            case  32 :
                isSpacebarPressed = true;

        }

    };

    executeSpace = function () {
        switch (perso.holdType) {
            case material.EMPTY:
                if (!checkHitBoxShelvesPerso()) {
                    if (!checkHitBoxMaterialPerso()) {
                    }
                }
                //checkLeverBrocken
                //else checkMaterial
                break;
            case material.EXTINGUISHER :
                if (!checkHitBoxAnomaliePerso())
                    if (!checkHitBoxMaterialPerso())
                        putMaterialKitDown();
                break;
            case material.WOOD :
                console.log("wood");
                if (!checkHitBoxAnomaliePerso()) {
                    console.log("wood hit");
                    if (!checkHitBoxShelvesPerso()) {
                        console.log("wood shelve");
                        if (!checkHitBoxMaterialPerso()) {
                            console.log("wood");
                            putMaterialKitDown();
                        }
                    }
                }
                break;
            case material.IRON :
                if (!checkHitBoxAnomaliePerso()) {
                    if (!checkHitBoxShelvesPerso()) {
                        if (!checkHitBoxMaterialPerso())
                            putMaterialKitDown();
                    }
                }
                break;
            case material.STICK :
                if (!checkHitBoxAnomaliePerso()) {
                    if (!checkHitBoxShelvesPerso()) {
                        if (!checkHitBoxMaterialPerso())
                            putMaterialKitDown();
                    }
                }
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
                break;
            case 32:
                isSpacebarPressed = false;
                break;

        }
    };

    putMaterialKitDown = function () {
        console.log("put" + perso.holdType);
        repaireKits.push(new RepareKit(perso.pointRef, perso.holdType));
        perso.holdType = material.EMPTY;
    };

    checkHitBoxAnomaliePerso = function () {
        for (const anomaly of anomalys) {
            if (!anomaly.isBroken) continue;
            if (anomaly.position.y !== perso.pointRef.y || anomaly.position.x > perso.pos.x + perso.largeur ||
                anomaly.position.x + anomaly.width < perso.pos.x) continue;
            perso.repair(anomaly);
            return true;
        }
        return false
    };

    checkHitBoxShelvesPerso = function () {
        for (const shelve of shelves) {
            console.log(perso.pos.y);
            if (perso.pointRef.y !== 520 ||
                shelve.position.x > perso.pos.x + perso.largeur || shelve.position.x + shelve.width < perso.pos.x) continue;
            return shelve.takeItem(perso);
        }
    };

    checkHitBoxMaterialPerso = function () {
        for (const repaireKit of repaireKits) {
            if (repaireKit.position.y !== perso.pointRef.y || repaireKit.position.x > perso.pos.x + perso.largeur ||
                repaireKit.position.x + repaireKit.width < perso.pos.x) continue;
            if (perso.holdType === material.EMPTY) {
                repaireKits.splice(repaireKits.indexOf(repaireKit), 1);
                perso.takeObject(repaireKit);
                perso.holdType = repaireKit.material;
                return true;
            }
        }
        return false
    };

    init();


});

