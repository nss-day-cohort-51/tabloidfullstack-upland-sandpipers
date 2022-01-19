import React from "react";
import { Card, CardBody } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../modules/PostManager";
import { Table, Button } from "reactstrap";

import { useHistory } from "react-router";

const Post = () => {
    const history = useHistory();

    const [post, setPost] = useState([]);
    const { id } = useParams();

    const getPosts = () => {
        getPostById(id).then((post) => {
            setPost(post);
        });
    };

    useEffect(() => {
        getPosts();
    }, []);

    // Title
    // Header image (if exists)
    // Content
    // Publication date (MM/DD/YYYY)
    // Author's Display Name

    return (
        <Card>
            {post.imageLocation ? (
                <div className="postDetails__headerImage">
                    <img src={post.imageLocation} alt="profile"></img>
                </div>
            ) : (
                <></>
            )}
            <p>
                <strong>{post?.title}</strong>
            </p>
            <div className="postDetails__header">
                <span className="text-left x-2">
                    Posted by: {post.userProfile?.displayName}
                </span>
                <span className="text-left px-2">
                    Posted: {post?.publishDateTime?.split("T")[0]}
                </span>
            </div>
            <CardBody>
                <p>{post?.content}</p>
                <br></br>
                {/* <h4>Categories</h4> */}
                {/* <ul>
                    {post.categories != null
                        ? post.categories.map((c) => (
                              <li>
                                  {c.message} - Posted By: {c.userProfile.name}
                              </li>
                          ))
                        : null}
                </ul> */}
                {/* <br></br> */}
                {/* <Link to={`/posts/${post.id}`}>
                    <strong>{post.title}</strong>
                </Link> */}
            </CardBody>
            <Button
                className="mt-2"
                color="success"
                onClick={() => history.push(`../manageTags/${id}`)}
            >
                Manage Tags
            </Button>
            <Button
                className="mt-2"
                color="success"
                onClick={() => history.push(`../newComment/${id}`)}
            >
                Add Comment
            </Button>
        </Card>
    );
};

export default Post;
