function UI(){
    this.IMGS_HULL = imageLoader.SHIP_IMGS_HULL;
    this.map = new Map(128, sectors.length);

    this.draw = function(){
        image(this.IMGS_HULL[ship.hull], 10, height - 61 , 204,61);
        this.map.draw();
    }
}