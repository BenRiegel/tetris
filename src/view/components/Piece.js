//----- imports ----------------------------------------------------------------

import Cell from './Cell.js';
import '../stylesheets/piece.css';


//----- module code block ------------------------------------------------------

function Piece( {cells} ){
  return (
    <div className='piece'>
      {
        cells.map( (row, i) => {
          return (
            <div key={i} className= 'piece-row'>
              {
                row.map( (cell,j) => {
                  return (
                    <Cell key={j} cell={cell} />
                  );
                })
              }
            </div>
          );
        })
      }
    </div>
  );
}


//----- export code block ------------------------------------------------------

export default Piece;
