function UI(ship, imageLoader){
    this.IMGS_HULL = imageLoader.SHIP_IMGS_HULL;

    this.draw = function(){
        image(this.IMGS_HULL[ship.hull], 10, height - 61 , 204,61);
    }
}