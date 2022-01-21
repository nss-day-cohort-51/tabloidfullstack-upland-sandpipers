const baseUrl = "/api/Reactions";
const baseUrl2 = "/api/PostReaction"

export const getAllReactions = () => {
    return fetch(baseUrl).then((res) => res.json());
};

export const addReaction = (reaction) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reaction),
    });
};

export const addPostReaction = (post) => {
    return fetch(baseUrl2, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });
};

export const getPostReactionById = (postId) => {
    return fetch(`${baseUrl2}/PostReactionsBy/${postId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
};


// export const updateReaction = (tag) => {
//     return fetch(`${baseUrl}/${tag.id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(tag),
//     });
// };

// export const deleteReaction = (tag) => {
//     return fetch(`${baseUrl}/${tag.id}`, {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
// };

// export const getReaction = (id) => {
//     return fetch(`${baseUrl}/${id}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     }).then((res) => res.json());
// };

// // export const getBySearch = (q, isSort) => {
// //     return fetch(baseUrl + `/search?q=${q}&sortDesc=${isSort}`, {
// //         method: "GET",
// //         headers: {
// //             "Content-Type": "application/json",
// //         },
// //     }).then((res) => res.json());
// // };

// // export const getPostById = (postId) => {
// //     return fetch(baseUrl + `/GetPostByIdWithComments/${postId}`, {
// //         method: "GET",
// //         headers: {
// //             "Content-Type": "application/json",
// //         },
// //     }).then((resp) => resp.json());
// // };
