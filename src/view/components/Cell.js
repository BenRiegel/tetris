//----- imports ----------------------------------------------------------------

import { CELL_SIZE } from '../../config/config.js';
import '../stylesheets/cell.css';


//----- module code block ------------------------------------------------------

const style = {
  width:`${CELL_SIZE}px`,
  height:`${CELL_SIZE}px`
}

function Cell( {cell} ){
  let classes = ['cell'];
  if (cell.hasContent){
    classes.push(`cell-type-${cell.type}`);
  } else {
    classes.push('hidden');
  }
  const classNames = classes.join(' ');
  return (
    <div className={classNames} style={style}></div>
  );
}


//----- export code block ------------------------------------------------------

export default Cell;
