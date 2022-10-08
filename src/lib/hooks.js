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
  const onMountDo = useOnMount();
  const [value, setValue] = useState(store.value);
  const resolveF = useRef();
  function handleValueChange(newValue){
    return new Promise( (resolve, reject)=>{
      resolveF.current = resolve;
      setValue(newValue);
    });
  }
  onMountDo( ()=>{
    store.subscribe(handleValueChange);
  });
  useEffect( ()=>{
    if (resolveF.current){
      resolveF.current();
      resolveF.current = null;
    }
  });
  return value;
}


//----- export code block ------------------------------------------------------

export { useOnMount, useOnRenderAsync, useStore };
