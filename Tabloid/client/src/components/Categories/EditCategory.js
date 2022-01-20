import React, { useState } from "react";
import { useHistory } from "react-router";
import { updateCategory, getCategoryById } from "../../modules/CategoryManager";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";

export const EditCategory = () => {
    const [category, setCategory] = useState({
        name: "",
    });
    const { id } = useParams();

    const history = useHistory();

    useEffect((event) => {
        getCategoryById(id).then((res) => {
            setCategory(res);
        });
    }, []);

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
        updateCategory(category).then(() => history.push("/categories"));
    };

    return (
        <form className="main-content">
            <h2 className="_title">Edit Category:</h2>
            <fieldset className="fieldset">
                <div className="form-group">
                    <label htmlFor="name">Category : </label>
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
            <Button color="primary" onClick={handleClickSaveCategory}>
                Save Changes
            </Button>
            <Button color="danger"
                onClick={() => history.push("/categories")}
            >
                Cancel
            </Button>
        </form>
    );
};

export default EditCategory;
