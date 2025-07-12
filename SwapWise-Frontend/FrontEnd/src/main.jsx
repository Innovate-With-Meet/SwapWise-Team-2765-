import React from 'react'; // .>' New Added
import ReactDOM from 'react-dom/client'; // .>' New Added
import './index.css'
import { BrowserRouter } from 'react-router-dom'; // .>' New Added
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)