class RepareKit {
    sprite= "";

    constructor(position, material) {
        this.position = new Position(position.x, position.y);
        this.material = material;
        this.width = 10;
        this.height = 10;
    }

    get sprite(){
        return this.sprite;
    }

    initSprite() {
        switch (this.material) {
            case material.STICK:
                this.sprite = "";
                break;
            case material.IRON:
                this.sprite = "";
                break;
            case material.WOOD:
                this.sprite = "";
                break;
            case material.EXTINGUISHER:
                this.sprite = "";
                break;
            default:
        }
    }
}