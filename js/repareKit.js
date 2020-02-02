class RepareKit {
    sprite;
    animations = [];


    constructor(position, material) {
        this.position = new Position(position.x, position.y);
        this.material = material;
        this.width = 34;
        this.height = 24;
        this.sprite = new Image();
        this.indexAnimation = 0;
        this.timer = 0;
        this.initSprite();
        this.initAnimationArray();
    }

    get sprite() {
        return this.sprite;
    }

    getAnimations(time) {
        this.timer += time;
        let res = this.animations[this.indexAnimation%this.animations.length];
        if(this.timer >100){
            this.timer = 0;
            this.indexAnimation++;
        }
        return res;
    }

    initAnimationArray() {
        this.animations[0] = -1;
        this.animations[1] = -2;
        this.animations[2] = -4;
        this.animations[3] = -6;
        this.animations[4] = -7;
        this.animations[5] = -8;
        this.animations[6] = -7;
        this.animations[7] = -6;
        this.animations[8] = -4;
        this.animations[9] = -2;
    }

    initSprite() {
        switch (this.material) {
            case material.STICK:
                this.sprite.src = "images/baton.png";
                break;
            case material.IRON:
                this.sprite.src = "images/metal.png";
                break;
            case material.WOOD:
                this.sprite.src = "images/planche.png";
                break;
            case material.EXTINGUISHER:
                this.sprite.src = "images/bateau.png";
                break;
            default:
        }
    }
}