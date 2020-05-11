import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './MainPage/MainPage';

function App(props) {
  return (
    <Router basename="/">
      <Route exact path='/' component={ MainPage } />
      {/* <Route path='/admin/student-summary/:id' component={ StudentStats } /> */}
    </Router>
  );
}

export default App;