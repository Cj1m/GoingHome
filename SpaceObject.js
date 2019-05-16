function SpaceObject(objID, quantity, pos){
    this.pos = pos;
    this.vel = createVector(0,0);
    this.size = 50;
    this.quantity = quantity;

    this.imgSet;
    this.realAnimationIndex = 0;
    this.animationIndex = 0;
    this.animationSpeed = 0.25;
    this.animated = false;
    this.rotationSpeed = random(-0.01,0.01);
    this.angle = 0;

    this.toDraw = false;
    this.name = "";


    switch(objID){
        case 0:
            //Asteroid
            this.name = "Asteroid";
            var r = random([1,2,3,4]);
            this.toDraw = true;
            this.imgSet = [loadImage("imgs/objects/asteroids/"+r+".png")];
            break;
        case 1:
            //Hydrogen
            this.name = "Hydrogen";
            break;
        case 2:
            //Iron
            this.name = "Iron";
            break;
        case 3:
            //Water
            this.name = "Water";
            break;
        case 4:
            //Dark Matter
            this.name = "Dark Matter";
            break;
        case 5:
            //Anti-Matter
            this.name = "Anti Matter";
            break;
        case 6:
            //Abandoned Ship
            this.name = "Abandoned Ship";
            break;
        case 7:
            //Black Hole
            this.name = "Black Hole";
            break;
        case 8:
            //Worm Hole
            this.name = "Worm Hole";
            break;
    }


    this.draw = function(){
        if(!this.toDraw) return;

        push();
            translate(this.pos.x, this.pos.y);
            imageMode(CENTER);

            rotate(this.angle);
            if(this.animated) this.animate();
            image(this.imgSet[this.animationIndex], 0, 0, this.size*this.quantity, this.size*this.quantity);
        pop();
    }

    this.animate = function(){
        this.realAnimationIndex += this.animationSpeed;
        this.animationIndex = Math.floor(this.realAnimationIndex) % this.imgSet.length;
    }


    this.update = function(dt){
        this.vel.mult(0.99);
        this.pos.add(this.vel);

        this.angle = (this.angle + this.rotationSpeed) % (2 * PI);
    }
}
