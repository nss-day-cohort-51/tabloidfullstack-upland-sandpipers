const baseUrl = "/api/userprofile";

export const getAllPosts = () => {
    return fetch(baseUrl).then((res) => res.json());
};

export const getUserByFireBaseUserId = (fireId) => {
    return fetch(baseUrl + `/${fireId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
}