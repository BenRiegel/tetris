//----- imports ----------------------------------------------------------------

import nextPieceStore from '../../state/next-piece.js';
import { useStore } from '../../lib/hooks.js';
import Piece from './Piece.js';


//----- module code block ------------------------------------------------------

//don't like all this
function hasContentCell(row){
  return row.reduce( (prev, cell) => {
    return (cell.hasContent || prev);
  }, false);
}

function removeEmptyRows(cells){
  return cells.filter( row => {
    return hasContentCell(row);
  });
}

function NextPiece(){
  const nextPiece = useStore(nextPieceStore);
  const clippedCells = removeEmptyRows(nextPiece.cells);
  return (
    <Piece cells={clippedCells} />
  );
}


//----- export code block ------------------------------------------------------

export default NextPiece;
