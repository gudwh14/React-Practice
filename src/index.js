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
import Cookie from "./Cookie/Cookie";
import Kakao from "./OauthLogin/Kakao";
import {BrowserRouter , Route , Switch} from "react-router-dom";
import RedirectionPage from "./OauthLogin/RedirectionPage";
import {createStore} from "redux";
import rootReducer from "./Redux/module";
import {Provider} from "react-redux";

/*
    store 를 생성하고
    react-redux 를 이용해 Provider 를 만들어 store 속성을 넣어서 감싸주면
    렌더링하는 컴포넌트에서 리덕스 스토어에 접근할수 있다.
 */
const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <UserContextProvider>
              <BrowserRouter>
                  <Switch>
                  </Switch>
              </BrowserRouter>
          </UserContextProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
