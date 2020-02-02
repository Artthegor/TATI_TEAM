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
        this.isBroken = true;
    }

    repaired() {
        this.isBroken = false;
    }



}