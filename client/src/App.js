import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import NotFound from './components/pages/NotFound';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import PrivateRoute from './components/routing/privateRoute';
import MeetingState from './context/meeting/meetingState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <MeetingState>
        <AlertState>
          <Router>
            <div className="App">
              <Navbar />
              <div className="container">
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route component={NotFound} />
                </Switch>
              </div>
              <Footer />
            </div>
          </Router>
        </AlertState>
      </MeetingState>
    </AuthState>
  );
}

export default App;
