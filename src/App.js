import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Trivia from './pages/Trivia';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Trivia } />
      </Switch>
    );
  }
}

export default App;
