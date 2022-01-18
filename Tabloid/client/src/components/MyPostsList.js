import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getAllPosts, getPostsByUserId } from "../modules/PostManager";

const MyPostsList = () => {
    const [posts, setPosts] = useState([]);

    const getPosts = () => {

        let userId = parseInt(sessionStorage.getItem("LoggedInUserId"));
        getPostsByUserId(userId).then(resp => setPosts(resp));

    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                {posts.map((post) => (
                    <Post post={post} key={post.id} />
                ))}
            </div>
        </div>
    );
};

export default MyPostsList;