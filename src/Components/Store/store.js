import { configureStore,  } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import myMiddleware from './middleware'; 
import rootReducer from './rootreducers'; 
const Store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(myMiddleware)
});
export default Store;

 