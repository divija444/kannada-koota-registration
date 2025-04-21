import React from 'react';
import {Switch, Route} from 'react-router-dom';

import ReloadOnBackButton from './Reload';
import Login from './Login';
import Entry from './entry';



function App() {
  return (
    <div className="App">

        <Switch>
          
          <Route exact path='/' component={Entry}/>   

          <Route path='/login' component={Login}/> 
          
        </Switch>

        <ReloadOnBackButton />
    </div>
  );
}

export default App;