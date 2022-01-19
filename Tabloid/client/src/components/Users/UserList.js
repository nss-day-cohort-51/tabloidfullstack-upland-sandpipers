import React, { useEffect, useState } from "react";
import User from "./User";
import { GetAllUsers } from "../../modules/UserManager";
import { Table } from "reactstrap";

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
            <Table>
                <thead>
                    <tr>
                        <th>Display Name</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Profile Picture</th>
                    </tr>
                </thead>
                {users.map((user) => (
                    <User user={user} key={user.id} />
                ))}
            </Table>
        </div>
    );
};

export default UserList;
