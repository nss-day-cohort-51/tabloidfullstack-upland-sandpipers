import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const User = ({ user }) => {
    return (
        <ListGroup>
            <ListGroupItem>
                <p className="text-left px-2">
                    Name: {User.name}
                </p>
            </ListGroupItem>
        </ListGroup>
    );
};

export default User;
