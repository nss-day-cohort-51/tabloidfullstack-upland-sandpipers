const baseUrl = "/api/postTag";

export const getAllPostTags = () => {
    return fetch(baseUrl).then((res) => res.json());
};

export const addPostTag = (post) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });
};

export const getPostTag = (postTagId) => {
    return fetch(`${baseUrl}/${postTagId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
};

export const getPostTagsByPostId = (postId) => {
    return fetch(baseUrl + `/GetPostTags/${postId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((resp) => resp.json());
};

export const replaceTags = (postTags) => {
    return fetch(baseUrl + `/ClearPostTags/${postTags[0].postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(() => {
        postTags.forEach((postTag) => {
            addPostTag(postTag);
        });
    });
};

export const clearPostTags = (postId) => {
    return fetch(baseUrl + `/ClearPostTags/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
};
