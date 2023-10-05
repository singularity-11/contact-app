import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import huLocale from 'date-fns/locale/hu';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={huLocale}
      >
        <App />
      </LocalizationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
