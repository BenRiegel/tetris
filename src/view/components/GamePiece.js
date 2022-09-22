import { useState, useRef } from 'react';
import { useOnMount } from '../../lib/hooks.js';
import state from '../../state/state.js';
import { cellSize } from '../../config/config.js';
import Animator from '../../lib/animator.js';
import Piece from './Piece.js';
import '../stylesheets/game-piece.css';



export default function Game(props){

  const [piece, setPiece] = useState(state.piece);   ///<--- do I want this here?
  const animator = useRef( new Animator() );
  const pieceContainer = useRef();
  const onMountDo = useOnMount();

  function handlePieceChange(newPiece){
    if (newPiece && newPiece.animation){
      function drop(progress){
        const startTop = newPiece.boardCoords.row * cellSize
        const top = startTop + progress * newPiece.animation.dist * cellSize;
        const left = newPiece.boardCoords.column * cellSize;
        pieceContainer.current.style.transform = `translate(${left}px, ${top}px`;
      }
      let duration = 20 * newPiece.animation.dist;
      return animator.current.go(drop, duration);
    } else {
      setPiece(newPiece);
    }
  }

  function handleGameStatusChange(newStatus){
    if (newStatus === 'paused'){
      animator.current.pause();
    } else if (newStatus === 'started'){
      animator.current.unpause();
    }
  }

  onMountDo( ()=>{
    state.onPropChange('piece', handlePieceChange);
    state.onPropChange('gameStatus', handleGameStatusChange);
  });

  function getTranslate( {row, column} ){
    const top = row * cellSize;
    const left = column * cellSize;
    return `translate(${left}px, ${top}px`;
  }

  function renderPiece(){
    if (piece){
      const translate = getTranslate(piece.boardCoords);
      pieceContainer.current.style.transform = translate;
      return (
        <Piece cells={piece.cells}/>
      );
    }
  }

  return(
    <div className='piece-container' ref={pieceContainer}>
      {renderPiece()}
    </div>
  );

}
