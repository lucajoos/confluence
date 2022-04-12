import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import './styles/style.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Share from './components/Share';
import Confirmation from './components/Confirmation';

ReactDOM.render(
  import.meta.env.VITE_APP_ENVIRONMENT === 'extension' ? (
    <App />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<App />} />
        <Route path={'/share/:id'} element={<Share />} />
        <Route path={'/confirmation'} element={<Confirmation />} />
        <Route path={'/privacy'} onEnter={() => window.location.reload()} />
      </Routes>
    </BrowserRouter>
  ),
  document.getElementById('root'),
);