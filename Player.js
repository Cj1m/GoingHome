function Player(id){
    this.id = id;
    this.pos = {x: 0, y: 0};
    this.vel = {x: 0, y: 0};
    this.sector = 0;
    this.angle = 0;
    this.image = 'idle';

    this.update = function(data){
        this.pos = data.pos;
        this.vel = data.vel;
        this.sector = data.sector;
        this.angle = data.angle;
        this.image = data.image;
    }
}

module.exports = Player;


