import React from 'react';
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import Rotas from './core/routes';

ReactDOM
  .createRoot(document.getElementById("root"))
  .render(
    // <React.StrictMode>
    <Rotas />
    // </React.StrictMode>
  );