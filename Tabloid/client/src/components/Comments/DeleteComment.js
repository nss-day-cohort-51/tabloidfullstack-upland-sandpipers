import React, { useState } from "react";
import { useHistory } from "react-router";
import { deleteComment } from "../../modules/CommentManager";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";

const DeleteComment = () => {
    const { id } = useParams();

    const history = useHistory();

    const handleConfirm = (event) => {
        event.preventDefault();
        deleteComment(id).then(() => history.push("/"));
    };

    return (
        <form className="main-content">
            <h2 className="_title">Delete Comment</h2>
            <h5>Are you sure you want to delete comment?</h5>
            <Button
                className="btn-add-delete"
                color="danger"
                onClick={handleConfirm}
            >
                Delete
            </Button>
            <Button
                className="btn-add-edit"
                color="secondary"
                onClick={() => history.push(`/posts`)}
            >
                Cancel
            </Button>
        </form>
    );
};

export default DeleteComment;
