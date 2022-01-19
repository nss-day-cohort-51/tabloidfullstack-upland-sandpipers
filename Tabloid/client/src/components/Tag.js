import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

const Tag = ({ tag }) => {
    const history = useHistory();

    const handleDelete = () => {
        history.push(`/delete/${tag.id}`);
    };
    const handleEdit = () => {
        history.push(`/edit/${tag.id}`);
    };

    return (
        <tr>
            <th scope="row">{tag.name}</th>
            <td>
                <Button color="primary" onClick={handleDelete}>
                    edit
                </Button>
                <Button color="primary" onClick={handleEdit}>
                    delete
                </Button>
            </td>
        </tr>
    );
};

export default Tag;
