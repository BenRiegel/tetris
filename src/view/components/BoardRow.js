//----- imports ----------------------------------------------------------------

import { CELL_SIZE } from '../../config/config.js';
import Cell from './Cell.js';
import '../stylesheets/board-row.css';


//----- module code block ------------------------------------------------------

function BoardRow(props){

  function getStyle(){
    const top = props.row.position;
    const opacity = 1 - props.row.clearedPercent;
    return {
      transform: `translate(0px, ${top * CELL_SIZE}px`,
      opacity: `${opacity}`,
    };
  }

  return (
    <div className='board-row' style={ getStyle() }>
      {
        props.row.cells.map( (cell,i) => {
          return (
            <Cell key={i} cell={cell} />
          );
        })
      }
    </div>
  );

}


//----- export code block ------------------------------------------------------

export default BoardRow;



/*function useBoardRow(index){
  const positionListener = useRef();
  const clearingListener = useRef();
  function setPositionListener(listener){
    positionListener.current = listener;
  }
  function setClearingListener(listener){
    clearingListener.current = listener;
  }
  function handlePositionChange(newValue){
    positionListener.current(newValue);
  }
  function handleClearedChange(newValue){
    clearingListener.current(newValue);
  }
  const boardRow = boardRowsStore.value[index];
  const boardRowPosition = boardRow.position;
  const boardRowClearedPercent = boardRow.clearedPercent;
  useEffect( ()=>{
    boardRowPosition.subscribe(handlePositionChange);
    boardRowClearedPercent.subscribe(handleClearedChange)
    return () =>{
      boardRowPosition.unsubscribe(handlePositionChange);
      boardRowClearedPercent.unsubscribe(handleClearedChange);
    };
  })
  return [setClearingListener, setPositionListener];
}*/

//import { useRef, useEffect } from 'react';
//import { useStore } from '../../lib/hooks.js';
//import { default as boardRowsStore } from '../../state/board-rows.js';
//let rowContainer = useRef();

//const [onClearingChange, onPositionChange] = useBoardRow(props.index);
/*const store = boardRowsStore.value[props.index];
const boardRow = useState(store);

onPositionChange( (row)=>{
  const translateStr = `translate(0px, ${row * CELL_SIZE}px`;
  rowContainer.current.style.transform = translateStr;
});

onClearingChange( (newValue)=>{
  rowContainer.current.style.opacity = `${1 - newValue}`;
});*/

//console.log(props.row);

//not sure why this is needed
/*useEffect( ()=>{
  const row = props.row.position.value;
  rowContainer.current.style.transform = `translate(0px, ${row * CELL_SIZE}px`;
  rowContainer.current.style.opacity = '1';
});*/
