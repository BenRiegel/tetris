//----- imports ----------------------------------------------------------------

import Store from '../lib/store.js';


//----- module code block ------------------------------------------------------

class LinesStore extends Store {
  constructor(initValue){
    super(initValue);
  }
  add(num){
    let newLines = this.value + num;
    this.update(newLines);
  }
}

let linesStore = new LinesStore(0);


//----- export code block ------------------------------------------------------

export default linesStore;
