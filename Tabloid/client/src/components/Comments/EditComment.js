import React from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getCommentById } from "../../modules/CommentManager";

export const EditComment = () => {
    const [comment, setComment] = ({
        Content: "",
        Subject: ""
    })

    const { id } = useParams();

    const history = useHistory();

    useEffect(() => {
        getCommentById(id).then((res) => {
            setComment(res)
        })
    }, []);

    const handleControlledInputChange = (event) => {
        const newComment = { ...comment };
        let selectedVal = event.target.value;
        // forms always provide values as strings. But we want to save the ids as numbers.
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal);
        }
        newComment[event.target.id] = selectedVal;
        // update state
        setComment(newComment);
    };

    const handleClickSaveComment = (e) => {
        e.preventDefault();

    }


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
}

export default EditComment;