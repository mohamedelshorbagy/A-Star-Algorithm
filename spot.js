function Spot(i , j , w) {
    this.x = i;
    this.y = j;
    this.w = w;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbours = [];
    this.previous = undefined;
    this.wall = false;

    // Percantage of wall be true

    if(random(1) < 0.2) {
        this.wall = true;

    }

    // Functions for Constructor

    this.show = function(rgbOfColor) {
        if(this.wall) {
            fill(255);
            noStroke();
            ellipse(this.x * w + w / 2, this.y * h + h / 2, w / 2, h / 2);
        } if(rgbOfColor) {
            fill(rgbOfColor);
            rect(this.x * w , this.y * h , w, h);
        }
    }

    this.addNeighbours = function(grid) {

        if(this.x > 0) {
            this.neighbours.push(grid[this.x - 1][this.y]);

        }
        if(this.x < cols - 1) {
            this.neighbours.push(grid[this.x + 1][this.y]);

        }

        if(this.y > 0) {
            this.neighbours.push(grid[this.x][this.y - 1]);



        }
        if(this.y < rows - 1) {
            this.neighbours.push(grid[this.x][this.y + 1]);

        }

        if(this.x > 0 && this.y > 0) {

           this.neighbours.push(grid[this.x - 1][this.y - 1]); 
        }
        
        if(this.x > 0 && this.y < rows - 1) {

           this.neighbours.push(grid[this.x - 1][this.y + 1]); 
        }
        
        if(this.x < cols - 1 && this.y > 0) {

           this.neighbours.push(grid[this.x + 1][this.y - 1]); 
        }
        
        if(this.x < cols - 1 && this.y < cols - 1) {

           this.neighbours.push(grid[this.x + 1][this.y + 1]); 
        }




    }

}