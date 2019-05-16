var ship;
var map;

var sectors = [];
var canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  generateSectors();
  console.log(sectors);

  ship = new Ship();
  ship.setup();

  map = new Map(128, sectors.length);

  console.log(sectors[0].objects);
}

function draw() {
    var deltaTime = window.performance.now() - canvas._pInst._lastFrameTime;

    background(11);

    sectors[ship.sector - 1].draw();
    sectors[ship.sector - 1].update(deltaTime);

    ship.draw();
    ship.update(deltaTime);

    map.draw();
}

function warp(){
    //If ship reaches edge of sector, go to the adjacent one
    if(ship.pos.x < 0){

    }else if(ship.pos.x > width){

    }else if(ship.pos.y < 0){

    }else if(ship.pos.y > height){
        
    }



}

function generateSectors(){
    //8x8 grid
    for(var i = 0; i < 64; i++){
        var newSector = new Sector();
        newSector.generate();

        sectors.push(newSector);
    }
}
