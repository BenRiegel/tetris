//----- imports ----------------------------------------------------------------

import { useState } from 'react';
import '../../controllers/controller.js';
import { default as statusStore } from '../../state/status.js';
import * as actions from '../../controllers/state-controller.js';
import { useStore } from '../../lib/hooks.js';
import Board from './Board.js';
import Home from './Home.js';
import HighScores from './HighScores.js';
import GamePiece from './GamePiece.js';
import CountDown from './CountDown.js';
import GameOver from './GameOver.js';
import Instructions from './Instructions.js';
import NextPieceContainer from './NextPieceContainer.js';
import NextPiece from './NextPiece.js';
import Stats from './Stats.js';
import Button from './Button.js';
import '../stylesheets/app.css';


//----- module code block ------------------------------------------------------

function App(){

  const gameStatus = useStore(statusStore);
  const [page, setPage] = useState('home');

  function goToHome(){
    setPage('home')
  }
  function goToGame(){
    setPage('game');
  }

  function goToInstructions(){
    setPage('instructions');
  }

  function goToScores(){
    setPage('high-scores');
  }

  function renderHome(){
    if (page === 'home'){
      return (
        <Home onStartClick={goToGame}
              onInstructionsClick={goToInstructions}
              onScoresClick={goToScores}/>
      );
    }
  }

  function renderHighScores(){
    if (page === 'high-scores'){
      return (
        <HighScores onClick={goToHome}/>
      )
    }
  }

  function renderInstructions(){
    if (page === 'instructions'){
      return (
        <Instructions onClick={goToHome}/>
      );
    }
  }

  function renderCountDown(){
    if (page === 'game' && gameStatus === 'starting'){
      return ( <CountDown onFinish={actions.startGame}/> );
    }
  }

  function renderPause(){
    if (page === 'game' && gameStatus === 'paused'){
      //return ( <Pause /> );
    }
  }

  function renderGameOver(){
    if (page === 'game' && gameStatus === 'game-over'){
      return ( <GameOver /> );
    }
  }

  function renderButton(){
    if (page === 'game' && gameStatus === 'started'){
      return ( <Button onClick={actions.pauseGame} text='Pause' /> );
    }
    if (page === 'game' && gameStatus === 'paused'){
      return ( <Button onClick={actions.restartGame} text='Restart' /> );
    }
    if (page === 'game' && gameStatus === 'game-over'){
      return ( <Button onClick={actions.startGameOver} text='Start Over' /> );
    }
  }

  function renderNextPiece(){
    if (page === 'game'){
      return ( <NextPiece /> );
    }
  }

  return (
    <div className='app'>
      <div className='left-section'>
        <div className='game'>
          <Board />
          <GamePiece />
        </div>
        { renderHome() }
        { renderInstructions() }
        { renderHighScores() }
        { renderCountDown() }
        { renderPause() }
        { renderGameOver() }
      </div>
      <div className='right-section'>
        <NextPieceContainer>
          { renderNextPiece() }
        </NextPieceContainer>
        <Stats/>
        { renderButton() }
      </div>
    </div>
  );
}


//----- export code block ------------------------------------------------------

export default App;
