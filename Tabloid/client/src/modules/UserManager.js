import { getToken } from "./authManager";

const userUrl = "/api/UserProfile";

export const GetAllUsers = () => {
    return getToken().then((token) => {
        return fetch(userUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());
    });
};

export const getUserByFireBaseUserId = (fireId) => {
    return getToken().then((token) => {
        return fetch(userUrl + `/${fireId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
    });
};
