function PolygonGenerator(){
  this.generate = function(image, size){
    polyPoints = this.getPolygonPoints(image);
    var translationVec = createVector(-size/2,-size/2)
    for(var i = 0; i < polyPoints.length; i++){
      polyPoints[i].add(translationVec);
    }

    return (new Polygon(polyPoints));
  }

  this.getPolygonPoints = function(image){
    image.loadPixels();
    var pixels = image.pixels;

    var polygonPoints = [];
    for(var x = 0; x < image.width; x++){
      for(var y = 0; y < image.height; y++){
        var alphaIndex = 4 * (x + y * image.width) + 3;
        var alpha = pixels[alphaIndex];

        if(alpha != 0){
            if(x > 0){
              if(!this.pixelAt((x-1), y, image)){
                polygonPoints.push(createVector(x,y));
                continue;
              }
            }

            if(x < image.width - 1){
              if(!this.pixelAt((x+1), y, image)){
                polygonPoints.push(createVector(x,y));
                continue;
              }
            }

            if(y > 0){
              if(!this.pixelAt(x, (y-1), image)){
                polygonPoints.push(createVector(x,y));
                continue;
              }
            }

            if(y < image.height - 1){
              if(!this.pixelAt(x, (y+1), image)){
                polygonPoints.push(createVector(x,y));
                continue;
              }
            }
        }
      }
    }

    return polygonPoints;
  }

  this.pixelAt = function(x,y,image){
    var alphaIndex = 4 * (x + y * image.width) + 3;
    return (image.pixels[alphaIndex] != 0);
  }
}
