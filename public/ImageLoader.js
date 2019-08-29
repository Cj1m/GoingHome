function ImageLoader(){
    this.SHIP_IMGS_IDLE = null;
    this.SHIP_IMGS_ZOOM = null;
    this.SHIP_IMGS_TURN_LEFT = null;
    this.SHIP_IMGS_TURN_RIGHT = null;
    this.SHIP_IMGS_HULL = null;

    this.preload = function(){
        this.SHIP_IMGS_IDLE = [loadImage("imgs/ship.png")];
        this.SHIP_IMGS_ZOOM = this.loadImages("imgs/ship_forward/",8);
        this.SHIP_IMGS_TURN_LEFT = this.loadImages("imgs/ship_left/",8);
        this.SHIP_IMGS_TURN_RIGHT = this.loadImages("imgs/ship_right/",8);
        this.SHIP_IMGS_HULL = this.loadImages("imgs/ui/hull/",16);
    }

    this.setup = function(shipSize){
        this.fixShipImagesSize(this.SHIP_IMGS_IDLE, shipSize);
        this.fixShipImagesSize(this.SHIP_IMGS_ZOOM, shipSize);
        this.fixShipImagesSize(this.SHIP_IMGS_TURN_LEFT, shipSize);
        this.fixShipImagesSize(this.SHIP_IMGS_TURN_RIGHT, shipSize);
    }

    this.loadImages = function(path, images){
        var imageArr = [];
        for(var i = 1; i <= images; i++){
            imageArr.push(loadImage(path+i+".png"));
        }
        return imageArr;
    }

    this.fixShipImagesSize = function(imageArr, shipSize){
        for(var i = 0; i < imageArr.length; i++){
            imageArr[i].resize(shipSize, shipSize);
        }
    }
}