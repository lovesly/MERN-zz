import { ADD_POST, POST_LOADING, GET_POSTS, DELETE_POST, GET_POST, CLEAR_POST } from '../actions/types';
const initialState = {
    posts: [],
    post: null,
    loading: false
};
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: 
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case GET_POSTS: 
            return {
                ...state,
                posts: action.payload,
                loading: false,
            }
        case GET_POST: 
            return {
                ...state,
                post: action.payload,
                loading: false,
            }
        case CLEAR_POST: 
            return {
                ...state,
                post: null,
                loading: false,
            }
        case DELETE_POST: 
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload),
                loading: false,
            }
        case POST_LOADING: 
            return {
                ...state,
                loading: true,
            }
        default:
            return state;
    }
};