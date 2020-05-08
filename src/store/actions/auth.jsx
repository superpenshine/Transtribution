import React from 'react'
import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS, 
        user: username, 
        token: token, 
    }
}

export const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL, 
        error:  <font color='#d6094a'>
                    <span role='img' aria-label='grinning face with sweat'>登陆失败😅</span>
                </font>
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT 
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authCheckState = () => {
    return dispatch => {
        dispatch(authStart());
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date() ) {
                dispatch(logout())
            } else {
                const username = localStorage.getItem('username');
                dispatch(authSuccess(token, username));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(
            '/api/token_auth/', 
            { username, password }
        )
        .then(
            res => {
                const token = res.data.token;
                const expirationDate = new Date(new Date().getTime() + 7200 * 1000)
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token, username));
                dispatch(checkAuthTimeout(7200));
            }
        )
        .catch(err => {
                console.log(err);
                dispatch(authFail());
            }
        )
    }
}

// Signup

// export const authSignup = (username, password, className, studentId) => {
//  return dispatch => {
//      dispatch(authStart());
//      axios.post(
//          '/api/registration/', 
//          { username, password, className, studentId }
//      )
//      .then(
//          res => {
//              const token = res.data.key;
//              const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
//              localStorage.setItem('token', token);
//              localStorage.setItem('expirationDate', expirationDate);
//              localStorage.setItem('user', user);
//              dispatch(authSuccess(token));
//              dispatch(checkAuthTimeout(3600))
//          }
//      )
//      .catch(err => {
//              dispatch(authFail())
//          }
//      )
//  }
// }
