import React, { useEffect, useState } from "react";
import Category from "./Category";
import { getAllCategories } from "../../modules/CategoryManager";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { Table } from "reactstrap";

const CategoryList = () => {

    const history = useHistory();

    const [categories, setCategories] = useState([]);

    const checkIsAdmin = parseInt(localStorage.getItem("LoggedInUserType")) == 1

    const getCategories = () => {
        getAllCategories().then((category) => setCategories(category));
    };

    const handleDeleteClick = (id) => {
        history.push(`/removeCategory/${id}`)
    }

    useEffect(() => {
        if (checkIsAdmin) {
            getCategories();
        }
    }, []);

    return (
        <div className="container">
            <h1>Categories</h1>
            <Button className="mt-2" color="success" onClick={() => history.push("/addCategory")}>
                New Category
            </Button>{" "}
            <Table className="mt-2">
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <Category category={category} handleDeleteClick={handleDeleteClick} key={category.id} />
                    ))}
                </tbody>
            </Table>
        </div >
    );
};

export default CategoryList;
