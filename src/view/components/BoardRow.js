import { useState, useRef, useEffect } from 'react';
import { useOnMount } from '../../lib/hooks.js';
import Animator from '../../lib/animator.js';
import state from '../../state/state.js';
import Cell from './Cell.js';
import '../stylesheets/board-row.css';




export default function BoardRow(props){

  let animator = useRef( new Animator() );
  let rowContainer = useRef();
  const onMountDo = useOnMount();
  const initRow = state.board.cells[props.index];
  const [row, setRow] = useState(initRow);



  //clean all this up
  function doFadeOut(){
    const fullRows = state.board.animation.rows;
    if (fullRows.includes(props.index)){
      function fadeOut(progress){
        const opacity = 1 - progress;
        rowContainer.current.style.opacity = `${opacity}`;
      }
      return animator.current.go(fadeOut, 200);
    }
  }

  function doDrop(){
    const fallRows = state.board.animation.rows;
    const numRows = fallRows[props.index];
    if (numRows > 0){
      let startTop = props.index * 30;
      let endTop = (props.index + numRows) * 30;
      function fall(progress){
        let top = startTop + progress * (endTop - startTop);
        rowContainer.current.style.transform = `translate(0px, ${top}px`;
      }
      let duration = 100 * numRows;
      return animator.current.go(fall, duration);
    }
  }

  function handleRowChange(){
    if (state.board.animation){
      if (state.board.animation.type === 'fadeOut'){
        return doFadeOut();
      } else if (state.board.animation.type === 'fall'){
        return doDrop();
      }
    } else {
      let row = state.board.cells[props.index];
      setRow(row);
    }
  }

  onMountDo( ()=>{
    state.onPropChange('board', handleRowChange);
  });

  useEffect( ()=>{
    rowContainer.current.style.transform = `translate(0px, ${props.index*30}px`;
    rowContainer.current.style.opacity = '1';
  });

  return (
    <div className='board-row' ref={rowContainer}>
      {
        row.map( (cell,i) => {
          return (
            <Cell key={i} cell={cell} />
          );
        })
      }
    </div>
  );

}
