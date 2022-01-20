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

export const getUserById = (id) => {
    return fetch(userUrl + `/GetUserProfileByUserId/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
}

export const updateUser = (id) => {
    return fetch(`${userUrl}/aOrD/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
    });
}

export const getDeactivated = () => {
    return fetch(userUrl + `/GetDeactivated`).then((res) => res.json());
};