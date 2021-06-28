import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import MultiInput from "./Multi-Input/MultiInput";
import DomSelect from "./useRef/DomSelect";
import Variable from "./useRef/Variable";
import UseMemo from "./useMemo/UseMemo";
import UseCallback from "./useMemo/UseCallback";
import UserContextProvider from "./GlobalState/UserContextProvider";
import User from "./GlobalState/User";

ReactDOM.render(
  <React.StrictMode>
      <UserContextProvider>
          <User/>
      </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
