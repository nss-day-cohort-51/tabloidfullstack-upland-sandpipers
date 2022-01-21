import React, { useState } from "react";
import { useHistory } from "react-router";
import { getTag, deleteTag } from "../../modules/TagManager";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAdminCount, getUserById, updateUser } from "../../modules/UserManager";
import { Button } from "reactstrap";

const UpdateUserType = () => {

    const [user, setUser] = useState({});
    const [adminCount, setAdminCount] = useState(0);

    const { id } = useParams();

    const history = useHistory();

    useEffect(() => {
        getUserById(id).then(res => {
            setUser(res);
        })
        countAdmins();
    }, []);

    const countAdmins = () => {
        getAdminCount().then(res => setAdminCount(res))
    }

    const handleConfirm = (event) => {
        event.preventDefault();

        updateUser(user.id).then(() => history.goBack());
    };

    if (adminCount < 2 && user.userTypeId != 3) {
        return (
            <form className="main-content">
                <h2>Unable to Deactivate</h2>
                <p>Please add another Admin before removing anymore.</p>
                <Button
                    className="btn-add-edit"
                    color="primary"
                    variant="secondary"
                    onClick={() => history.push("/users")}
                >
                    Go Back
                </Button>
            </form>
        );
    }
    else {
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
    }
};

export default UpdateUserType;