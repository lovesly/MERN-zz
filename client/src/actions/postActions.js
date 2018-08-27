import axios from 'axios';

import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING, DELETE_POST } from './types';

export const addPost = postData => {
    return dispatch => {
        axios.post('/api/posts', postData)
            .then(res => {
                dispatch({
                    type: GET_ERRORS,
                    payload: {},
                });
                dispatch(clearErrors());                
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                });
            });
    };
};

export const getPosts = () => {
    return dispatch => {
        dispatch(setPostLoading());
        axios.get('/api/posts')
            .then(res => {
                dispatch({
                    type: GET_POSTS,
                    payload: res.data,
                });
            })
            .catch(err => {
                dispatch({
                    type: GET_POSTS,
                    payload: null,
                });
            });
    };
};

// Delete post by id
export const deletePost = (id) => {
    return dispatch => {
        dispatch(setPostLoading());
        axios.delete(`/api/posts/unlike/${id}`)
            .then(res => {
                dispatch({
                    type: DELETE_POST,
                    payload: id,
                });
                dispatch(clearErrors());
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                });
            });
    };
};

export const addLike = (id) => {
    return dispatch => {
        axios.post(`/api/posts/like/${id}`)
            .then(res => {
                dispatch(getPosts());
                dispatch(clearErrors());
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                });
            });
    };
};

export const removeLike = (id) => {
    return dispatch => {
        axios.post(`/api/posts/unlike/${id}`)
            .then(res => {
                dispatch(getPosts());
                dispatch(clearErrors());                
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                });
            });
    };
};

// Set loading state
export const setPostLoading = () => ({ type: POST_LOADING });
export const clearErrors = () => ({ type: GET_ERRORS, payload: {} });