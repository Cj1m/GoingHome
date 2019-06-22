function Sector(){
    this.objects = [];

    this.setup = function(){
      for(var i = 0; i < this.objects.length; i++){
        var randPos = createVector(random(width), random(height));
        this.objects[i].setup(randPos);
      }
    }

    this.draw = function(){
        for(var i = 0; i < this.objects.length; i++){
            this.objects[i].draw();
        }
    }

    this.update = function(dt){
        for(var i = 0; i < this.objects.length; i++){
            this.objects[i].update();
        }
    }

    this.generate = function(){
        //var n = random([1,2,3,4,5,6,7,8,9]);
        var n = 9;
        for(var i = 0; i < n; i++){
            var randID = Math.floor(random(0, 1));
            var randQuant = random([1,1,1,1,2,2,3]);

            var obj = new SpaceObject(randID, randQuant);
            obj.preload();
            this.objects.push(obj);
        }
    }
}
