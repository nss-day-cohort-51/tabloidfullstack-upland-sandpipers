const baseUrl = "/api/post";

export const getAllPosts = () => {
    return fetch(baseUrl).then((res) => res.json());
};

export const addPost = (post) => {
    if (post.userProfile.userType.name == "Admin") {
        post.isApproved = true;
    }
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });
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

export const getPostsByCategoryId = (catId) => {
    return fetch(baseUrl + `/GetPostByCategoryId/${catId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((resp) => resp.json());
};

export const getPostsByUserId = (userId) => {
    return fetch(baseUrl + `/GetPostsByUserId/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((resp) => resp.json());
};

export const deletePostById = (postId) => {
    return fetch(baseUrl + `/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const updatePost = (post) => {
    return fetch(`${baseUrl}/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });
};
export const getPostsBySubscription = (subId) => {
    return fetch(baseUrl + `/GetSubscribedPosts/${subId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((resp) => resp.json());
};
