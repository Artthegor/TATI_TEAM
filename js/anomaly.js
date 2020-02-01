class Anomaly {

    sprite= {
        broken: "",
        notBroken: ""
    };

    constructor(position, materialRepair, type) {
        this.position = position;
        this.type = type;
        this.idMaterialRepair = materialRepair;
        this.isBroken = false;
        this.width = 10;
        this.height = 10;
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
                this.sprite.broken = "";
                this.sprite.notBroken ="";
                break;
            case 'leak':
                this.sprite.broken = "";
                this.sprite.notBroken ="";
                break;
            case 'fire':
                this.sprite.broken = "";
                this.sprite.notBroken ="";
                break;
            case 'smokingMachine':
                this.sprite.broken = "";
                this.sprite.notBroken ="";
                break;
            case 'blockenHelm':
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