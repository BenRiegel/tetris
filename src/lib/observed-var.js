
//make into a class
export default function ObservedVar(initValue){

  let value = initValue;
  let listeners = [];

  async function notify(newValue, oldValue){
    let promises = []
    for (let listener of listeners){
    //  await listener(newValue, oldValue);
      let p = listener(newValue, oldValue);
      promises.push(p);
    }
    return Promise.all(promises);
  }

  function get(){
    return value;
  }

  function set(newValue){
    if (newValue !== value){
      let oldValue = value;
      value = newValue;
      return notify(newValue, oldValue);
    }
  }

  function addListener(callback){
    listeners.push(callback);
  }

  return { get, set, addListener }

}
