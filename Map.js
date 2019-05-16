function Map(size, sectors){
        this.size = size;
        this.sectors = sectors;
        this.boxes = [];
        this.explored = [0,1,8,9,2];
        this.playerIn = 0;

        this.boxSize = this.size / sqrt(this.sectors)

        console.log((width - this.size));
        this.draw = function(){
            push();
            translate((width - this.size) - 10, (height - this.size) - 10);
            stroke(255);

            for(var i = 0; i < this.sectors; i++){
                var gridx = floor(i / 8);
                var gridy = i % 8;

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


}
