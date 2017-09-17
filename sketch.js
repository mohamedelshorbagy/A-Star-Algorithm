/*

  # Mohamed Elshorbagy
  # 17 / 9 / 2017
  # Visulaizing A* Algorithm
  # Library Used : P5

*/ 

// Declaring Global Variables
var rows = 50;
var cols = 50;
var grid = new Array(cols);

var w , h;


// Variables Important for Algorithm
var openSet = [];
var closedSet = [];
var start , end;


var path = [];

var failure = false;




function setup() {
createCanvas(400 , 400);


w = width / cols;
h = height / rows;

for(var i = 0 ; i < grid.length ; i++) {
    grid[i] = new Array(rows);
}



for(var i = 0 ; i < cols ;i++) {
  for(var j = 0 ; j < rows ; j++) {

    grid[i][j] = new Spot(i , j , w);
    
  }

}


for(var i = 0 ; i < cols ;i++) {
  for(var j = 0 ; j < rows ; j++) {

    grid[i][j].addNeighbours(grid);
    
  }

}

start = grid[0][0];
end = grid[cols - 1][rows - 1];


start.wall = false;
end.wall = false;

openSet.push(start);



}


function draw() {


  if(openSet.length > 0) {
    var winner = 0;
    for(var i = 0 ; i < openSet.length ;i++) {
      if(openSet[i].f < openSet[winner].f) {
        winner = i;

      }
    }
      var current = openSet[winner];

      if(current === end) {
        console.log('DONE');
        noLoop();

      }
      

      removeElementFromArray(openSet , current);
      closedSet.push(current);


      var neighbours = current.neighbours;
      
      for(var i = 0 ; i < neighbours.length;i++) {
        var n = neighbours[i];

        // If ClosedSet Doesn't Have Current Element
        if(!closedSet.includes(n) && !n.wall) {
          var tempG = current.g + heuristic(n , current);

          var newPath = false;
          // If OpenSet Have that Element
          if(openSet.includes(n)) {

                if(tempG < n.g){
                  n.g = tempG;
                  newPath = true;
                }




          } else {
            n.g = tempG;
            openSet.push(n);
            newPath = true;

          }

          if(newPath) {
              n.h = heuristic(n , end);
              n.f = n.h + n.g;
              n.previous = current;
          }





        }

        







      }
      

  } 
  
  // End of if openset
  
  
  else {
    console.log('No Solution');
    noLoop();
    return;
  }







  background(51);

  for(var i = 0 ; i < cols ; i++) {
    for(var j = 0 ; j < rows ; j++) {


      grid[i][j].show();
      
    }

  }





  // Tracking OpenSet

  // for(var i = 0 ; i < openSet.length ; i++) {

  //   //openSet[i].show(color(52 , 220 , 120 , 70));

  // } 



  // // Trackin ClosedSet

  // for(var i = 0 ; i < closedSet.length ; i++) {

  //   //closedSet[i].show(color(231 , 70 , 67 , 70));


  // }


    // Tracking Path
    path = [];
    var temp = current;
    path.push(temp);
    while (temp.previous) {
      path.push(temp.previous);
      temp = temp.previous;
    }

  // for(var i = 0 ; i < path.length ; i++) {
  //   //path[i].show(color(52 , 52 , 220));
  // }


  noFill();
  stroke(52 , 152 , 219);
  strokeWeight(w / 2);
  beginShape();
  for(var i = 0 ; i < path.length;i++) {
    vertex(path[i].x * w + w / 2 , path[i].y * h + h / 2);
    
  }

  endShape();



}






// Functions 


function removeElementFromArray(arr , elm) {
  for(var i = arr.length - 1; i >= 0 ; i--) {

    if(arr[i] == elm) {

      arr.splice(i , 1);

    }

  }

}



function heuristic(a , b) {

  // var d = dist(a.x , a.y , b.x , b.y);
   var d = abs(a.x - b.x) + abs( a.y - b.y);

  return d;

}