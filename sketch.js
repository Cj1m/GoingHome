var ship;
var map;

var sectors = [];
var canvas;

function preload(){
  ship = new Ship();
  ship.preload();

  generateSectors();
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  setupSectors();
  ship.setup();

  map = new Map(128, sectors.length);

  console.log(sectors[0].objects);
}

function draw() {
    var deltaTime = window.performance.now() - canvas._pInst._lastFrameTime;

    background(11);

    sectors[ship.sector].draw();
    sectors[ship.sector].update(deltaTime);

    ship.draw();
    ship.update(deltaTime,sectors[ship.sector].objects);

    map.draw();

    warp();
}


//If ship reaches edge of sector, go to the adjacent one
function warp(){
    var gridx = ship.sector % 8;
    var gridy = floor(ship.sector / 8);

    var newSector = ship.sector;
    if(ship.pos.x < 0){
      if(gridx == 0){
        ship.pos.x = 0;
        return;
      }

      ship.pos.x = width;
      newSector = ship.sector - 1;
    }else if(ship.pos.x > width){
      if(gridx == 7){
        ship.pos.x = width;
        return;
      }

      ship.pos.x = 0;
      newSector = ship.sector + 1;
    }else if(ship.pos.y < 0){
      if(gridy == 0){
        ship.pos.y = 0;
        return;
      }

      ship.pos.y = height;
      newSector = ship.sector - 8;
    }else if(ship.pos.y > height){
      if(gridy == 7){
        ship.pos.y = height;
        return;
      }

      ship.pos.y = 0;
      newSector = ship.sector + 8;
    }else{
      return;
    }

    ship.sector = newSector;
    map.enter(newSector);
}

function generateSectors(){
    //8x8 grid
    for(var i = 0; i < 64; i++){
        var newSector = new Sector();
        newSector.generate();

        sectors.push(newSector);
    }
}

function setupSectors(){
  for(var i = 0; i < 64; i++){
    sectors[i].setup();
  }
}
