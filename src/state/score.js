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

export function calcScore( action ){
  switch (action.type){
    case 'drop':
      return calcDropScore(action.dist);
      break;
    case 'lines-cleared':
      return calcLinesScore(action.numLines, action.level);
      break;
    default:
      break;
  }
}
