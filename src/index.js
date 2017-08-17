import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(<Router>
    <Route path='/' component={App} />
  </Router>,
document.getElementById('root'));
