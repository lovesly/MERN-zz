import axios from 'axios';

import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING, DELETE_POST, GET_POST, CLEAR_POST } from './types';

export const addPost = postData => {
    return dispatch => {
        axios.post('/api/posts', postData)
            .then(res => {
                dispatch({
                    type: ADD_POST,
                    payload: res.data,
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

export const getPost = (id) => {
    return dispatch => {
        dispatch(setPostLoading());
        axios.get(`/api/posts/${id}`)
            .then(res => {
                dispatch({
                    type: GET_POST,
                    payload: res.data,
                });
            })
            .catch(err => {
                dispatch({
                    type: GET_POST,
                    payload: null,
                });
            });
    };
};

// Delete post by id
export const deletePost = (id) => {
    return dispatch => {
        dispatch(setPostLoading());
        axios.delete(`/api/posts/${id}`)
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

export const addComment = (postId, commentData) => {
    return dispatch => {
        axios.post(`/api/posts/comment/${postId}`, commentData)
            .then(res => {
                dispatch({
                    type: GET_POST,
                    payload: res.data,
                });
                dispatch(clearErrors());               
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                });
            });
    };
};

export const deleteComment = (postId, commentId) => {
    return dispatch => {
        dispatch(setPostLoading());
        axios.delete(`/api/posts/${postId}/comment/${commentId}`)
            .then(res => {
                dispatch({
                    type: GET_POST,
                    payload: res.data,
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

// Set loading state
export const setPostLoading = () => ({ type: POST_LOADING });
export const clearErrors = () => ({ type: GET_ERRORS, payload: {} });

// Clear the post state, my solution
export const clearPost = () => ({ type: CLEAR_POST });