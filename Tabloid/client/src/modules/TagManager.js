const baseUrl = "/api/Tag";

export const getAllTags = () => {
    return fetch(baseUrl).then((res) => res.json());
};

export const addTag = (tag) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tag),
    });
};

export const updateTag = (tag) => {
    return fetch(`${baseUrl}/${tag.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tag),
    });
};

export const deleteTag = (tag) => {
    return fetch(`${baseUrl}/${tag.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const getTag = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
};

// export const getBySearch = (q, isSort) => {
//     return fetch(baseUrl + `/search?q=${q}&sortDesc=${isSort}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     }).then((res) => res.json());
// };

// export const getPostById = (postId) => {
//     return fetch(baseUrl + `/GetPostByIdWithComments/${postId}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     }).then((resp) => resp.json());
// };
