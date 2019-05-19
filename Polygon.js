function Polygon(polyPoints){
  this.polyPoints = polyPoints;

  this.draw = function(){
    noFill();
    beginShape();
    for(var i = 0; i < this.polyPoints.length; i++){
      vertex(this.polyPoints[i].x, this.polyPoints[i].y);
    }
    endShape(CLOSE);
  }
}
