import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Table, Button } from "reactstrap";
import { getAllPosts } from "../modules/PostManager";
import { useHistory } from "react-router";

const PostList = () => {
    const history = useHistory();

    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        getAllPosts().then((posts) => setPosts(posts));
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="container">
            <Button
                className="mt-2"
                color="success"
                onClick={() => history.push("/addPost")}
            >
                New Post
            </Button>
            <div className="row justify-content-center">
                {posts.map((post) => (
                    <Post post={post} key={post.id} />
                ))}
            </div>
        </div>
    );
};

export default PostList;
