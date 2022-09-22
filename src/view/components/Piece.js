import Cell from './Cell.js';
import '../stylesheets/piece.css';



export default function Piece( {cells} ){
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
