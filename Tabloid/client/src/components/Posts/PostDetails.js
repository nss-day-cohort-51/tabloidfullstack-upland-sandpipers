import React from "react";
import { Card, CardBody } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../modules/PostManager";
import { Table, Button } from "reactstrap";

import { useHistory } from "react-router";
import { getCommentsByPostId } from "../../modules/CommentManager";

const Post = () => {
    const history = useHistory();

    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);

    const { id } = useParams();

    const getPosts = () => {
        getPostById(id).then((post) => {
            setPost(post);
            console.log(post);
        });
    };

    const getComments = () => {
        getCommentsByPostId(id).then(rsp => {
            setComments(rsp);
            console.log(rsp);
        })
    }

    useEffect(() => {
        getPosts();
        getComments();
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
                {comments.length != 0 ? <h4>Comments</h4> : null}
                <ul>
                    {comments != null
                        ? comments.map((c) => (
                            <li className="commentList">
                                <Card>
                                    <h4>{c.subject}</h4>
                                    <p>{c.content}</p>
                                    <p>Posted By: {c.userProfile.displayName}</p>
                                </Card>
                            </li>
                        ))
                        : null}
                </ul>
                {/* <br></br>
                {/* <Link to={`/posts/${post.id}`}>
                    <strong>{post.title}</strong>
                </Link> */}
            </CardBody>
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
