import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getAllPosts, getPostsByUserId } from "../../modules/PostManager";

const MyPostsList = () => {
    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        let userId = parseInt(localStorage.getItem("LoggedInUserId"));
        getPostsByUserId(userId).then((resp) => setPosts(resp));
    };

    useEffect(() => {
        setTimeout(() => {
            getPosts();
        }, 300)
    }, []);

    return (
        <div className="container">
            <h1>My Posts</h1>
            <div className="row justify-content-center">
                {posts.length < 1 ? (
                    <h1>You have no posts</h1>
                ) : (
                    posts.map((post) => <Post post={post} key={post.id} />)
                )}
            </div>
        </div>
    );
};

export default MyPostsList;
