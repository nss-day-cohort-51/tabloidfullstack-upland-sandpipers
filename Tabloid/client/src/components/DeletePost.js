import React from "react";
import { Card, CardBody, Button } from "reactstrap";


const DeletePost = ({ post }) => {
    return (
        <Card>
            <CardBody>
                <p>
                    <strong></strong>
                </p>
                <p>Are you sure you want to delete this post? </p>
                <br></br>
                <Button>Cancel</Button>
                <Button style={"background - color:red;"}>Delete</Button>
            </CardBody>
        </Card >
    );
};

export default DeletePost;
