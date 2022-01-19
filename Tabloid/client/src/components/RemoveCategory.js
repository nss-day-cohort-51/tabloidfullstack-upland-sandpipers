import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { deleteCategory } from "../modules/CategoryManager";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { useParams } from "react-router-dom";

const RemoveCategory = ({ category }) => {

    const { catId } = useParams()

    const history = useHistory();

    const handleDeleteCategory = () => {
        console.log(catId)
        deleteCategory(catId).then(() => history.push("/categories"))

    }

    return (
        <form className="main-content">
            <h2 className="_title">Are you sure you want to delete this category?</h2>
            <br></br>
            <Button color="danger" className="btn-add-delete" onClick={handleDeleteCategory}>
                Delete Category
            </Button>
            <br></br>
            <br></br>
            <Button
                className="btn-add-edit"
                onClick={() => history.push("/categories")}
            >
                Cancel
            </Button>
        </form>
    );
};

export default RemoveCategory;