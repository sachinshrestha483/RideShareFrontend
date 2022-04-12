class Debouncing{
    constructor(){
     this.timer=null;
    }
    setdebouncingFunction(fun,parameters,timeInterval=800){
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (parameters == null) {
          fun();
        } else {
          fun(...parameters);
        }
      }, timeInterval);
    }
  }


  export default Debouncing;
   
   
  