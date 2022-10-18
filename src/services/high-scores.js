//----- module code block ------------------------------------------------------

const highScores = (function(){

//  localStorage.clear();
  let highScores = JSON.parse( localStorage.getItem('highScores') );
  if (!highScores){
    highScores = new Array(5).fill( {name:null, score:null} );
  }
  let currentHighScore = null;

  return {
    get: function(){
      return highScores;
    },
    isCurrentHighScore: function(score){
      return (currentHighScore === score);
    },
    gotHighScore: function(){
      const isHighScore = highScores.includes(currentHighScore);
      return isHighScore;
    },
    update: function(score){
      currentHighScore = {name:null, score};
      highScores.push(currentHighScore);
      highScores.sort( (a,b) => {
        if (a.score < b.score){
          return 1;
        }
        if (a.score >= b.score){
          return -1;
        }
        return 0;
      });
      highScores.pop();
    },
    setPlayerName: function(name){
      currentHighScore.name = name;
      localStorage.setItem('highScores', JSON.stringify(highScores) );
    },
    reset: function(){
      currentHighScore = null;
    }
  };

})();


//----- export code block ------------------------------------------------------

export default highScores;
