import React, { useEffect, useState } from "react";
import User from "./User";
import { GetAllUsers, getDeactivatedIds } from "../../modules/UserManager";
import { Table } from "reactstrap";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [deactivatedList, setDeactivatedList] = useState([]);

    const getUsers = () => {
        GetAllUsers().then((users) => setUsers(users));
    };

    const getDeactivatedUserIds = () => {
        getDeactivatedIds().then(resp => {
            setDeactivatedList(resp);
        })
    }

    useEffect(() => {
        getUsers();
        getDeactivatedUserIds();
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
                    <User user={user} deactivatedList={deactivatedList} key={user.id} />
                ))}
            </Table>
        </div>
    );
};

export default UserList;
