//Var #TATIVAR(83)
var ctx = null;
var inGame = true;
var old_date = Date.now();
var perso1;
var perso2;
var listEchelle = [{x: 281, y: 330, up: true}, {x: 920, y: 330, up: false}, {x: 525, y: 520, up: true}, {
    x: 740,
    y: 520,
    up: true
}, {x: 910, y: 520, up: true}];
var validYLines = [330, 520, 685];
var hauteurEchelle = 190;
var largeurEchelle = 45;
var fleche = {haut: false, bas: false, gauche: false, droite: false};
var fleche2 = {haut: false, bas: false, gauche: false, droite: false};
var isSpacebarPressed = false;
var isSpacebarPressed2 = false;
var anomalys;
var repaireKits;
var shelveWood;
var shelveStick;
var shelveMetal;
var shelves;
var incrementTime = 0;
var score = 0;
var probaAparitionEvent = 0.3;
var eventApparitionTrigger = 10000;
var nbFrame = 0;
var dt = 0;
var incrementTimeSupplies = 0;
var eventSuppliesApparitionTrigger = 3000;
var probaSuppliesApparition = 0.8;

var lastTime = 0;
var thisTime = 0;
var spritePerso = new Image();

var waterLevel = 520;
var weatherAPIKey = "29b60c733e81a543a8bc59913c04567e";

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

var nbJoueur = 1;

function success(pos) {
    getWeather(pos.coords.latitude, pos.coords.longitude);
}

function error(err) {
    console.warn(`ERREUR (${err.code}): ${err.message}`);
}


function getWeather(latitude, longitude) {
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + weatherAPIKey;
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        var currentWeather = request.response;
        var currentPressure = currentWeather.main.pressure;
        if (currentPressure > 1020) {
            //GRAND SOLEIL SA GRAND MERE
            eventApparitionTrigger = 8000;
            probaAparitionEvent = 0.4;
            probaSuppliesApparition = 0.8;
        } else {
            if (currentPressure > 1013) {
                //UN PEU DE SOLEIL MAIS AUSSI DES NUAGES MA GUEULE
                eventApparitionTrigger = 5000;
                probaAparitionEvent = 0.3;
                probaSuppliesApparition = 0.85;
            } else {
                // C EST LA TEMPETE DE OUF MON BRO
                eventApparitionTrigger = 3000;
                probaAparitionEvent = 0.2;
                probaSuppliesApparition = 0.9;
            }
        }
    };

}


