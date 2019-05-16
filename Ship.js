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
    this.pos = createVector(width/2,height - 30);
    this.vel = createVector(0,0);
    this.size = 80;

    this.hull = 100;

    this.engine = 3;

    this.angle = 0;
    this.rotationSpeed = 0.1;
    this.accelerating = false;

    this.setup = function(){
        this.IMGS_IDLE = [loadImage("imgs/ship.png")];

        for(var i = 1; i <= 8; i++){
            this.IMGS_ZOOM.push(loadImage("imgs/ship_forward/"+i+".png"));
            this.IMGS_TURN_LEFT.push(loadImage("imgs/ship_left/"+i+".png"));
            this.IMGS_TURN_RIGHT.push(loadImage("imgs/ship_right/"+i+".png"));
        }

        this.imgSet = this.IMGS_ZOOM;
    }

    this.update = function(dt){
        this.vel.mult(0.99);

        this.pos.add(this.vel);

        this.keyDown();
    }

    this.draw = function(){
        push();
            translate(this.pos.x, this.pos.y);
            imageMode(CENTER);

            rotate(this.angle);
            this.animate();
            image(this.imgSet[this.animationIndex], 0, 0, this.size, this.size);
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
}
