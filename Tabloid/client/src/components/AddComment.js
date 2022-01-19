import React, { useState } from "react";
import { useHistory } from "react-router";
import { addComment } from "../modules/CommentManager";
import { useParams } from "react-router-dom";

const AddComment = () => {
    const history = useHistory();
    const { id } = useParams();

    const [comment, setComment] = useState({
        subject: "",
        content: "",
        postId: id,
        userProfileId: localStorage.getItem("LoggedInUserId"),
    });

    const handleControlledInputChange = (event) => {
        const newComment = { ...comment };
        let selectedVal = event.target.value;

        newComment[event.target.id] = selectedVal;

        setComment(newComment);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); //Prevents the browser from submitting the form
        addComment(comment).then(() => history.push(`/posts/${id}`));
    };

    return (
        <form className="main-content">
            <h2 className="_title">New Comment:</h2>
            <fieldset className="fieldset">
                <div className="form-group">
                    <textarea
                        type="text"
                        id="content"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        rows="6"
                        className="form-control"
                        value={comment.content}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        className="form-control"
                        value={comment.subject}
                    />
                </div>
            </fieldset>
            <button className="btn-add-save" onClick={handleSubmit}>
                Submit
            </button>
            <button
                className="btn-add-edit"
                onClick={() => history.push(`/PostDetails/${id}`)}
            >
                Cancel
            </button>
        </form>
    );
};

export default AddComment;
