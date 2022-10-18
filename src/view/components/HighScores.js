//----- imports ----------------------------------------------------------------

import highScores from '../../services/high-scores.js';
import '../stylesheets/high-scores.css';


//----- module code block ------------------------------------------------------

function HighScores(){

  function handleInput(evt){
    highScores.setPlayerName(evt.target.value);
  }

  function renderName(highScore){
    const isCurrentHighScore = highScores.isCurrentHighScore(highScore);
    if (isCurrentHighScore){
      return (
        <td>
          <input type='text' onChange={handleInput} autoFocus/>
        </td>
      );
    } else {
      return (<td className='high-score-name'>{highScore.name}</td>);
    }
  }

  const highScoresAll = highScores.get();

  return (
    <table className='high-scores-container'>
      <tbody>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
        {
          highScoresAll.map( (highScore,i) => {
            return (
              <tr className='high-score' key={i}>
                <td className='high-score-rank'>{i+1}</td>
                {
                  renderName(highScore)
                }
                <td className='high-score-score'>{highScore.score}</td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}


//----- export code block ------------------------------------------------------

export default HighScores;
