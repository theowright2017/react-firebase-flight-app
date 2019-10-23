import React from 'react';

import Home from './Pages/Home';
import Search from './Pages/Search'
import Results from './Pages/Results'
import Buy from './Pages/Buy'
import Account from './Pages/Account'
import Error from './Pages/Error'

import {Route, Switch} from 'react-router-dom';

import NavBar from './Components/NavBar';

import './App.css';


function App() {
  return (
    <div className="App">

      <NavBar />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route  path="/search" component={Search} />
            <Route  path="/results" component={Results} />
            <Route  path="/buy" component={Buy} />
            <Route  path="/account" component={Account} />

            <Route component={Error} />
        </Switch>
    </div>
  );
}

export default App;
