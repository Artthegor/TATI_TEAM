class Anomaly {

    sprite= {
        broken: "",
        notBroken: "",
        defaul: ""
    };

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
    }

    get sprite(){
        if(this.isBroken){
            return this.sprite.broken;
        }
        return this.sprite.notBroken;
    }

    initSprite() {
        switch (this.type) {
            case 'brockenPipe':
                this.sprite.defaul = "#a59ea4";
                this.sprite.broken = "";
                this.sprite.notBroken ="";
                break;
            case 'leak':
                this.sprite.defaul = "#73a2c5";
                this.sprite.broken = "";
                this.sprite.notBroken ="";
                break;
            case 'fire':
                this.sprite.defaul = "#ea4b32";
                this.sprite.broken = "";
                this.sprite.notBroken ="";
                break;
            case 'smokingMachine':
                this.sprite.defaul = "#0b0403";
                this.sprite.broken = "";
                this.sprite.notBroken ="";
                break;
            case 'blockenHelm':
                this.sprite.defaul = "#ae5721";
                this.sprite.broken = "";
                this.sprite.notBroken ="";
                break;
            default:
        }
    }

    destroy() {
        this.isBroken = true;
    }

    repaired() {
        this.isBroken = false;
    }



}