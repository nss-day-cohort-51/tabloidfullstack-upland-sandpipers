import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const Category = ({ category, handleDeleteClick }) => {

    const history = useHistory();

    const handleEdit = () => {
        history.push(`/editcategory/${category.id}`);
    };

    return (
        <tr>
            <th scope="row">{category.name}</th>
            <td>
                <Button color="primary" onClick={handleEdit}>edit</Button>{' '}
                <Button color="danger" id={category.id} onClick={(event) => handleDeleteClick(event.target.id)}>delete</Button>{' '}
            </td>

        </tr>
    );
};

export default Category;