document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("zoneJeu").addEventListener('click', getPositionMouse);

    function getPositionMouse(e) {
        console.log("(" + e.clientX + "," + e.clientY + ")");

    }

    //init du jeu
    function init(n) {
        nbJoueur = n;
        document.getElementById("menu").style.display = 'none';
        document.getElementById("content").style.display = 'block';

        ctx = document.getElementById("zoneJeu").getContext("2d");
        ctx.width = document.getElementById("zoneJeu").width;
        ctx.height = document.getElementById("zoneJeu").height;


        document.addEventListener("keydown", captureAppuiToucheClavier);
        document.addEventListener("keyup", captureRelacheToucheClavier);

        repaireKits = [new RepareKit(new Position(413,320),material.EXTINGUISHER)];
        shelveWood = new Shelve(new Position(750, 520), material.WOOD, 0);
        shelveMetal = new Shelve(new Position(870, 520), material.IRON, 0);
        shelveStick = new Shelve(new Position(1020, 520), material.STICK, 0);
        shelves = [shelveWood, shelveStick, shelveMetal];

        perso1 = new Perso(350, 520 - 120, 1);
        if (nbJoueur == 2) {
            perso2 = new Perso(350, 330 - 120, 2);
        }


        anomalys = [new Anomaly(new Position(245, 520), material.EXTINGUISHER, type.BARREL_FIRE),
            new Anomaly(new Position(710, 685), material.EXTINGUISHER, type.BARREL_FIRE),
            new Anomaly(new Position(440, 685), material.EXTINGUISHER, type.BARREL_FIRE),
            new Anomaly(new Position(445, 520), material.EXTINGUISHER, type.ENGINE_FIRE),
            new Anomaly(new Position(370, 520), material.IRON, type.PIPE),
            new Anomaly(new Position(670, 520), material.EXTINGUISHER, type.ENGINE_FIRE),
            new Anomaly(new Position(970, 685), material.EMPTY, type.LEVER),
            new Anomaly(new Position(610, 685), material.WOOD, type.LEAK),
            new Anomaly(new Position(845, 685), material.WOOD, type.LEAK),
            new Anomaly(new Position(845, 685), material.WOOD, type.LEAK),
            new Anomaly(new Position(370, 320), material.IRON, type.PIPE),
            new Anomaly(new Position(680, 320), material.IRON, type.PIPE),
            new Anomaly(new Position(1100, 320), material.STICK, type.HELM),
        ];
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

    function isPossibleToUp(perso) {
        for (const echelle of listEchelle) {
            if (echelle.up) {
                if (echelle.x <= perso.pointRef.x && echelle.x + largeurEchelle >= perso.pointRef.x && echelle.y < perso.pos.y + perso.hauteur) {
                    return true;
                }
            }

        }

        return false;
    }

    function isPossibleToDown(perso) {
        for (const echelle of listEchelle) {
            if (echelle.x <= perso.pointRef.x && echelle.x + largeurEchelle >= perso.pointRef.x && echelle.y + hauteurEchelle > perso.pointRef.y && echelle.y <= perso.pointRef.y && perso.pointRef.y < 685) {
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

    increaseWaterLevel = function () {
        var nbAnomaly = 0;
        for (const anomaly of anomalys) {
            if (anomaly.isBroken) nbAnomaly++;
        }
        waterLevel -= nbAnomaly * 0;
        return waterLevel <= 250;

    };


    randomlyCreateAnomaly = function () {
        if (Math.random() < probaAparitionEvent) {
            var index = Math.floor(Math.random() * this.anomalys.length);
            anomalys[index].isBroken = true;
            if (Math.random() > 0.5) {
                probaAparitionEvent += 0.05;
            } else if (eventApparitionTrigger > 1000) {
                eventApparitionTrigger -= 100;
            }
        }
    };

    moveInWaterSupplies = function () {
        for (var kit of repaireKits) {
            if (kit.position.x > 1150) {
                kit.position = new Position(kit.position.x - 1, waterLevel + 50);
            } else {
                if (kit.position.x === 1150) {
                    switch (kit.material) {
                        case material.STICK :
                            shelveStick.addItem();

                            break;
                        case material.IRON :
                            shelveMetal.addItem();
                            break;
                        case material.WOOD :
                            shelveWood.addItem();
                            break;
                        default:
                    }
                    repaireKits.splice(repaireKits.indexOf(kit), 1);
                }
            }
        }
    };

    randomlyAppearsSupplies = function () {
        if (Math.random() < probaSuppliesApparition) {
            var index = Math.floor(Math.random() * 3);
            switch (index) {
                case 0 :
                    var r1 = new RepareKit(new Position(1400, waterLevel + 50), material.WOOD);
                    repaireKits.push(r1);
                    break;
                case 1 :
                    var r1 = new RepareKit(new Position(1400, waterLevel + 50), material.IRON);
                    repaireKits.push(r1);
                    break;
                case 2 :
                    var r1 = new RepareKit(new Position(1400, waterLevel + 50), material.STICK);
                    repaireKits.push(r1);
                    break;
                default:
                    break;

            }
            probaSuppliesApparition -= 0.05;
        } else {
            probaSuppliesApparition += 0.05;
        }
    };

    testMurLeft = function (perso) {
        return ((perso.pointRef.y == validYLines[0] && perso.pos.x > 271) ||
            ((perso.pointRef.y == validYLines[1] && perso.pos.x > 210) &&
                (perso.pointRef.y == validYLines[1] && ((perso.pos.x) < 709 || perso.pos.x > 711))) ||
            ((perso.pointRef.y == validYLines[2] && perso.pos.x > 410) &&
                (perso.pointRef.y == validYLines[2] && ((perso.pos.x) < 824 || perso.pos.x > 826))));
    }

    testMurRight = function (perso) {
        return ((perso.pointRef.y == validYLines[0] && perso.pos.x + perso.largeur < 1115) ||
            ((perso.pointRef.y == validYLines[1] && perso.pos.x + perso.largeur < 1100) &&
                (perso.pointRef.y == validYLines[1] && ((perso.pos.x + perso.largeur) < 709 || perso.pos.x + perso.largeur > 711))) ||
            ((perso.pointRef.y == validYLines[2] && perso.pos.x + perso.largeur < 995) &&
                (perso.pointRef.y == validYLines[2] && ((perso.pos.x + perso.largeur - 5) < 824 || perso.pos.x + perso.largeur - 5 > 826))));
    };

    update = function (d) {

        dt = d - old_date;
        old_date = d;

        //joueur1
        if (fleche.gauche == true && isPositionValide("x", perso1.pos.x - 1) && validYLines.includes(perso1.pointRef.y)) {
            if (testMurLeft(perso1)) {
                perso1.goLeft();
            }
        }

        if (fleche.haut == true && isPositionValide("y", perso1.pos.y - 1) && isPossibleToUp(perso1)) {
            perso1.goUp();
        }

        if (fleche.droite == true && isPositionValide("x", perso1.pos.x + 1) && validYLines.includes(perso1.pointRef.y)) {
            if (testMurRight(perso1)) {
                perso1.goRight();
            }
        }

        if (fleche.bas == true && isPositionValide("y", perso1.pos.y + 1) && isPossibleToDown(perso1)) {
            perso1.goDown();
            perso1.onALadder = false;
        }

        if ((perso1.pointRef.y == validYLines[0] || perso1.pointRef.y == validYLines[1] || perso1.pointRef.y == validYLines[2]) && (fleche.droite == false && fleche.gauche == false)) {
            perso1.stoped();
        }

        //joueur2
        if (nbJoueur == 2) {
            if (fleche2.gauche == true && isPositionValide("x", perso2.pos.x - 1) && validYLines.includes(perso2.pointRef.y)) {
                if (testMurLeft(perso2)) {
                    perso2.goLeft();
                }
            }

            if (fleche2.haut == true && isPositionValide("y", perso2.pos.y - 1) && isPossibleToUp(perso2)) {
                perso2.goUp();
            }


            if (fleche2.droite == true && isPositionValide("x", perso2.pos.x + 1) && validYLines.includes(perso2.pointRef.y)) {
                if (testMurRight(perso2)) {
                    perso2.goRight();
                }
            }


            if (fleche2.bas == true && isPositionValide("y", perso2.pos.y + 1) && isPossibleToDown(perso2)) {
                perso2.goDown();
                perso2.onALadder = false;
            }


            if ((perso2.pointRef.y == validYLines[0] || perso2.pointRef.y == validYLines[1] || perso2.pointRef.y == validYLines[2]) && (fleche2.droite == false && fleche2.gauche == false)) {
                perso2.stoped();
            }
        }


        nbFrame += dt;
        if (nbFrame >= 1000) {
            nbFrame = 0;
        }

        if (isSpacebarPressed) {
            isSpacebarPressed = false;
            executeSpace(perso1);

        }

        if (nbJoueur == 2) {
            if (isSpacebarPressed2) {
                isSpacebarPressed2 = false;
                executeSpace(perso2);

            }
        }


        thisTime += dt;
        if (lastTime + 333 < thisTime) {
            lastTime = thisTime;
            score++;
        }


        incrementTime += dt;
        incrementTimeSupplies += dt;
        if (incrementTimeSupplies > eventSuppliesApparitionTrigger) {
            incrementTimeSupplies = 0;
            randomlyAppearsSupplies();
        }
        if (incrementTime > eventApparitionTrigger) {
            incrementTime = 0;
            randomlyCreateAnomaly();
        }
        inGame = !increaseWaterLevel();

        perso1.updatePointRef();
        if (nbJoueur == 2) {
            perso2.updatePointRef();
        }

        moveInWaterSupplies();

    };

    render = function () {
        ctx.clearRect(0, 0, ctx.width, ctx.height);
        drawAnomaly();
        drawRepareKit(dt);
        drawShelve();
        drawScore();
        drawPersonage(perso1);
        if (nbJoueur === 2) {
            drawPersonage(perso2);
        }

        drawWater();
    };


    function drawPersonage(perso) {

        ctx.drawImage(perso.getSprite(dt), perso.pos.x, perso.pos.y, perso.largeur, perso.hauteur);


    }

   
    drawAnomaly = function () {
        for (const anomaly of this.anomalys) {
            if (anomaly.isBroken) {
                ctx.beginPath();
                ctx.lineWidth = "2";
                ctx.arc(anomaly.position.x, anomaly.position.y, 10, 0, 2 * Math.PI);
                ctx.fillStyle = anomaly.sprite.defaul;
                ctx.fill();
            }
        }
    };

    drawScore = function () {

        document.getElementById("score").innerHTML = score + " m";
    };

    drawWater = function () {
        ctx.fillStyle = '#3f36e5';
        ctx.globalAlpha = 0.4;
        ctx.fillRect(0, waterLevel, ctx.width, ctx.height);
        ctx.globalAlpha = 1;
    };

    drawShelve = function () {
        ctx.strokeStyle = '#3f36e5';
        ctx.fillStyle = '#3f36e5';
        for (const shelve of shelves) {
            ctx.fillRect(shelve.position.x, shelve.position.y - shelve.height, shelve.width, shelve.height);
        }
    };

    drawRepareKit = function (time) {
        for (const repaireKit of repaireKits) {
            ctx.drawImage(repaireKit.sprite, repaireKit.position.x - repaireKit.width / 2, repaireKit.position.y - repaireKit.height + repaireKit.getAnimations(time), repaireKit.width, repaireKit.height);
        }
    };


    captureAppuiToucheClavier = function (event) {
        //Capture de l'appuie des touches du clavier
        switch (event.keyCode) {
            case 37 :
                fleche.gauche = true;
                fleche.bas = false;
                fleche.droite = false;
                fleche.haut = false;
                break;
            case 38 :
                fleche.haut = true;
                fleche.gauche = false;
                fleche.droite = false;
                fleche.bas = false;
                break;
            case 39 :
                fleche.droite = true;
                fleche.gauche = false;
                fleche.bas = false;
                fleche.haut = false;
                break;
            case 40 :
                fleche.bas = true;
                fleche.gauche = false;
                fleche.droite = false;
                fleche.haut = false;
                break;
            case  32 :
                isSpacebarPressed = true;
                break;


            case 81 :
                fleche2.gauche = true;
                fleche2.bas = false;
                fleche2.droite = false;
                fleche2.haut = false;
                break;
            case 90 :
                fleche2.haut = true;
                fleche2.gauche = false;
                fleche2.droite = false;
                fleche2.bas = false;
                break;
            case 68 :
                fleche2.droite = true;
                fleche2.gauche = false;
                fleche2.bas = false;
                fleche2.haut = false;
                break;
            case 83 :
                fleche2.bas = true;
                fleche2.gauche = false;
                fleche2.droite = false;
                fleche2.haut = false;
                break;
            case  69 :
                isSpacebarPressed2 = true;
                break;

        }

    };

    executeSpace = function (perso) {
        switch (perso.holdType) {
            case material.EMPTY:
                if (!checkHitBoxShelvesPerso(perso)) {
                    if (!checkHitBoxMaterialPerso(perso)) {
                        checkHitBoxAnomaliePerso(perso)
                    }
                }
                break;
            case material.EXTINGUISHER :
                if (!checkHitBoxAnomaliePerso(perso)) {
                    if (!checkHitBoxShelvesPerso(perso)) {
                        if (!checkHitBoxMaterialPerso(perso)) {
                            putMaterialKitDown(perso);
                        }
                    }
                }
                break;
            case material.WOOD :
                if (!checkHitBoxAnomaliePerso(perso)) {
                    if (!checkHitBoxShelvesPerso(perso)) {
                        if (!checkHitBoxMaterialPerso(perso)) {
                            putMaterialKitDown(perso);
                        }
                    }
                }
                break;
            case material.IRON :
                if (!checkHitBoxAnomaliePerso(perso)) {
                    if (!checkHitBoxShelvesPerso(perso)) {
                        if (!checkHitBoxMaterialPerso(perso))
                            putMaterialKitDown(perso);
                    }
                }
                break;
            case material.STICK :
                if (!checkHitBoxAnomaliePerso(perso)) {
                    if (!checkHitBoxShelvesPerso(perso)) {
                        if (!checkHitBoxMaterialPerso(perso))
                            putMaterialKitDown(perso);
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



            //player 2
            case 90 :
                fleche2.haut = false;
                break;
            case 81 :
                fleche2.gauche = false;
                break;
            case 68 :
                fleche2.droite = false;
                break;
            case 69 :
                isSpacebarPressed2 = false;
                break;
            case 83 :
                fleche2.bas = false;
                break;

        }
    };

    putMaterialKitDown = function (perso) {
        repaireKits.push(new RepareKit(perso.pointRef, perso.holdType));
        perso.holdType = material.EMPTY;
    };

    checkHitBoxAnomaliePerso = function (perso) {
        for (const anomaly of anomalys) {
            if (!anomaly.isBroken) continue;
            if (anomaly.position.y !== perso.pointRef.y || anomaly.position.x > perso.pos.x + perso.largeur ||
                anomaly.position.x + anomaly.width < perso.pos.x) continue;
            perso.repair(anomaly);
            return true;
        }
        return false
    };

    checkHitBoxShelvesPerso = function (perso) {
        for (const shelve of shelves) {
            if (perso.pointRef.y !== 520 ||
                shelve.position.x > perso.pos.x + perso.largeur || shelve.position.x + shelve.width < perso.pos.x) continue;
            if (perso.holdType === shelve.materialType) {
                if (shelve.addItem()) {
                    perso.holdType = material.EMPTY;
                }
                return true;
            } else if (perso.holdType === material.EMPTY) {
                return shelve.takeItem(perso);
            }
            return false;
        }
    };

    checkHitBoxMaterialPerso = function (perso) {
        for (const repaireKit of repaireKits) {
            if (repaireKit.position.y !== perso.pointRef.y || repaireKit.position.x > perso.pos.x + perso.largeur ||
                repaireKit.position.x + repaireKit.width < perso.pos.x) continue;
            if (perso.holdType === material.EMPTY) {
                repaireKits.splice(repaireKits.indexOf(repaireKit), 1);
                console.log(repaireKits);
                console.log(perso);

                perso.takeObject(repaireKit);
                perso.holdType = repaireKit.material;
                console.log(perso.holdType);
                console.log(repaireKit.material);
                return true;
            }
        }
        return false
    };

    document.getElementById('btn1j').onclick = function () {
        init(1);
    }
    document.getElementById('btn2j').onclick = function () {
        init(2);
    }

});

