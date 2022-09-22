import { useState, useRef, useEffect } from 'react';


export function useOnMount(){
  let callback = useRef();
  useEffect( ()=>{
    if (callback.current){
      callback.current();
    }
  }, []);
  return function setCallback(cb){
    callback.current = cb;
  }
}




export function useCounter(initValue){

  const [count, setCount] = useState(initValue);

  function decrement(){
    setCount( prevCount => prevCount - 1 );
  }

  return [count, decrement];

}


/*export function useEventQueue(eventsList){

  const [events, setEvents] = useState([...eventsList]);

  function doNextEvent(){
    setEvents( prevEvents => prevEvents.slice(1) );
  }
  return [events[0], events.length === 1, doNextEvent];
}*/

export function useOnRenderAsync(){
  let callback = useRef();
  useEffect( ()=>{
    (async function(){
      if (callback.current){
        await callback.current();
      }
    }());
  });
  return function setCallback(cb){
    callback.current = cb;
  }
}


/*export function useOnMountAsync(){
  let callback = useRef();
  useEffect( ()=>{
    (async function(){
      if (callback.current){
        await callback.current();
      }
    }());
  }, []);
  return function setCallback(cb){
    callback.current = cb;
  }
}*/
