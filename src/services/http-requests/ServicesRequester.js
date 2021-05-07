import Axios from 'axios';

const host = process.env.REACT_APP_SERVICES_HOST;
const ServicesRequester = {
    getPosts: async function() {
        return Axios.get(`${host}/post/get-all`);
    },

    postPost: function(data, config) {
        return Axios.post(`${host}/post/save`, JSON.stringify(data), config);
    },

    deletePost: async function(postId) {
        return Axios.delete(`${host}/post/delete-id/${postId}`);
    }
};

export default ServicesRequester;