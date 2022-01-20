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
        <Card>
            {user.imageLocation ? (
                <div className="userDetails__headerImage">
                    <img src={user.imageLocation} alt="profile"></img>
                </div>
            ) : (
                <></>
            )}
            <p>
                <strong>{user?.displayName}</strong>
            </p>
            <div className="userDetails__header">
                <span className="text-left x-2">
                    Full Name: {user?.firstName}
                </span>
                <span className="text-left px-2">
                    Creation Date: {user?.CreateDate}
                </span>
                <span className="text-left px-2">
                    Email: {user?.email}
                </span>
                <span className="text-left px-2">
                   User Type: {user?.userType.name}
                </span>
            </div>
            <Button
                className="mt-2"
                color="danger"
            >
               Deactivate User
            </Button>
        </Card>
    );
};
export default UserDetails;
