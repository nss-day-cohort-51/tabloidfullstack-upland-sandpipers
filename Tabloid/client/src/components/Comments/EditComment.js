import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getCommentById, updateComment } from "../../modules/CommentManager";

export const EditComment = () => {
    const [comment, setComment] = useState([])

    const { id } = useParams();

    const history = useHistory();

    useEffect((event) => {
        getCommentById(id).then(setComment)
    }, []);

    const handleControlledInputChange = (event) => {
        const newComment = { ...comment };
        let selectedVal = event.target.value;

        newComment[event.target.id] = selectedVal;
        setComment(newComment);
    };

    const handleClickSaveComment = (e) => {
        e.preventDefault();
        updateComment(id).then(() => history.goBack());
    }


    return (
        <form className="main-content">
            <h2 className="_title">Edit Comment:</h2>
            <fieldset className="fieldset">
                <div className="form-group">
                    <label htmlFor="subject">Comment :</label>
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
                    <label htmlFor="subject">Subject :</label>
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
            <button className="btn-add-save" onClick={handleClickSaveComment}>
                Submit
            </button>
            <button
                className="btn-add-edit"
                onClick={() => history.goBack()}
            >
                Cancel
            </button>
        </form>
    );
}

export default EditComment;