import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Category = ({ category }) => {
    return (
        <Card>
            <CardBody>
                <p>
                    <strong>{category.name}</strong>
                </p>
                {/* <Link to={`/posts/${post.id}`}>
                    <strong>{post.title}</strong>
                </Link> */}
            </CardBody>
        </Card>
    );
};

export default Category;