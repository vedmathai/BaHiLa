import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import MapPage from 'pages/map/map-page';

const root = ReactDOM.createRoot(document.getElementById('root'));
const script = document.createElement("script");


root.render(
  <Router>
    <Routes>
      <Route path="/" element={<MapPage />} />
    </Routes>
</Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
