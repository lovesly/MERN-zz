import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearProfile } from './actions/profileActions';

import PrivateRoute from './components/common/PrivateRoute';

import store from './store';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import './App.css';

// check for token 
if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    // expire
    // question, if the user didn't refresh the page, 
    // the token will always be there? 
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        store.dispatch(clearProfile);
        window.location.href = '/login';
    } else {
        store.dispatch(setCurrentUser(decoded));
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={ store }>
                <BrowserRouter>
                    <div className="App">
                        <Navbar />
                        <Route path="/" component={ Landing } exact={ true } />
                        <div className="container">
                            <Route path="/register" component={ Register } exact={ true } />
                            <Route path="/login" component={ Login } exact={ true } />
                            <Switch>
                                <PrivateRoute path="/dashboard" component={ Dashboard } exact={ true } />
                                <PrivateRoute path="/create-profile" component={ CreateProfile } exact={ true } />
                                <PrivateRoute path="/edit-profile" component={ EditProfile } exact={ true } />
                                <PrivateRoute path="/add-experience" component={ AddExperience } exact={ true } />
                                <PrivateRoute path="/add-education" component={ AddEducation } exact={ true } />
                            </Switch>
                        </div>
                        <Footer />
                    </div>
                </BrowserRouter>
            </Provider>
        );
  }
}

export default App;
