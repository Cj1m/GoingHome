//These variables are public and can be accessed throughout
var ship;
var ui;
var map;
var network;
var imageLoader;

var sectors = [];
var lasers = [];
var canvas;

var players = {};

function preload(){
  generateSectors(64);
  imageLoader = new ImageLoader();
  imageLoader.preload();
  ship = new Ship();
}

function prepare(data){
    for(var i = 0 ; i < sectors.length; i++){
        sectors[i].loadObjects(data.sectors[i].spaceObjects);
    }
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  imageLoader.setup(ship.size);
  network = new Network();
  ship.setup(network, imageLoader);
  ui = new UI(ship, imageLoader);
  map = new Map(128, sectors.length);
}

function draw() {
    var deltaTime = window.performance.now() - canvas._pInst._lastFrameTime;

    background(11);

    sectors[ship.sector].draw();
    sectors[ship.sector].update(deltaTime);

    drawOtherPlayers();

    ship.draw();
    ship.update(deltaTime,sectors[ship.sector].objects);

    map.draw();
    ui.draw();

    warp();
}

function drawOtherPlayers(){
    for(id in players){
        if(players[id].sector == ship.sector){
            players[id].draw();
        }
    }
}

function serverUpdate(data){
    serverPlayers = data.players;
    for(let id in serverPlayers){
        if(!(id in players)){
            players[id] = new Ship();
            players[id].setup(null, imageLoader);
        }

        players[id].updateFromServer(serverPlayers[id]);
    }
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

function generateSectors(mapSize){
    for(var i = 0; i < mapSize; i++){
        var newSector = new Sector();
        sectors.push(newSector);
    }
}
