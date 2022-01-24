import React, { useState } from "react";
import { useHistory } from "react-router";
import { getTag, deleteTag } from "../../modules/TagManager";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const DeleteTag = () => {
    const [tag, setTag] = useState({
        name: "",
    });
    const { id } = useParams();

    const history = useHistory();

    useEffect(() => {
        getTag(id).then((res) => {
            setTag(res);
        });
    }, []);

    const handleConfirm = (event) => {
        event.preventDefault();

        deleteTag(tag).then(() => history.push("/tags"));
    };

    return (
        <form className="main-content">
            <h2 className="_title">Delete Tag:</h2>
            <p>Are you sure you want to delete {tag.name}?</p>
            <button
                className="btn-add-delete"
                variant="danger"
                onClick={handleConfirm}
            >
                Delete
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

export default DeleteTag;
