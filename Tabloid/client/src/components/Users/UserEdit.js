import React, { useState } from "react";
import { useHistory } from "react-router";
import { getPostById, updatePost } from "../../modules/PostManager";
import { getAllCategories } from "../../modules/CategoryManager";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserById, updateUserType } from "../../modules/UserManager";

const EditUser = () => {

    const { id } = useParams();

    const [typeId, setTypeId] = useState({
    });



    const history = useHistory();

    const getUserType = () => {
        getUserById(id).then(resp => {
            setTypeId(resp);
        })
    };

    useEffect(() => {
        getUserType();
    }, []);

    const handleControlledInputChange = (event) => {
        const newProfile = { ...typeId }

        const selectedVal = event.target.id

        newProfile[selectedVal] = event.target.value;

        setTypeId(newProfile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        updateUserType(typeId).then(history.push("/users"));
    };

    return (
        <form className="main-content">
            <h2 className="_title">Add Post:</h2>
            <fieldset className="fieldset">

                <div className="form-group">
                    <label htmlFor="category">User Type:</label>
                    <select
                        value={typeId.userTypeId}
                        name="categoryId"
                        id="userTypeId"
                        onChange={handleControlledInputChange}
                        className="form-control"
                    >
                        <option value="0">Select a role</option>
                        <option value="1">Admin</option>
                        <option value="2">Author</option>
                    </select>
                </div>

            </fieldset>
            <button className="btn-edit-save" onClick={handleSubmit}>
                Submit
            </button>
            <button
                className="btn-edit-cancel"
                onClick={() => history.push(`/`)}
            >
                Cancel
            </button>
        </form>
    );
};

export default EditUser;