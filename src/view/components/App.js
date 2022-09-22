import { useState } from 'react';
import { useOnMount } from '../../lib/hooks.js';
import state from '../../state/state.js';
import { startAction, pauseAction, restartAction, startOverAction } from '../../controller/actions.js';
import Board from '../../view/components/Board.js';
import GamePiece from '../../view/components/GamePiece.js';
import CountDown from '../../view/components/CountDown.js';
import NextPiece from '../../view/components/NextPiece.js';
import Stats from '../../view/components/Stats.js';
import Button from '../../view/components/Button.js';
import '../stylesheets/app.css';


//----- export code block ------------------------------------------------------

export default function App() {

  const [gameStatus, setGameStatus] = useState(state.gameStatus);  //<<--- is this waht I want?
  const onMountDo = useOnMount();

  onMountDo( ()=>{
    state.onPropChange('gameStatus', setGameStatus);
  });

  function renderCountDown(){
    if (gameStatus === 'starting'){
      return ( <CountDown onFinish={startAction}/> );
    }
  }

  function renderPause(){
    if (gameStatus === 'paused'){
      //return ( <GameOver /> );
    }
  }

  function renderGameOver(){
    if (gameStatus === 'game-over'){
      console.log('game over!')
      //return ( <GameOver /> );
    }
  }

  function renderButton(){
    if (gameStatus === 'started'){
      return ( <Button onClick={pauseAction} text='Pause' /> );
    }
    if (gameStatus === 'paused'){
      return ( <Button onClick={restartAction} text='Restart' /> );
    }
    if (gameStatus === 'game-over'){
      return ( <Button onClick={startOverAction} text='Start Over' /> );
    }
  }

  return (
    <div className='app'>
      <div className='left-section'>
        <div className='game'>
          <Board />
          <GamePiece />
        </div>
        { renderCountDown() }
        { renderPause() }
        { renderGameOver() }
      </div>
      <div className='right-section'>
        <NextPiece/>
        <Stats/>
        { renderButton() }
      </div>
    </div>
  );
}
