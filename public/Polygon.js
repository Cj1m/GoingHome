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

  this.getTranslatedPoly = function(angle, pos){
    var rotatedTranslated = [];
    var translationVec = pos.copy();
    for(var i = 0; i < this.polyPoints.length; i++){
      rotatedTranslated[i] = this.polyPoints[i].copy();
      rotatedTranslated[i].rotate(angle);
      rotatedTranslated[i].add(translationVec);
    }

    return rotatedTranslated;
  }


  //Expirement
  this.drawTranslated = function(angle, pos){
    var trans = this.getTranslatedPoly(angle, pos);
    noFill();
    beginShape();
    for(var i = 0; i < trans.length; i++){
      vertex(trans[i].x, trans[i].y);
    }
    endShape(CLOSE);
  }

}
