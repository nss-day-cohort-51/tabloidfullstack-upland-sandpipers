import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import DeletePost from "./DeletePost";
import { useHistory } from "react-router-dom";


let userId = parseInt(localStorage.getItem("LoggedInUserId"));


const Post = ({ post }) => {

    const history = useHistory();

    const handleDelete = () => {
        history.push(`/deletepost/${post.id}`)
    }

    return (
        <Card className="post">
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

                </CardBody>
            </Link>
            {userId == post.userProfile.id ? <Button onClick={handleDelete}>Delete</Button>
                : <></>}
        </Card>
    );
};

export default Post;
