import React, { useEffect, useState } from "react";
import Category from "./Category";
import { getAllCategories } from "../modules/CategoryManager";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        getAllCategories().then((category) => setCategories(category));
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="container">
            <h1>Categories</h1>
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