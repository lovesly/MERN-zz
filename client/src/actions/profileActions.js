import axios from 'axios';
import { logoutUser } from './authActions';
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_LOGIN_USER } from './types';

// Get current profile
export const getCurrentProfile = () => {
    return (dispatch) => {
        dispatch(setProfileLoading());
        axios.get('/api/profile')
            .then(res => {
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data,
                });
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: GET_PROFILE,
                    payload: {}
                });
            });
    };
};

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};

// Clear profile
export const clearProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};

// Create profile
export const createProfile = (profile, history) => {
    return (dispatch) => {

        axios.post('/api/profile', profile)
            .then(res => {
                history.push('/dashboard');
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
    };
};

export const deleteAccount = () => {
    return (dispatch) => {
        if (window.confirm('Are you sure? This can NOT be undone!')) {
            axios.delete('api/profile')
                .then(res => {
                    dispatch(logoutUser());
                    dispatch(clearProfile());
                })
                .catch(err => {
                    // wierd
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    });
                });
        }
    }
};
