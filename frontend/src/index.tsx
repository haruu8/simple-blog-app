import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';
import App from "./App";
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from "react-router-dom";
import Support from './components/support/Support';
import Auth from './components/auth/Auth';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Auth} />
        <Route exact path="/support" component={Support} />
        <Route exact path="/articles" component={App} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
