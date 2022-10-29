import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import "./styles/global.css";
import esLocale from "date-fns/locale/es"

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiPickersUtilsProvider>
  </StrictMode>
);