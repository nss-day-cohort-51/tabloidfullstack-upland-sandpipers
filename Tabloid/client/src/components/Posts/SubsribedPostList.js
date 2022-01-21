import React, { useEffect, useState } from "react";
import { getAllPosts, getPostsBySubscription } from "../../modules/PostManager";
import SubscribedPost from "./SubscribedPost";

const SubscribedPostList = () => {
    const [posts, setPosts] = useState([]);

    const currentUser = localStorage.getItem("LoggedInUserId")

    const getPosts = () => {
        getPostsBySubscription(currentUser).then(setPosts)
    };

    useEffect(() => {
        setTimeout(() => {
            getPosts();
        }, 300)
    }, []);

    return (
        <div className="container">
            <h3>Welcome Back!</h3>
            <div className="row justify-content-center">
                <h2>Subscribed Feed</h2>
                {posts.length < 1 ? (
                    <h1>You have no posts</h1>
                ) : (
                    posts.map((post) =>
                        <SubscribedPost post={post} key={post.id} />)
                )}
            </div>
        </div >
    );
};

export default SubscribedPostList;
