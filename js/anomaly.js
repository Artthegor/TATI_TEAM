class Anomaly {

    sprite = {
        broken: "",
        notBroken: ""
    };

    soundBreak;
    soundRepair;

    constructor(position, materialRepair, type) {
        this.position = position;
        this.type = type;
        this.idMaterialRepair = materialRepair;
        this.isBroken = false;
        this.width = 10;
        this.height = 10;
        this.sprite.broken = new Image();
        this.sprite.notBroken = new Image();
        this.initSprite();
        this.initSound();
    }

    get sprite() {
        if (this.isBroken) {
            return this.sprite.broken;
        }
        return this.sprite.notBroken;
    }

    initSound() {
        switch (this.type) {
            case type.ENGINE_FIRE:
                this.soundBreak = new Sound("sound/fireship1.mp3");
                this.soundRepair = new Sound("sound/Extincteur.mp3");
                break;
            case type.LEVER:
                this.soundBreak = new Sound("sound/build2.mp3");
                this.soundRepair = new Sound("sound/woodchop3.mp3");
                break;
            case type.BARREL_FIRE:
                this.soundBreak = new Sound("sound/fireship1.mp3");
                this.soundRepair = new Sound("sound/Extincteur.mp3");
                break;
            case type.PIPE:
                this.soundBreak = new Sound("sound/XplosionPipe.mp3");
                this.soundRepair = new Sound("sound/metallicStrike.mp3");
                break;
            case type.LEAK:
                this.soundBreak = new Sound("sound/crackwood.mp3");
                this.soundRepair = new Sound("sound/woodchop3.mp3");
                break;
            case type.HELM:
                this.soundBreak = new Sound("sound/crackwood.mp3");
                this.soundRepair = new Sound("sound/woodchop3.mp3");
                break;
            case type.HOVEN_FIRE:
                this.soundBreak = new Sound("sound/fireship1.mp3");
                this.soundRepair = new Sound("sound/Extincteur.mp3");
                break;
            default:
                break;

        }
    }

    initSprite() {
        switch (this.type) {
            case 'brockenPipe':
                this.sprite.broken.src = "images/fuite.png";
                this.sprite.broken.width = 10;
                this.sprite.broken.height = 10;
                this.sprite.notBroken.src ="";
                break;
            case 'leak':
                this.sprite.broken.src = "images/fuite.png";
                this.sprite.broken.width = 10;
                this.sprite.broken.height = 10;
                this.sprite.notBroken.src ="";
                break;
            case 'fire':
                this.sprite.broken.width = 10;
                this.sprite.broken.height = 10;
                this.sprite.broken.src = "images/flamme.png";
                this.sprite.notBroken.src ="";
                break;
            case 'blockenHelm':
                this.sprite.broken.src = "images/gouv_casse.png";
                this.sprite.notBroken.src ="images/gouv_ok.png";
                break;
            case 'lever':
                this.sprite.broken.src = "images/levier_casse.png";
                this.sprite.notBroken.src ="images/levier_ok.png";
        }
    }

    destroy() {
        this.soundBreak.play();
        this.isBroken = true;
    }

    repaired() {
        this.soundRepair.play();
        this.isBroken = false;
    }


}