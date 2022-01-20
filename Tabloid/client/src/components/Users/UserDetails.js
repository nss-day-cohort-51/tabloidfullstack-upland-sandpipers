import React from "react";
import { Card } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../modules/UserManager";
import { Button } from "reactstrap";
// import { useHistory } from "react-router";

const UserDetails = () => {
  const [user, setUser] = useState([]);

  const { id } = useParams();

  const getUser = () => {
    getUserById(id).then((user) => setUser(user));
  };

  useEffect(() => {
    getUser();
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
    </Card>
  );
};
export default UserDetails;
