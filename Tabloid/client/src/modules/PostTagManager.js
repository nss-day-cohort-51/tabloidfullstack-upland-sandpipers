import { getToken } from "./authManager";
const baseUrl = "/api/postTag";

export const getAllPostTags = () => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());
    });
};

export const addPostTag = (post) => {
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

export const getPostTag = (postTagId) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${postTagId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
    });
};

export const getPostTagsByPostId = (postId) => {
    return getToken().then((token) => {
        return fetch(baseUrl + `/GetPostTags/${postId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then((resp) => resp.json());
    });
};

export const replaceTags = (postTags) => {
    return getToken().then((token) => {
        return fetch(baseUrl + `/ClearPostTags/${postTags[0].postId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then(() => {
            postTags.forEach((postTag) => {
                addPostTag(postTag);
            });
        });
    });
};

export const clearPostTags = (postId) => {
    return getToken().then((token) => {
        return fetch(baseUrl + `/ClearPostTags/${postId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
    });
};
