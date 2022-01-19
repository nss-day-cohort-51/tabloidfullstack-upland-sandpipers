import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import DeletePost from "./DeletePost";


let userId = parseInt(localStorage.getItem("LoggedInUserId"));


const Post = ({ post }) => {
    return (
        <Card>
            <Link
                to={`/posts/${post.id}`}
                style={{ textDecoration: "none", color: "black" }}
            >
                <p className="text-left px-2">
                    Posted by: {post.userProfile.displayName}
                </p>
                <CardBody>
                    <p>
                        <strong>{post.title}</strong>
                    </p>
                    <p>{post.content}</p>
                    <br></br>
                    {userId == post.userProfile.id ? <Button onClick={<DeletePost />}>Delete</Button>
                        : <></>}
                </CardBody>
            </Link>
        </Card>
    );
};

export default Post;
