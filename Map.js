function Map(size, sectors){
        this.size = size;
        this.sectors = sectors;
        this.boxes = [];
        this.explored = [0];
        this.playerIn = 0;

        this.boxSize = this.size / sqrt(this.sectors)

        console.log((width - this.size));
        this.draw = function(){
            push();
            translate((width - this.size) - 10, (height - this.size) - 10);
            stroke(255);

            for(var i = 0; i < this.sectors; i++){
                var gridx = i % 8;
                var gridy = floor(i / 8);

                var x = (gridx * this.boxSize);
                var y = (gridy * this.boxSize);

                if(i == this.playerIn){
                    fill('rgb(0,255,0)');
                }else if(this.explored.includes(i)){
                    fill('rgb(200,200,200)');
                }else{
                    fill('rgb(0,0,0)');
                }

                square(x,y, this.boxSize);
            }
            pop();
        }

        this.enter = function(sector){
          this.playerIn = sector;
          if(!this.explored.includes(sector)){
            this.explored.push(sector);
          }
        }

}
