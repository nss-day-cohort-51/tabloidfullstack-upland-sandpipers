import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const User = ({ user }) => {
    return (

        <tbody className="userList">
            <td>{user.displayName} </td>
            <td>{user.firstName} {user.lastName} </td>
            <td>{user.email} </td>
            <td>{user.userTypeId == 1 ? 'Admin' : 'Author'} </td>
            <img src={user.imageLocation} alt="Users Picture" />
        </tbody>

    );
};

export default User;
