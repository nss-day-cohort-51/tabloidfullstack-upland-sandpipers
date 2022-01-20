import { getToken } from "./authManager";

const baseUrl = "/api/category";

export const getAllCategories = () => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());
    });
};

export const addCategory = (category) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },

            body: JSON.stringify(category),
        });
    });
};

export const getWithComments = () => {
    return getToken().then((token) => {
        return fetch(baseUrl + "/getwithcomments", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
    });
};

export const getBySearch = (q, isSort) => {
    return getToken().then((token) => {
        return fetch(baseUrl + `/search?q=${q}&sortDesc=${isSort}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
    });
};

export const getCategoryById = (categoryId) => {
    return getToken().then((token) => {
        return fetch(baseUrl + `/${categoryId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then((resp) => resp.json());
    });
};

export const deleteCategory = (categoryId) => {
    return getToken().then((token) => {
        return fetch(baseUrl + `/${categoryId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    });
};

export const updateCategory = (category) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${category.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },

            body: JSON.stringify(category),
        });
    });
};
