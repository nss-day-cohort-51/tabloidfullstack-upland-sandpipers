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

// export const getWithComments = () => {
//     return fetch(baseUrl + "/getwithcomments", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     }).then((res) => res.json());
// };

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
