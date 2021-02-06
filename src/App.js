
import React from 'react';
import { Route } from 'react-router';

import logo from './logo.svg';
import './App.css';
import QuotesContainer from './Quotes/QuotesContainer';
import AddQuote from './Quotes/AddQuote';
import SignIn from './Users/SignIn';
import SignUp from './Users/SignUp';
import Profile from './Users/Profile';

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

      </header>


      <React.Fragment>
        <Route path='/' exact component={QuotesContainer} />
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} />
        <Route path='/profile' component={Profile} />
        <Route path='/add-qoute' component={AddQuote} />

      </React.Fragment>


    </div>

  );
}

export default App;

