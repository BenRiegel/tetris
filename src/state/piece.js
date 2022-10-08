//----- imports ----------------------------------------------------------------

import Store from '../lib/store.js';
import { flipMatrixLeft, flipMatrixRight } from '../lib/utils.js';


//----- module code block ------------------------------------------------------

class PieceStore extends Store {

  constructor(initValue){
    super(initValue);
  }

  move(direction){
    let newValue = structuredClone(this.value);
    switch(direction){
      case 'down':
        newValue.coords.row += 1;
        break;
      case 'right':
        newValue.coords.column += 1;
        break;
      case 'left':
        newValue.coords.column -= 1;
        break;
      default:
        break;
    }
    this.update(newValue);
  }

  flip(direction){
    let newValue = structuredClone(this.value);
    switch(direction){
      case 'right':
        newValue.cells = flipMatrixRight(this.value.cells);
        break;
      case 'left':
        newValue.cells = flipMatrixLeft(this.value.cells);
        break;
      default:
        break;
    }
    this.update(newValue);
  }

  setRow(newRowValue){
    let newValue = structuredClone(this.value);
    newValue.coords.row = newRowValue;
    this.update(newValue);
  }

}

const pieceStore = new PieceStore(null);


//----- export code block ------------------------------------------------------

export default pieceStore;
