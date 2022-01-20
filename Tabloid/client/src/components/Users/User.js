import React from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

const User = ({ user }) => {
    return (

        <tbody className="userList">
            <td>{user.displayName} </td>
            <td>{user.firstName} {user.lastName} </td>
            <td>{user.email} </td>
            <td>{user.userTypeId == 1 ? 'Admin' : 'Author'} </td>
            <Link
                to={`/users/${user.id}`}
                style={{ textDecoration: "none", color: "black" }}
            >
            <img src={user.imageLocation} alt="Users Picture" />
            </Link>
        </tbody>

    );
};

export default User;
