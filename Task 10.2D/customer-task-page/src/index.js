import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './CreateTask/App';
import Home from './Home/Home';
import FindTask from './FindTask/FindTask';
import { Router, Route, hashHistory } from 'react-router'

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Home}/>
    <Route path="/createtask" component={App}/>
    <Route path="/findtask" component={FindTask}/>
  </Router>,
  document.getElementById('root')
);

