//----- imports ----------------------------------------------------------------

import highScores from '../../services/high-scores.js';
import scoreStore from '../../state/score.js';
import Button from './Button.js';
import HighScores from './HighScores.js';
import '../stylesheets/game-over.css';


//----- module code block ------------------------------------------------------

function GameOver(props){

  const gotHighScore = highScores.gotHighScore();

  return (
    <div className='game-over'>
      <h1>Game Over</h1>
      <p>You finished with a score of . . .</p>
      <p>{scoreStore.value}</p>
      {
        gotHighScore ? (<p>Congrats! You got a high score!</p>) : null
      }
      <HighScores />
      <Button onClick={props.onClick} text='OK' />
    </div>
  );
}


//----- export code block ------------------------------------------------------

export default GameOver;
