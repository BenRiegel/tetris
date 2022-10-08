//----- imports ----------------------------------------------------------------

import Store from '../lib/store.js';


//----- module code block ------------------------------------------------------

function calcDropScore(dist){
  return dist;
}

function calcLinesScore(numLines, level){
  let baseScore;
  switch(numLines){
    case 1:
      baseScore = 40;
      break;
    case 2:
      baseScore = 100;
      break;
    case 3:
      baseScore = 300;
      break;
    case 4:
      baseScore = 1200;
      break;
    default:
      break;
  }
  return ( baseScore * (level+1) );
}

class ScoreStore extends Store {
  constructor(initValue){
    super(initValue);
  }
  scoreDrop(dropDist){
    const dropScore = calcDropScore(dropDist);
    const newScore = this.value + dropScore;
    this.update(newScore);
  }
  scoreLinesCleared(numLines, level){
    const linesScore = calcLinesScore(numLines, level);
    const newScore = this.value + linesScore;
    this.update(newScore);
  }
}

let scoreStore = new ScoreStore(0);


//----- export code block ------------------------------------------------------

export default scoreStore;
