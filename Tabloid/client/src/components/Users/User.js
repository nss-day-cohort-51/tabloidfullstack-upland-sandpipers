import React from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useHistory } from "react-router-dom";

const User = ({ user }) => {
  const history = useHistory();

  const handleOnClick = () => {
    history.push(`/users/${user.id}`);
  };
  return (
    <tbody onClick={handleOnClick} className="userList">
      <td>{user.displayName} </td>
      <td>
        {user.firstName} {user.lastName}{" "}
      </td>
      <td>{user.email} </td>
      <td>{user.userTypeId == 1 ? "Admin" : "Author"} </td>
      <img src={user.imageLocation} alt="Users Picture" />
    </tbody>
  );
};

export default User;
