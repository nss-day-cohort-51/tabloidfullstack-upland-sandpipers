import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { getTextReadTimeString } from "../../Utils/ReadTime";

const SubscribedPost = ({ post }) => {

    return (
        <>
            <Card className="post">
                <Link
                    to={`/posts/${post.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                >
                    <p className="text-left px-2">
                        Posted by: {post.userProfile.displayName}
                    </p>
                    <p className="text-left px-2">
                        Estimated read time : {getTextReadTimeString(post.content)}
                    </p>
                    <CardBody>
                        <p>
                            <strong>{post.title}</strong>
                        </p>
                        <p>{post.content}</p>
                        <br></br>
                    </CardBody>
                </Link>
            </Card>
        </>
    );
};

export default SubscribedPost;
