import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

const Reaction = ({ reaction }) => {
    const history = useHistory();

    const handleDelete = () => {
        history.push(`/deleteReaction/${reaction.id}`);
    };
    // const handleEdit = () => {
    //     history.push(`/editReaction/${reaction.id}`);
    // };

    return (
        <tr>
            <th scope="row">{reaction.name}</th>
            <td>
                <Button className="mr-2" color="primary" onClick={handleEdit}>
                    edit
                </Button>
                <Button color="danger" onClick={handleDelete}>
                    delete
                </Button>
            </td>
        </tr>
    );
};

export default Reaction;
