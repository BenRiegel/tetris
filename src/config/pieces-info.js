//----- module code block ------------------------------------------------------

const piece0 = {
  cells: [ [0, 0, 0, 0],
           [1, 1, 1, 1],
           [0, 0, 0, 0],
           [0, 0, 0, 0] ],
  coords: {row:-1, column:3},
};

const piece1 = {
  cells: [ [1, 1],
           [1, 1] ],
  coords: {row:0, column:4}
};

const piece2 = {
  cells: [ [0, 1, 0],
           [1, 1, 1],
           [0, 0, 0] ],
  coords: {row:0, column:3},
};

const piece3 = {
  cells: [ [1, 0, 0],
           [1, 1, 1],
           [0, 0, 0] ],
  coords: {row:0, column:3},
};

const piece4 = {
  cells: [ [0, 0, 1],
           [1, 1, 1],
           [0, 0, 0] ],
  coords: {row:0, column:3},
};

const piece5 = {
  cells: [ [0, 1, 1],
           [1, 1, 0],
           [0, 0, 0] ],
  coords: {row:0, column:3},
};

const piece6 = {
  cells: [ [1, 1, 0],
           [0, 1, 1],
           [0, 0, 0] ],
  coords: {row:0, column:3},
};

const piecesInfo = [piece0, piece1, piece2, piece3, piece4, piece5, piece6];

function getRandomPieceIndex(){
  const numPieces = piecesInfo.length;
  return Math.floor(Math.random() * numPieces);
}


//----- export code block ------------------------------------------------------

export default piecesInfo;

export { getRandomPieceIndex };
