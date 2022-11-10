import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Feedbacks from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/configuracoes" component={ Settings } />
        <Route path="/feedbacks" component={ Feedbacks } />
      </Switch>
    );
  }
}

export default App;
