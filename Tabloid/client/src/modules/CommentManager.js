const baseUrl = "/api/comment";

export const getAllComments = () => {
    return fetch(baseUrl).then((res) => res.json());
};

export const addComment = (comment) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    });
};

export const getCommentsByPostId = (postId) => {
    return fetch(baseUrl + `/GetCommentsByPostId/${postId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
};

export const getCommentById = (commentId) => {
    return fetch(baseUrl + `/${commentId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((resp) => resp.json());
};
export const deleteComment = (commentId) => {
    return fetch(baseUrl + `/${commentId}`, {
        method: "DELETE"
    })
}


export const updateComment = (comment) => {
    return fetch(`${baseUrl}/${comment.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    });
}