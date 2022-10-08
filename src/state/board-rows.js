//----- imports ----------------------------------------------------------------

import Store from '../lib/store.js';


//----- module code block ------------------------------------------------------

function rowHasCells(row){
  return row.reduce( (hasCells, cell)=>{
    return hasCells || cell.hasContent;
  }, false);
}

function isFull(row){
  return row.reduce( (isFull, cell)=>{
    return isFull && cell.hasContent;
  }, true);
}


class BoardRowsStore extends Store {

  constructor(initValue){
    super(initValue);
  }

  createRows(grid){
    const newRows = grid.reduce( (contentRows, row, i) => {
      const hasContent = rowHasCells(row);
      if (hasContent){
      /*  const newRow = {
          cells: new Store(row),
          position: new Store(i),
          clearedPercent: new Store(0),
        }*/
        const newRow = {
          cells: row,
          position: i,
          clearedPercent: 0,
        };
        contentRows.push(newRow);
      }
      return contentRows;
    }, []);
    return this.update(newRows);
  }

  updateFullRows(callback){
    const newRows = this.value.map( row => {
      const rowIsFull = isFull(row.cells);
      if (rowIsFull){
        return callback(row);
      } else {
        return row;
      }
    });
    this.update(newRows);
  }

  getFullRows(){
    return this.value.filter( row => {
      return isFull(row.cells);
    });
  }

}

let boardRowsStore = new BoardRowsStore( [] );


//----- export code block ------------------------------------------------------

export default boardRowsStore;
