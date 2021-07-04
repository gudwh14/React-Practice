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
import {BrowserRouter,Router , Route , Switch} from "react-router-dom";
import RedirectionPage from "./OauthLogin/RedirectionPage";
import {createStore ,applyMiddleware} from "redux";
import rootReducer from "./Redux/module";
import {Provider} from "react-redux";
import TodosContainer from "./Redux/components/TodosContainer";
import App from "./App";
import rootMiddleReducer, {rootSaga} from "./Redux-middleware/modules";
import PostListPage from "./Redux-middleware/pages/PostListPage";
import myLogger from "./Redux-middleware/middlewares/myLogger";
// redux-logger 사용하여 logger 이용하기 npm install redux-logger
import {logger} from "redux-logger/src";
import {createBrowserHistory} from "history";
// redux 데브툴 사용하기 npm install redux-devtools-extension
import {composeWithDevTools} from "redux-devtools-extension";
import ReduxThunk from 'redux-thunk';
import PostPage from "./Redux-middleware/pages/PostPage";
import createSagaMiddleware from 'redux-saga';
import CounterContainer from "./Redux-middleware/components/CounterContainer";

/*
    store 를 생성하고
    react-redux 를 이용해 Provider 를 만들어 store 속성을 넣어서 감싸주면
    렌더링하는 컴포넌트에서 리덕스 스토어에 접근할수 있다.
 */
// customHistory 만들어주기
const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware(); // 사가 미들웨어 만들어 줍니다.

const store = createStore(rootMiddleReducer,
    composeWithDevTools(
        applyMiddleware(
            ReduxThunk.withExtraArgument({history : customHistory}),
            sagaMiddleware,
            logger
        )
    )
); // 미들웨어를 적용, 여러개도 가능합니다 logger 를 사용할경우 logger 가 가장 마지막에 와야합니다.

sagaMiddleware.run(rootSaga); // 루트사가를 실행해 줍니다. 주의 : 스토어가 생성된 후 run 함수를 실행해야 합니다.

ReactDOM.render(
  <React.StrictMode>
          <UserContextProvider>
              <Router history={customHistory}>
                  <Provider store={store}>
                      <CounterContainer/>
                      <Switch>
                          <Route path={"/"} component={PostListPage} exact/>
                          <Route path={"/:id"} component={PostPage}/>
                      </Switch>
                  </Provider>
              </Router>
          </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
