function Sector(){
    this.objects = [];

    this.setup = function(){
      for(var i = 0; i < this.objects.length; i++){
        this.objects[i].setup();
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

    this.generate = function(specs){
        console.log(specs.spaceObjects);

        for(var i = 0; i < specs.spaceObjects.length; i++){

            var obj = new SpaceObject(specs.spaceObjects[i]);
            obj.preload();
            this.objects.push(obj);
        }
    }
}
