
//make into a class
export default function Emitter(){

  let listeners = [];

  async function broadcast(...args){
    for (let listener of listeners){
      await listener(...args);
    }
  }

  function addListener(callback){
    listeners.push(callback);
  }

  return {
    broadcast,
    addListener,
  }

}
