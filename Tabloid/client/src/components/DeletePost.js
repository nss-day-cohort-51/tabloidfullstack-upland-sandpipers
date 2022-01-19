import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { deletePostById } from "../modules/PostManager";
import { useParams } from "react-router-dom";


const DeletePost = () => {

    const history = useHistory();
    const { id } = useParams();

    const handleCancel = () => {
        history.push("/myposts")
    }

    const handleDelete = () => {
        deletePostById(id)
        console.log(id);
        history.push("/myposts")
    }
    return (
        <Card>
            <CardBody>
                <p>Are you sure you want to delete this post? </p>
                <br></br>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </CardBody>
        </Card >
    );
};

export default DeletePost;
