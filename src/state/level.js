//----- imports ----------------------------------------------------------------

import Store from '../lib/store.js';


//----- module code block ------------------------------------------------------

class LevelStore extends Store {
  constructor(initValue){
    super(initValue);
  }
  updateFromLines(numLines){
    const newLevel = Math.floor(numLines / 10);
    this.update(newLevel);
  }
}

let levelStore = new LevelStore(0);


//----- export code block ------------------------------------------------------

export default levelStore;
