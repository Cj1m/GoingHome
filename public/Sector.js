function Sector(){
    this.objects = [];

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

    this.loadObjects = function(spaceObjects){
        for(var i = 0; i < spaceObjects.length; i++){
            var obj = new SpaceObject(spaceObjects[i]);
            obj.preload();
            this.objects.push(obj);
        }
    }
}
