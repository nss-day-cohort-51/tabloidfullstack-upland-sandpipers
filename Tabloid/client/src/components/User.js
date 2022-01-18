import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
    return (
        <ListGroup>
            <p className="text-left px-2">
                Posted by: {post.userProfile.displayName}
            </p>
            <ListGroupItem>

            </ListGroupItem>
        </ListGroup>
    );
};

export default Post;
