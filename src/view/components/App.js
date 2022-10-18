//----- imports ----------------------------------------------------------------

import { useState } from 'react';
import '../../controllers/controller.js';
import { default as statusStore } from '../../state/status.js';
import * as actions from '../../controllers/state-controller.js';
import { useStore } from '../../lib/hooks.js';
import Title from './Title.js';
import Board from './Board.js';
import Home from './Home.js';
import Pause from './Pause.js';
import HighScoresPage from './HighScoresPage.js';
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
    actions.startGameOver();
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

  function quitGame(){
    actions.startGameOver();
    setPage('home');
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

  function renderHighScoresPage(){
    if (page === 'high-scores'){
      return (
        <HighScoresPage onClick={goToHome}/>
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
      return ( <Pause /> );
    }
  }

  function renderGameOver(){
    if (page === 'game' && gameStatus === 'game-over'){
      return ( <GameOver onClick={goToHome}/> );
    }
  }

  function renderPauseButton(){
    if (page === 'game' && gameStatus === 'started'){
      return ( <Button onClick={actions.pauseGame} text='Pause' /> );
    }
    if (page === 'game' && gameStatus === 'paused'){
      return ( <Button onClick={actions.restartGame} text='Restart' /> );
    }
  }

  function renderQuitButton(){
    if (page === 'game' && gameStatus !== 'starting' && gameStatus !== 'game-over'){
      return ( <Button onClick={quitGame} text='Quit Game' /> );
    }
  }

  function renderNextPiece(){
    if (page === 'game' && gameStatus !== 'paused'){
      return ( <NextPiece /> );
    }
  }

  return (
    <div className='app'>
      <div className='left-section'>
        <div className='game-board'>
          <div className='game'>
            <Board />
            <GamePiece />
          </div>
          { renderHome() }
          { renderInstructions() }
          { renderHighScoresPage() }
          { renderCountDown() }
          { renderPause() }
          { renderGameOver() }
        </div>
      </div>
      <div className='right-section'>
        <NextPieceContainer>
          { renderNextPiece() }
        </NextPieceContainer>
        <Stats/>
        <div className='button-container'>
          { renderPauseButton() }
          { renderQuitButton() }
        </div>
      </div>
    </div>
  );
}

//----- export code block ------------------------------------------------------

export default App;
