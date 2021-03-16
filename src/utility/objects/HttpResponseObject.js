class HttpResponseObject {
    constructor() {
      // this would not be in prototype
      this.haveError = false;
      this.errorMessage=null;
      this.responseObject=null;
      
    }
    // this would be in prototype
    
  }
  
  export default HttpResponseObject;