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
            <div className="row justify-content-center">
                {posts.length < 1 ? (
                    <div>
                        <h1 className="text-center">Subscribed Posts</h1>
                        <h2>You aren't subscribed to any users</h2>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-center">Subscribed Posts</h1>
                        {posts.map((post) =>
                            <SubscribedPost post={post} key={post.id} />)}
                    </div>
                )}
            </div>
        </div >
    );
};

export default SubscribedPostList;
