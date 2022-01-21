import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Table, Button } from "reactstrap";
import { getAllUnapprovedPosts } from "../../modules/PostManager";
import { useHistory } from "react-router";
import UnapprovedPost from "./UnapprovedPost";

const UnapprovedPostList = () => {
    const history = useHistory();

    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        getAllUnapprovedPosts().then(post => {
            console.log(post);
            setPosts(post)
        });
    };

    useEffect(() => {
        getPosts();
    }, []);


    return (
        <div className="container">
            <div className="UnapprovedPostList__NewPost--container">
                <h1>Unapproved Posts</h1>
            </div>
            <div className="row justify-content-center">
                {posts.map((post) => (
                    <UnapprovedPost post={post} key={post.id} />
                ))}
            </div>
        </div>
    );
};

export default UnapprovedPostList;