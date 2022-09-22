import { cellSize } from '../../config/config.js';
import '../stylesheets/cell.css';


export default function Cell( {cell} ){

  const style = {
    width:`${cellSize}px`,
    height:`${cellSize}px`
  }

  let classes = ['cell'];
  if (cell.hasContent){
    classes.push(`cell-type-${cell.type}`);
  } else {
    classes.push('hidden');
  }

  let classNames = classes.join(' ');

  return (
    <div className={classNames} style={style}></div>
  );
}
