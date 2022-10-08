//----- imports ----------------------------------------------------------------

import { CELL_SIZE } from '../../config/config.js';
import '../stylesheets/next-piece.css';


//----- module code block ------------------------------------------------------

const NUM_ROWS = 4;
const NUM_COLUMNS = 6;

const style = {
  width:`${CELL_SIZE * NUM_COLUMNS}px`,
  height:`${CELL_SIZE * NUM_ROWS}px`
}

function NextPieceContainer(props){
  return (
    <div className='next-piece' style={style}>
      { props.children }
    </div>
  );
}


//----- export code block ------------------------------------------------------

export default NextPieceContainer;
