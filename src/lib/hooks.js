//----- imports ----------------------------------------------------------------

import { useRef, useEffect, useState } from 'react';


//----- module code block ------------------------------------------------------

function useOnMount(){
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

function useOnRenderAsync(){
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

function useStore(store){
  const [value, setValue] = useState(store.value);
  useEffect( ()=>{
    store.subscribe(setValue);
    return ()=>{
      store.unsubscribe(setValue);
    };
  }, [store]);
  return value;
}


//----- export code block ------------------------------------------------------

export { useOnMount, useOnRenderAsync, useStore };
