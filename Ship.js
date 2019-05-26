function Ship(){
    this.imgSet = [];

    this.IMGS_TURN_LEFT = [];
    this.IMGS_TURN_RIGHT = [];
    this.IMGS_ZOOM = [];
    this.IMGS_IDLE = [];
    this.realAnimationIndex = 0;
    this.animationIndex = 0;
    this.animationSpeed = 0.25;

    this.sector = 0;
    this.pos = 0;
    this.vel = 0;
    this.size = 80;

    this.hull = 15;
    this.IMGS_HULL = [];

    this.engine = 3;

    this.angle = 0;
    this.rotationSpeed = 0.1;
    this.accelerating = false;

    this.polygon = [];

    this.preload = function(){
      this.IMGS_IDLE = [loadImage("imgs/ship.png")];

      this.IMGS_ZOOM = this.loadImages("imgs/ship_forward/",8);
      this.IMGS_TURN_LEFT = this.loadImages("imgs/ship_left/",8);
      this.IMGS_TURN_RIGHT = this.loadImages("imgs/ship_right/",8);
      this.IMGS_HULL = this.loadImages("imgs/ui/hull/",16);

      this.imgSet = this.IMGS_ZOOM;
    }

    this.setup = function(){
        this.pos = createVector(width/2,height - 30);
        this.vel = createVector(0,0);

        this.fixImagesSize(this.IMGS_IDLE);
        this.fixImagesSize(this.IMGS_ZOOM);
        this.fixImagesSize(this.IMGS_TURN_LEFT);
        this.fixImagesSize(this.IMGS_TURN_RIGHT);

        this.polygon = new PolygonGenerator().generate(this.IMGS_IDLE[0], this.size);
    }

    this.update = function(dt, spaceObjects){
        this.vel.mult(0.99);

        this.collision(spaceObjects);

        this.pos.add(this.vel);

        this.keyDown();
    }

    this.draw = function(){
        push();
            //UI should be its own class but I'm lazy
            image(this.IMGS_HULL[this.hull], 10, height - 61 , 204,61);

            translate(this.pos.x, this.pos.y);

            imageMode(CENTER);

            rotate(this.angle);
            this.animate();

            image(this.imgSet[this.animationIndex], 0, 0);

        pop();
    }

    this.animate = function(){
        this.realAnimationIndex += this.animationSpeed;
        this.animationIndex = Math.floor(this.realAnimationIndex) % this.imgSet.length;
    }

    this.keyDown = function(){
        if (keyIsDown(LEFT_ARROW)) {
            this.imgSet = this.IMGS_TURN_LEFT;
            this.angle -= this.rotationSpeed;
        } else if (keyIsDown(RIGHT_ARROW)) {
            this.imgSet = this.IMGS_TURN_RIGHT;
            this.angle += this.rotationSpeed;
        } else if (keyIsDown(UP_ARROW)){
            this.zoom();
        }else{
            this.accelerating = false;
            this.imgSet = this.IMGS_IDLE;
        }

        this.angle = this.angle % (2 * PI);
    }

    this.zoom = function(){
        this.accelerating = true;
        this.imgSet = this.IMGS_ZOOM;

        var topSpeed = this.engine * 2;
        var currentSpeed = this.vel.mag();
        if(currentSpeed < topSpeed){
            acceleration = this.engine * 0.1;
            accelerationVec = createVector(acceleration * sin(this.angle), -acceleration * cos(this.angle));
            this.vel.add(accelerationVec);
        }
    }

    this.collision = function(spaceObjects){
      var transShipPoly = this.polygon.getTranslatedPoly(this.angle, this.pos);
      for(var i = 0; i < spaceObjects.length; i++){
        var transSpacePoly = spaceObjects[i].getTranslatedPoly();
        hit = collidePolyPoly(transShipPoly,transSpacePoly,true);
        if(hit){
          this.vel.mult(-1);
        }
      }
    }


    this.loadImages = function(path, images){
      var imageArr = [];
      for(var i = 1; i <= images; i++){
          imageArr.push(loadImage(path+i+".png"));
      }
      return imageArr;
    }

    this.fixImagesSize = function(imageArr){
      for(var i = 0; i < imageArr.length; i++){
        imageArr[i].resize(this.size, this.size);
      }
    }
}
