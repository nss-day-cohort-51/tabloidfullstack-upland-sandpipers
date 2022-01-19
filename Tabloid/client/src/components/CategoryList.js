import React, { useEffect, useState } from "react";
import Category from "./Category";
import { getAllCategories } from "../modules/CategoryManager";
import { useHistory } from "react-router-dom";
import {Button} from "reactstrap"

const CategoryList = () => {
    const history = useHistory();
    const [categories, setCategories] = useState([]);

    const checkIsAdmin = parseInt(localStorage.getItem("LoggedInUserType")) == 1

    const getCategories = () => {
        getAllCategories().then((category) => setCategories(category));
    };

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
            <div className="row justify-content-center">
                <ul className="categoriesUL">
                    {categories.map((category) => (
                        <li><Category category={category} key={category.Id} /></li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoryList;