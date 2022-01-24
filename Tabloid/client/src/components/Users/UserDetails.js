import React from "react";
import { Card } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAdminCount, getUserById } from "../../modules/UserManager";
import { Button } from "reactstrap";
import { useHistory } from "react-router";

const UserDetails = () => {

  const history = useHistory();

  const [user, setUser] = useState([]);
  const [adminCount, setAdminCount] = useState(0);

  const { id } = useParams();

  const getUser = () => {
    getUserById(id).then((user) => setUser(user));
  };

  const countAdmins = () => {
    getAdminCount().then(res => setAdminCount(res))
  }

  useEffect(() => {
    getUser();
    countAdmins();
  }, []);

  return (
    <Card className="d-flex justify-content-sm-around align-items-baseline p-5">
      <div className="ImageDisplayName">
        <p>
          Display Name: <strong>{user.displayName}</strong>
        </p>
        {user.imageLocation ? (
          <div className="userDetails__headerImage">
            <img src={user.imageLocation} alt="profile"></img>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="userDetails__body">
        <div className="text-left">Full Name: {user?.fullName}</div>
        <div className="text-left ">Creation Date: {user.createDate}</div>
        <div className="text-left">Email: {user.email}</div>
        <div className="text-left">User Type: {user.userType?.name}</div>
      </div>
      <ul className="userListButtons">
        {user.userTypeId == 3 ? null : adminCount < 2 && user.userTypeId == 1 ? null : <li>
          <Button color="primary" onClick={() => history.push(`/userEdit/${user.id}`)}>
            Edit {user.firstName}'s Profile
          </Button>
        </li>}
        <li>
          <Button color="primary" onClick={() => history.push(`/userPosts/${user.id}`)}>
            View {user.firstName}'s Posts
          </Button>
        </li>
        <li>
          <Button color="secondary" onClick={() => history.goBack()}>
            Back
          </Button>
        </li>
      </ul>
    </Card>
  );
};
export default UserDetails;
