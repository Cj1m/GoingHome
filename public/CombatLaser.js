function CombatLaser(shipID, angle, pos, type, sector){
  this.type = type;
  this.shipID = shipID;
  this.pos = pos.copy();
  this.oldPos = pos.copy();

  this.vel = p5.Vector.fromAngle(angle - PI/2, 20);
  this.sector = sector;

  this.draw = function(){
    push();
    this.update();
    stroke('rgb(255,0,0)');
    strokeWeight(4);
    line(this.oldPos.x, this.oldPos.y, this.pos.x, this.pos.y);
    pop();
  }

  this.update = function(){
    this.oldPos = this.pos.copy();
    this.pos.add(this.vel);
  }

  this.offScreen = function(){
    return this.pos.x > width || this.pos.x < 0
            || this.pos.y > height || this.pos.y < 0;
  }

}
