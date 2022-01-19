const userUrl = "/api/UserProfile";


export const GetAllUsers = () => {
    return fetch(userUrl).then((res) => res.json());
};

export const getUserByFireBaseUserId = (fireId) => {
    return fetch(userUrl + `/${fireId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
}