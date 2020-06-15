import React from 'react';
// import logo from './logo.svg';
import GradeForm from './components/gradeForm';
import LoginForm from './components/login';
import Footer from './components/footer';
import TrackedPage from './components/trackedPage';

import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import {connect } from 'react-redux';
import * as actions from './store/actions/auth';
    
function App(props) {

    useEffect(() => {
        props.isAuthenticated ? null : props.onTryAutoSignup();
    });

    // '/grades' route for client side routing which has not been used yet.
    return (
        <React.Fragment>
            <Route exact path='/grades' component={ props.isAuthenticated ? TrackedPage(GradeForm) : TrackedPage(LoginForm) }/>
            <Route exact path='/' component={ props.isAuthenticated ? TrackedPage(GradeForm) : TrackedPage(LoginForm) }/>
            <Footer />
        </React.Fragment>
    );
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.token !== null, 
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState()), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
