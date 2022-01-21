import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import DeletePost from "./DeletePost";
import { useHistory } from "react-router-dom";
import { getTextReadTimeString } from "../../Utils/ReadTime";

let userId = parseInt(localStorage.getItem("LoggedInUserId"));

const UnapprovedPost = ({ post }) => {
    const history = useHistory();

    return (
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

            <Button color="primary" onClick={() => history.push(`/approvePost/${post.id}`)}>
                Approve Post
            </Button>

        </Card>
    );
};

export default UnapprovedPost;