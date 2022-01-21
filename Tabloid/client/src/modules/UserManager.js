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
    return fetch(`${userUrl}/ActivateOrDeactivate/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
    });
}

export const updateUserType = (profile) => {
    return fetch(`${userUrl}/UpdateUserType/${profile.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
    });
}

export const getDeactivatedIds = () => {
    return fetch(userUrl + `/GetDeactivatedIds`).then((res) => res.json());
};

export const getDeactivatedUserEmails = () => {
    return fetch(userUrl + `/GetDeactivatedUserEmails`).then((res) => res.json());
};