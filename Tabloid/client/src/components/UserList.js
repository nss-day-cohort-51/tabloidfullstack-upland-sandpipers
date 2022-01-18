import React, { useEffect, useState } from "react";
import User from "./User";
import { GetAllUsers } from "../modules/UserManager";

const UserList = () => {
    const [users, setUsers] = useState([]);

    const getUsers = () => {
        GetAllUsers().then((users) => setUsers(users));
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                {users.map((user) => (
                    <User user={user} key={user.id} />
                ))}
            </div>
        </div>
    );
};

export default UserList;
