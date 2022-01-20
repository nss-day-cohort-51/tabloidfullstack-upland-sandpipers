import React from "react";
import { Card, CardBody } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../modules/PostManager";
import { Table, Button } from "reactstrap";
import DeleteComment from "../Comments/DeleteComment";
import { useHistory } from "react-router";
import { getCommentsByPostId } from "../../modules/CommentManager";

const Post = () => {
    const history = useHistory();
    const currentUser = localStorage.getItem("LoggedInUserId")
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
        getCommentsByPostId(id).then((rsp) => {
            setComments(rsp);
            console.log(rsp);
        });
    };

    useEffect(() => {
        getPosts();
        getComments();
    }, []);

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
                <h4>Tags</h4>
                <ul>
                    {post.tags != null
                        ? post.tags.map((t) => <li>{t.name}</li>)
                        : null}
                </ul>
                {/* <br></br> */}
                {comments.length != 0 ? <h4>Comments</h4> : null}
                <ul>
                    {comments != null
                        ? comments.map((c) => (
                            <li className="commentList">
                                <Card>
                                    <h4>{c.subject}</h4>
                                    <p>{c.content}</p>
                                    <p>
                                        Posted By: {c.userProfile.displayName}
                                    </p>
                                    {c.userProfile.id == currentUser ? <Button color="danger" onClick={() => history.push(`/deletecomment/${c.id}`)}>Delete</Button> : <></>
                                    }
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
            <Button color="info" onClick={() => history.push(`/addReaction`)}>
        Create New Reaction
      </Button>
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
        </Card >
    );
};

export default Post;
