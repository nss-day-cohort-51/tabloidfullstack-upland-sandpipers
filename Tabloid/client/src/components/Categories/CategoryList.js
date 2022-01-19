import React, { useEffect, useState } from "react";
import Category from "./Category";
import { getAllCategories } from "../../modules/CategoryManager";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    const checkIsAdmin =
        parseInt(localStorage.getItem("LoggedInUserType")) == 1;

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
            {checkIsAdmin ? (
                <>
                    <h1>Categories</h1>
                    <div className="row justify-content-center">
                        <ul className="categoriesUL">
                            {categories.map((category) => (
                                <li>
                                    <Category
                                        category={category}
                                        key={category.Id}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default CategoryList;
