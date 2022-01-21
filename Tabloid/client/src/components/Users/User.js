import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { getDeactivated } from "../../modules/UserManager";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const User = ({ user, deactivatedList }) => {

    const history = useHistory();

    const [isDeactivated, setisDeactivated] = useState(false);

    const handleUserSelected = () => {
        history.push(`/updateUserType/${user.id}`)
    }

    useEffect(() => {
        deactivatedList.forEach(element => {
            if (element == user.id) {
                setisDeactivated(true);
            }
        });
    }, [deactivatedList])

    return (

        <tbody className="userList">
            <td>{user.displayName} </td>
            <td>{user.firstName} {user.lastName} </td>
            <td>{user.email} </td>
            <td>{user.userTypeId == 1 ? 'Admin' : user.userTypeId == 2 ? 'Author' : 'Deactivated'} </td>
            <img src={user.imageLocation} alt="Users Picture" />
            <ul className="userListButtons">
                <li>
                    <Button
                        id={`manageActivated--${user.id}`}
                        onClick={handleUserSelected}
                        color={isDeactivated ? "danger" : "warning"}
                    >
                        {isDeactivated ? "Reactivate" : "Deactivate"}
                    </Button>
                </li>
                <li><Button color="info" onClick={() => history.push(`/users/${user.id}`)}>View Details</Button></li>
            </ul>
        </tbody>

    );
};

export default User;
