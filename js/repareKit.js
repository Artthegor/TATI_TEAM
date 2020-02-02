class RepareKit {
    sprite;

    constructor(position, material) {
        this.position = new Position(position.x, position.y);
        this.material = material;
        this.width = 34;
        this.height = 24;
        this.sprite = new Image();
        this.initSprite();
    }

    get sprite(){
        return this.sprite;
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