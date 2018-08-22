import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE } from './types';

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
