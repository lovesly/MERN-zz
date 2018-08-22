import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_LOGIN_USER } from './types';


export const startRegisterUser = (userData, history) => {
    return (dispatch) => {
        axios.post('/api/users/register', userData)
            .then(res => {
                // I doubt whether we should manipulate router at this level.
                history.push('/login');
            })
            .catch(err => {
                console.log(err);
                // bad design, if server side error happens, the reducer won't be able
                // to handle it. 
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response ? err.response.data : {}
                });
            });
    };
};

export const setCurrentUser = (decoded) => {
    return {
        type: SET_LOGIN_USER,
        payload: decoded,
    };
};

export const startLoginUser = (userData) => {
    return (dispatch) => {
        axios.post('/api/users/login', userData)
            .then(res => {
                console.log(res);
                // Save to localStorage
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                // decode token to get user data
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
             })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response ? err.response.data : {}
                });
            });
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
        dispatch(setCurrentUser({}));
    };
};