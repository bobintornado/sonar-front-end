import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Project from './Project';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
const Main = () => (
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/projects/:key" component={Project}/>
    </div>
  </Router>
)

ReactDOM.render(<Main />, document.getElementById('root'));



registerServiceWorker();
