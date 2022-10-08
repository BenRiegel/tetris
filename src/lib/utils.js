//----- module code block ------------------------------------------------------

function wait(time){
  return new Promise( resolve =>{
    setTimeout(resolve, time);
  } );
}

function nextAnimationFrame(){
  return new Promise( resolve =>{
    requestAnimationFrame(resolve);
  } );
}

function flipMatrixLeft(matrix){
  return matrix[0].map((val, index) => matrix.map(row => row[row.length-1-index]));
}

function flipMatrixRight(matrix){
  return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
}

function create2dArray( {numRows, numColumns}, callback){
  let rows = [];
  for (let i = 0; i < numRows; i++){
    let newRow = [];
    for (let j = 0; j < numColumns; j++){
      const value = callback(i, j);
      newRow.push(value);
    }
    rows.push(newRow);
  }
  return rows;
}

function doForEach(array, callback){
  for (let i = 0; i < array.length; i++){
    for (let j = 0; j < array[i].length; j++){
      const cell = array[i][j];
      callback(cell, i, j);
    }
  }
}


//----- export code block ------------------------------------------------------

export { wait,
         nextAnimationFrame,
         flipMatrixLeft,
         flipMatrixRight,
         create2dArray,
         doForEach };
