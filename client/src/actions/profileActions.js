import axios from 'axios';
import { logoutUser } from './authActions';
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
                    payload: {},
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
                dispatch({
                    type: GET_ERRORS,
                    payload: {},
                });
                history.push('/dashboard');
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                });
            });
    };
};

export const addExperience = (expData, history) => {
    return (dispatch) => {
        axios.post('/api/profile/experience', expData)
            .then(res => {
                // clear the error first
                dispatch({
                    type: GET_ERRORS,
                    payload: {},
                });
                history.push('/dashboard');
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                });
            });
    }
};

export const addEducation = (eduData, history) => {
    return (dispatch) => {
        axios.post('/api/profile/education', eduData)
            .then(res => {
                // clear the error first
                dispatch({
                    type: GET_ERRORS,
                    payload: {},
                });
                history.push('/dashboard');
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                });
            });
    }
};

export const deleteExperience = (id) => {
    return (dispatch) => {
        axios.delete(`/api/profile/experience/${id}`)
            .then(res => {
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data,
                });
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                });
            });
    }
};

export const deleteEducation = (id) => {
    return (dispatch) => {
        axios.delete(`/api/profile/education/${id}`)
            .then(res => {
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data,
                });
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                });
            });
    }
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
                        payload: err.response.data,
                    });
                });
        }
    }
};
