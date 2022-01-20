import React, { useState } from "react";
import { useHistory } from "react-router";
import { getTag, deleteTag } from "../../modules/TagManager";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../modules/UserManager";
import { Button } from "reactstrap";

const UpdateUserType = () => {
    const [user, setUser] = useState({});
    const { id } = useParams();

    const history = useHistory();

    useEffect(() => {
        getUserById(id).then(res => {
            setUser(res);
        })
    }, []);

    const handleConfirm = (event) => {
        event.preventDefault();
        updateUser(user.id).then(() => history.goBack());
    };

    return (
        <form className="main-content">
            {user.userTypeId == 3 ? <h2 className="_title">Reactivate:</h2> : <h2 className="_title">Deactivate:</h2>}
            {user.userTypeId == 3 ? <p>Are you sure you want to reactivate {user.displayName}?</p> : <p>Are you sure you want to deactivate {user.displayName}?</p>}
            <Button
                className="btn-add-delete"
                color="warning"
                variant="danger"
                onClick={handleConfirm}
            >
                Confirm
            </Button>
            <br />
            <Button
                className="btn-add-edit"
                color="primary"
                variant="secondary"
                onClick={() => history.push("/users")}
            >
                Cancel
            </Button>
        </form>
    );
};

export default UpdateUserType;