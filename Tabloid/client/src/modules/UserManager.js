const baseUrl = "/api/userProfile";


export const getAllPosts = () => {
    return fetch(baseUrl).then((res) => res.json());
};