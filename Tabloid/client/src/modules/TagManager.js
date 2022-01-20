import { getToken } from "./authManager";

const baseUrl = "/api/Tag";

export const getAllTags = () => {
    getToken().then((token) => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());
    });
};

export const addTag = (tag) => {
    getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tag),
        });
    });
};

export const updateTag = (tag) => {
    getToken().then((token) => {
        return fetch(`${baseUrl}/${tag.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tag),
        });
    });
};

export const deleteTag = (tag) => {
    getToken().then((token) => {
        return fetch(`${baseUrl}/${tag.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
    });
};

export const getTag = (id) => {
    getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
    });
};

// export const getBySearch = (q, isSort) => {
// getToken().then(token => {
//     return fetch(baseUrl + `/search?q=${q}&sortDesc=${isSort}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     }).then((res) => res.json());
// })}

// export const getPostById = (postId) => {
// getToken().then(token => {
//     return fetch(baseUrl + `/GetPostByIdWithComments/${postId}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     }).then((resp) => resp.json());
// })}
