import React, { useState } from "react";
import { useHistory } from "react-router";
import { addCategory } from "../../modules/CategoryManager";

export const AddCategory = () => {
    const [category, setCategory] = useState({
        name: "",
    });

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newCategory = { ...category };
        let selectedVal = event.target.value;
        // forms always provide values as strings. But we want to save the ids as numbers.
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal);
        }
        newCategory[event.target.id] = selectedVal;
        // update state
        setCategory(newCategory);
    };

    const handleClickSaveCategory = (event) => {
        event.preventDefault(); //Prevents the browser from submitting the form
        console.log(category);
        addCategory(category).then(() => history.push("/categories"));
    };

    return (
        <form className="main-content">
            <h2 className="_title">New Category:</h2>
            <fieldset className="fieldset">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Name"
                        value={category.name}
                    />
                </div>
            </fieldset>
            <button className="btn-add-save" onClick={handleClickSaveCategory}>
                Save Category
            </button>
            <button
                className="btn-add-edit"
                onClick={() => history.push("/categories")}
            >
                Cancel
            </button>
        </form>
    );
};

export default AddCategory;
