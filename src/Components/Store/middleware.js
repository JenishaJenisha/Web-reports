// middleware.js
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// const myMiddleware = applyMiddleware(thunk);
const myMiddleware = (store) => (next) => (action) => {
    // Your middleware logic here
    // You can access the store, dispatch, and the action being dispatched
    
    // Example: Logging every dispatched action
    // console.log('Action:', action);
    
    // Pass the action to the next middleware in the chain
    
      

    return next(action);
  };
  
  export default myMiddleware;
  