class Shelve {

    nbMaterialKit;
    materialType;

    constructor(position, materialType, nbMaterialKit) {
        this.position = position;
        this.materialType = materialType;
        this.nbMaterialKit = nbMaterialKit;
        this.width = 65;
        this.height = 160;

    }

    takeItem(personage) {
        if (this.nbMaterialKit !== 0) {
            console.log("take wood from shelve");
            this.nbMaterialKit--;
            personage.holdType = this.materialType;
            return true;
        }
        return false;
    }

    addItem() {
        console.log(this.nbMaterialKit);
        if (this.nbMaterialKit < 6) {
            this.nbMaterialKit++;
            return true;
        }
        return false;
    }

    get nbMaterialKit(){
        return this.nbMaterialKit;
    }

    get materialType(){
        return this.materialType;
    }

}