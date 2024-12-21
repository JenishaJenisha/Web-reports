import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter } from 'react-router-dom';
import Store from './Components/Store/store';
import { Provider } from 'react-redux'
import './firebaseConfig';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
<DndProvider backend={HTML5Backend}>
<Provider store={Store}>
      <App />
</Provider>
</DndProvider>
 </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

