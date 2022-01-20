import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { getDeactivated } from "../../modules/UserManager";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const User = ({ user }) => {

    const history = useHistory();

    const [isDeactivated, setisDeactivated] = useState(false);

    const handleUserSelected = () => {
        history.push(`/updateUserType/${user.id}`)
    }

    useEffect(() => {
        getDeactivated().then(res => {
            res.forEach(element => {
                if (element.id == user.id) {
                    setisDeactivated(true);
                }
            });
        })
    }, [])

    return (

        <tbody className="userList">
            <td>{user.displayName} </td>
            <td>{user.firstName} {user.lastName} </td>
            <td>{user.email} </td>
            <td>{user.userTypeId == 1 ? 'Admin' : 'Author'} </td>
            <img src={user.imageLocation} alt="Users Picture" />
            {user.userTypeId == 1 ? null : <Button
                id={`manageActivated--${user.id}`}
                onClick={handleUserSelected}
                color={isDeactivated ? "danger" : "primary"}
            >
                {isDeactivated ? "Reactivate" : "Deactivate"}
            </Button>}
        </tbody>

    );
};

export default User;
