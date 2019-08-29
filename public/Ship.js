function Ship(){
    this.id = "DEFINED BY SERVER";
    this.sketch = [];

    this.imgSet = [];
    this.IMGS = {};
    this.realAnimationIndex = 0;
    this.animationIndex = 0;
    this.animationSpeed = 0.25;

    this.sector = 0;
    this.pos = 0;
    this.vel = 0;
    this.size = 80;

    this.hull = 15;
    this.engine = 3;

    this.angle = 0;
    this.rotationSpeed = 0.1;
    this.accelerating = false;

    this.polygon = [];

    this.combatLaserReady = true;
    this.combatLaserFireRate = 3;
    this.network = null;
    this.toDraw = false;

    this.setup_images = function(imageLoader){
      this.IMGS.idle = imageLoader.SHIP_IMGS_IDLE;
      this.IMGS.zoom = imageLoader.SHIP_IMGS_ZOOM;
      this.IMGS.left = imageLoader.SHIP_IMGS_TURN_LEFT;
      this.IMGS.right = imageLoader.SHIP_IMGS_TURN_RIGHT;
      this.imgSet = this.IMGS.idle;
    }

    this.setup = function(network, imageLoader){
        this.setup_images(imageLoader);

        this.pos = createVector(width/2,height - 30);
        this.vel = createVector(0,0);
        this.network = network;

        this.polygon = new PolygonGenerator().generate(this.IMGS.idle[0], this.size);
        this.toDraw = true;
    }

    this.update = function(dt, spaceObjects){
        this.vel.mult(0.99);

        this.collision(spaceObjects);

        this.pos.add(this.vel);

        this.network.sendPlayerData(this.getData());

        this.keyDown();
    }

    this.draw = function(){
        if(!this.toDraw) return;

        this.drawLasers();
        push();
            translate(this.pos.x, this.pos.y);

            imageMode(CENTER);

            rotate(this.angle);
            this.animate();

            image(this.imgSet[this.animationIndex], 0, 0);
            //this.polygon.draw();
        pop();
    }

    this.animate = function(){
        this.realAnimationIndex += this.animationSpeed;
        this.animationIndex = Math.floor(this.realAnimationIndex) % this.imgSet.length;
    }

    this.keyDown = function(){
        if (keyIsDown(LEFT_ARROW)) {
            this.imgSet = this.IMGS.left;
            this.angle -= this.rotationSpeed;
        } else if (keyIsDown(RIGHT_ARROW)) {
            this.imgSet = this.IMGS.right;
            this.angle += this.rotationSpeed;
        } else if (keyIsDown(UP_ARROW)){
            this.zoom();
        }else{
            this.accelerating = false;
            this.imgSet = this.IMGS.idle;
        }

        //Lasers
        if(keyIsDown(70)){
          //F - combat laser
          this.fireCombatLaser();
        }else if(keyIsDown(69)){
          //E - mining laser
        }

        this.angle = this.angle % (2 * PI);
    }

    this.fireCombatLaser = function(){
      if(this.combatLaserReady){
        this.combatLaserReady = false;
        lasers.push(new CombatLaser(this.id, this.angle, this.pos, 0, this.sector));
        var self = this;
        setTimeout(function(){self.combatLaserReady = true;}, 1000 / this.combatLaserFireRate);
      }
    }

    this.zoom = function(){
        this.accelerating = true;
        this.imgSet = this.IMGS.zoom;

        var topSpeed = this.engine * 2;
        var currentSpeed = this.vel.mag();
        if(currentSpeed < topSpeed){
            acceleration = this.engine * 0.1;
            accelerationVec = createVector(acceleration * sin(this.angle), -acceleration * cos(this.angle));
            this.vel.add(accelerationVec);
        }
    }

    this.takeDamage = function(damage){
      if(Math.floor(this.hull - damage) > 0){
        this.hull = Math.floor(this.hull - damage);
      }else{
        this.hull = 0;
        window.location.href = 'https://youtu.be/fpK36FZmTFY?t=76';
      }
    }

    this.collision = function(spaceObjects){
      var transShipPoly = this.polygon.getTranslatedPoly(this.angle, this.pos);
      for(var i = 0; i < spaceObjects.length; i++){
        var transSpacePoly = spaceObjects[i].getTranslatedPoly();
        if(!transSpacePoly) continue;
        hit = collidePolyPoly(transShipPoly,transSpacePoly,true);
        if(hit){
          this.takeDamage(1 + Math.floor(0.4 * this.vel.mag()));
          this.vel.mult(-1);
        }
      }
    }

    this.drawLasers = function(){
      var toBeRemoved = [];
      for(var i = 0; i < lasers.length; i++){
        if(lasers[i].sector == this.sector){
          lasers[i].draw();
        }else{
          lasers[i].update();
        }

        if(lasers[i].offScreen()){
          toBeRemoved.push(i);
        }
      }

      for(var i = 0; i < toBeRemoved.length; i++){
        lasers.splice(toBeRemoved[i],1);
      }
    }

    this.getData = function(){
        var currentImage = null;
        if(this.imgSet == this.IMGS.idle){
            currentImage = 'idle';
        }else if (this.imgSet == this.IMGS.zoom){
            currentImage = 'zoom';
        }else if (this.imgSet == this.IMGS.right){
            currentImage = 'right';
        }else if (this.imgSet == this.IMGS.left){
            currentImage = 'left';
        }
        return {
          'id': this.id,
          'pos': {
              'x': this.pos.x,
              'y': this.pos.y
          },
          'vel': {
              'x': this.vel.x,
              'y': this.vel.y
          },
          'sector': this.sector,
          'angle': this.angle,
          'image': currentImage
        };
    }

    this.updateFromServer = function(data){
        this.pos = createVector(data.pos.x, data.pos.y);
        this.vel = createVector(data.vel.x, data.vel.y);
        this.sector = data.sector;
        this.angle = data.angle;
        this.imgSet = this.IMGS[data.image];
    }
}
