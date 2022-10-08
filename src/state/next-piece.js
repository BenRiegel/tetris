//----- imports ----------------------------------------------------------------

import Store from '../lib/store.js';
import piecesInfo from '../config/pieces-info.js';
import { getRandomPieceIndex } from '../config/pieces-info.js';


//----- module code block ------------------------------------------------------

function convertSchemaToCells(cellSchema, pieceIndex){
  return cellSchema.map( row => {
    return row.map( isCell => {
      if (isCell){
        return {hasContent:true, type:pieceIndex};
      } else {
        return {hasContent:false};
      }
    });
  });
}

function createCells(pieceIndex){
  const cellsSchema = piecesInfo[pieceIndex].cells;
  return convertSchemaToCells(cellsSchema, pieceIndex);
}

function getCoords(pieceIndex){
  return piecesInfo[pieceIndex].coords;
}

function createNextPiece(){
  const index = getRandomPieceIndex();
  const cells = createCells(index);
  const coords = getCoords(index);
  return { cells, coords };
}


class NextPieceStore extends Store {
  constructor(initValue){
    super(initValue);
  }
  reset(){
    const newValue = createNextPiece();
    this.update(newValue);
  }
}

const initValue = createNextPiece();
let nextPieceStore = new NextPieceStore(initValue);


//----- export code block ------------------------------------------------------

export default nextPieceStore;
