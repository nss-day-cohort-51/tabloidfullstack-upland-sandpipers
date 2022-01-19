const baseUrl = "/api/post";

export const getAllPosts = () => {
    return fetch(baseUrl).then((res) => res.json());
};

export const addPost = (post) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });
};

export const getWithComments = () => {
    return fetch(baseUrl + "/getwithcomments", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
};

export const getBySearch = (q, isSort) => {
    return fetch(baseUrl + `/search?q=${q}&sortDesc=${isSort}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
};

export const getPostById = (postId) => {
    return fetch(baseUrl + `/${postId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((resp) => resp.json());
};

export const getPostsByUserId = (userId) => {
    return fetch(baseUrl + `/GetPostByUserId/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((resp) => resp.json());
};
