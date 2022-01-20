import React, { useState } from "react";
import { useHistory } from "react-router";
import { addTag, getTag, updateTag } from "../../modules/TagManager";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EditTag = () => {
    const [tag, setTag] = useState({
        name: "",
    });
    const { id } = useParams();

    const history = useHistory();

    useEffect((event) => {
        getTag(id).then((res) => {
            setTag(res);
        });
    }, []);

    const handleControlledInputChange = (event) => {
        const newTag = { ...tag };
        let selectedVal = event.target.value;

        newTag[event.target.id] = selectedVal;
        // update state
        setTag(newTag);
    };

    const handleConfirm = (event) => {
        event.preventDefault();

        updateTag(tag).then(() => history.push("/tags"));
    };

    return (
        <form className="main-content">
            <h2 className="_title">Edit Tag:</h2>
            <fieldset className="fieldset">
                <div className="form-group">
                    <label htmlFor="name">Tag name:</label>
                    <input
                        type="text"
                        id="name"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Name"
                        value={tag.name}
                    />
                </div>
            </fieldset>
            <button
                className="btn-add-delete"
                variant="primary"
                onClick={handleConfirm}
            >
                Submit
            </button>
            <button
                className="btn-add-edit"
                variant="secondary"
                onClick={() => history.push("/tags")}
            >
                Cancel
            </button>
        </form>
    );
};

export default EditTag;
