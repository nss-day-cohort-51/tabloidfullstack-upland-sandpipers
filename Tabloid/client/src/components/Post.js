import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
    return (
        <Card>
            <p className="text-left px-2">
                Posted by: {post.userProfile.displayName}
            </p>
            <CardBody>
                <p>
                    <strong>{post.title}</strong>
                </p>
                <p>{post.content}</p>
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
        </Card>
    );
};

export default Post;
