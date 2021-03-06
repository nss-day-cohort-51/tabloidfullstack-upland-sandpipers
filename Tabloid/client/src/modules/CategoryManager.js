const baseUrl = "/api/category";

export const getAllCategories = () => {
    return fetch(baseUrl).then((res) => res.json());
};

export const addCategory = (category) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
    });
};

export const getWithComments = () => {
    return fetch(baseUrl + "/getwithcomments", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
};

export const getBySearch = (q, isSort) => {
    return fetch(baseUrl + `/search?q=${q}&sortDesc=${isSort}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
};

export const getCategoryById = (categoryId) => {
    return fetch(baseUrl + `/${categoryId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((resp) => resp.json());
};

export const deleteCategory = (categoryId) => {
    return fetch(baseUrl + `/${categoryId}`, {
        method: "DELETE"
    })
}

export const updateCategory = (category) => {
    return fetch(`${baseUrl}/${category.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
    });
};
