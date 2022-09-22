import ObservedVar from '../lib/observed-var.js';



function State(initValue){

  function defineGettersSetters(props){
    let newObj = {};
    Object.keys(props).forEach( varName => {
      Object.defineProperty(newObj, varName, {
        get: function(){
          return props[varName].get();
        },
        set: function(value){
          return props[varName].set(value);
        }
      });
    });
    return newObj;
  }

  function setProps(obj){
    Object.entries(obj).forEach( ([key,value]) => {
      props[key].set(value);
    });
  }

  function defineProps(obj){
    return Object.entries(obj).reduce( (newObj, [key, value]) => {
      newObj[key] = new ObservedVar(value);
      return newObj;
    }, {});
  }

  let props = defineProps(initValue);

  let state = defineGettersSetters(props);

  state.onPropChange = function(propName, cb){
    props[propName].addListener(cb);
  }

  state.getPropValue = function(propName){
    return props[propName].get();
  }

  state.setPropValue = function(propName, value){
    return props[propName].set(value);
  }

  state.setProps = setProps;

  return state;

}


export default State;
