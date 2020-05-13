import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Messenger from './Messenger/Messenger';
import JoinPage from './JoinPage/JoinPage';

function App() {
  return (
    <Router>
      <Route exact path='/' component={ JoinPage } />
      <Route exact path='/messenger' component={ Messenger } />
    </Router>
  );
}

export default App;