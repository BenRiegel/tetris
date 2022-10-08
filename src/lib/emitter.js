//----- module code block ------------------------------------------------------

class Emitter{

  //----- private code block -----

  #listeners = {};

  //----- public api -----

  broadcast(eventName, ...args){
    const listenersList = this.#listeners[eventName];
    if (listenersList){
      for (let listener of listenersList){
        listener(...args);
      }
    }
  }
  addListener(eventName, callback){
    const listenersList = this.#listeners[eventName] || [];
    listenersList.push(callback);
    this.#listeners[eventName] = listenersList;
  }
}


//----- export code block ------------------------------------------------------

export default Emitter;
