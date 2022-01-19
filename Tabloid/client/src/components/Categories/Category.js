import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const Category = ({ category, handleDeleteClick }) => {

    return (
        <tr>
            <th scope="row">{category.name}</th>
            <td>
                <Button color="primary">edit</Button>{' '}
                <Button color="danger" id={category.id} onClick={(event) => handleDeleteClick(event.target.id)}>delete</Button>{' '}
            </td>

        </tr>
    );
};

export default Category;