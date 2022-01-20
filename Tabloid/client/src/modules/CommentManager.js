import { getToken } from "./authManager";

const baseUrl = "/api/comment";

export const getAllComments = () => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());
    });
};

export const addComment = (comment) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },

            body: JSON.stringify(comment),
        });
    });
};

export const getCommentsByPostId = (postId) => {
    return getToken().then((token) => {
        return fetch(baseUrl + `/GetCommentsByPostId/${postId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
    });
};

export const getCommentById = (commentId) => {
    return getToken().then((token) => {
        return fetch(baseUrl + `/${commentId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then((resp) => resp.json());
    });
};
