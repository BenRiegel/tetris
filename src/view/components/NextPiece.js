import { useState } from 'react';
import { useOnMount } from '../../lib/hooks.js';
import state from '../../state/state.js';
import Piece from './Piece.js';
import { cellSize, nextPieceDimensions  } from '../../config/config.js';
import '../stylesheets/next-piece.css';



export default function NextPiece(){

  const [piece, setPiece] = useState(state.nextPiece);
  const onMountDo = useOnMount();

  onMountDo( ()=>{
    state.onPropChange('nextPiece', setPiece);
  });


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

  function renderPiece(){
    if (piece){
      let clippedCells = removeEmptyRows(piece.cells);
      return (
        <Piece cells={clippedCells} />
      );
    }
  }

  let { numRows, numColumns } = nextPieceDimensions;
  const style = {
    width:`${cellSize * numColumns}px`,
    height:`${cellSize * numRows}px`
  }

  return (
    <div className='next-piece' style={style}>
      { renderPiece() }
    </div>
  );
}
