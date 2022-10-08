//----- module code block ------------------------------------------------------

class Store {
  #initValue;
  #value;
  #listeners;
  #notify(newValue, oldValue, ...args){
    let promises = []
    for (let listener of this.#listeners){
      let p = listener(newValue, oldValue, ...args);
      promises.push(p);
    }
    return Promise.all(promises);
  }
  constructor(initValue){
    this.#initValue = initValue;
    this.#value = initValue;
    this.#listeners = [];
  }
  get value(){
    return this.#value;
  }
  set(newValue){
    this.#value = newValue;
  }
  reset(){
    this.update(this.#initValue);
  }
  update(newValue, ...args){
    if (newValue !== this.#value){
      let oldValue = this.#value;
      this.#value = newValue;
      return this.#notify(newValue, oldValue, ...args);
    }
  }
  subscribe(callback){
    this.#listeners.push(callback);
  }
  unsubscribe(callback){
    this.#listeners = this.#listeners.filter( listener => {
      return listener !== callback;
    });
  }
}


//----- export code block ------------------------------------------------------

export default Store;
