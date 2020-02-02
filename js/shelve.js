class Shelve {
    constructor(position, materialType, nbMaterialKit) {
        this.position = position;
        this.materialType = materialType;
        this.nbMaterialKit = nbMaterialKit;
        this.width = 20;
        this.height = 70;
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
        if (this.nbMaterialKit < 6) {
            this.nbMaterialKit++;
            return true;
        }
        return false;
    }

}