import axios from 'axios';

const setAuthToken = token => {
    // expiration? should we use this for all the request?
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;