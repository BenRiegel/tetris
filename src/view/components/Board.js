//----- imports ----------------------------------------------------------------

import boardRowsStore from '../../state/board-rows.js';
import { useStore } from '../../lib/hooks.js';
import BoardRow from './BoardRow';
import '../stylesheets/board.css';


//----- module code block ------------------------------------------------------

function Board(){

  const boardRows = useStore(boardRowsStore);

  return (
    <div className='board'>
      {
        boardRows.map( (row,i) => {
          return (
            <BoardRow key={i} index={i} row={row}/>
          );
        })
      }
    </div>
  );
}


//----- export code block ------------------------------------------------------

export default Board;
