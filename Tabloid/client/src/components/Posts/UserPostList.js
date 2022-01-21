import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Table, Button } from "reactstrap";
import { getAllPosts, getPostsByUserId } from "../../modules/PostManager";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";

const UserPostList = () => {
    const history = useHistory();

    const { id } = useParams();

    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        getPostsByUserId(id).then(resp => {
            setPosts(resp);
        })
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="container">
            <div>
                <Button
                    color="info"
                    onClick={() => history.push("/users")}
                >
                    Back to users
                </Button>
            </div>
            <div className="row justify-content-center">
                {posts.length > 0 ? posts.map((post) => (
                    <Post post={post} key={post.id} />
                )) : <h1>User has no posts yet</h1>}
            </div>
        </div>
    );
};

export default UserPostList;