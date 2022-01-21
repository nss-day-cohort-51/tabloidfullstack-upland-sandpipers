import React, { useState, useEffect } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { getPostById } from "../../modules/PostManager";
import { getCommentsByPostId } from "../../modules/CommentManager";
import {
    addSubscription,
    cancelSubscription,
    getUserProviderSubscription,
} from "../../modules/SubscriptionManager";
import { SubscribeButton } from "../Utils/SubscribeButton";

const Post = () => {
    const history = useHistory();
    const currentUser = localStorage.getItem("LoggedInUserId");
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [subscription, setSubscription] = useState(null);

    const { id } = useParams();

    const getPosts = () => {
        getPostById(id).then((post) => {
            setPost(post);
        });
    };

    const getComments = () => {
        getCommentsByPostId(id).then((rsp) => {
            setComments(rsp);
        });
    };

    const getSubscription = () => {
        getUserProviderSubscription(currentUser, post.userProfile?.id)?.then(
            (resp) => setSubscription(resp)
        );
    };

    useEffect(() => {
        getPosts();
        getComments();
    }, []);

    useEffect(() => {
        if (subscription == null) {
            getSubscription();
        }
    }, [currentUser, post]);

    const handleSubscribeClicked = () => {
        debugger;
        if (!subscription) {
            addSubscription(currentUser, post.userProfile.id).then(
                getSubscription
            );
        } else {
            cancelSubscription(subscription);
            setSubscription(null);
        }
    };

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

                                      {c.userProfile.id == currentUser ? (
                                          <>
                                              <Button
                                                  color="danger"
                                                  onClick={() =>
                                                      history.push(
                                                          `/deletecomment/${c.id}`
                                                      )
                                                  }
                                              >
                                                  Delete
                                              </Button>
                                              <Button
                                                  color="info"
                                                  onClick={() =>
                                                      history.push(
                                                          `/editcomment/${c.id}`
                                                      )
                                                  }
                                              >
                                                  Edit
                                              </Button>
                                          </>
                                      ) : (
                                          <></>
                                      )}
                                  </Card>
                              </li>
                          ))
                        : null}
                </ul>
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
            <SubscribeButton
                handleSubscribeClicked={handleSubscribeClicked}
                isSubscribed={!(subscription == null)}
                post={post}
            />
        </Card>
    );
};

export default Post;
