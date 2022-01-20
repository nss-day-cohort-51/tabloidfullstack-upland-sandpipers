import { getToken } from "./authManager";

const baseUrl = "/api/post";

export const getAllPosts = () => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());
    });
};

export const addPost = (post) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },

            body: JSON.stringify(post),
        });
    });
};

export const getBySearch = (q, isSort) => {
    return getToken().then((token) => {
        return fetch(baseUrl + `/search?q=${q}&sortDesc=${isSort}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
    });
};

export const getPostById = (postId) => {
    return getToken().then((token) => {
        return fetch(baseUrl + `/${postId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then((resp) => resp.json());
    });
};

export const getPostsByUserId = (userId) => {
    return getToken().then((token) => {
        return fetch(baseUrl + `/GetPostsByUserId/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then((resp) => resp.json());
    });
};

export const deletePostById = (postId) => {
    return getToken().then((token) => {
        return fetch(baseUrl + `/${postId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
    });
};

export const updatePost = (post) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${post.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },

            body: JSON.stringify(post),
        });
    });
};
