class Anomaly {

    sprite = {
        broken: "",
        notBroken: "",
        defaul: ""
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
                this.sprite.defaul = "#a59ea4";
                this.sprite.broken = "";
                this.sprite.notBroken = "";
                break;
            case 'leak':
                this.sprite.defaul = "#73a2c5";
                this.sprite.broken = "";
                this.sprite.notBroken = "";
                break;
            case 'fire':
                this.sprite.defaul = "#ea4b32";
                this.sprite.broken = "";
                this.sprite.notBroken = "";
                break;
            case 'smokingMachine':
                this.sprite.defaul = "#0b0403";
                this.sprite.broken = "";
                this.sprite.notBroken = "";
                break;
            case 'blockenHelm':
                this.sprite.defaul = "#ae5721";
                this.sprite.broken = "";
                this.sprite.notBroken = "";
                break;
            default:
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