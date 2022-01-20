import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
import { addReaction } from "../../modules/ReactionManager";

export const AddReaction = () => {
    const [reaction, setReaction] = useState({
        name: "",
    });

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newReaction = { ...reaction };
        let selectedVal = event.target.value;

        newReaction[event.target.id] = selectedVal;
        // update state
        setReaction(newReaction);
    };

    const handleClickSaveReaction = (event) => {
        event.preventDefault(); //Prevents the browser from submitting the form
        console.log(reaction);
        addReaction(reaction).then(() => history.push("/reactions"));
    };

    return (
        <form className="main-content">
            <h2 className="_title">New Reaction</h2>
            <fieldset className="fieldset">
                <div className="form-group">
                    <label htmlFor="name">Reaction name:</label>
                    <input
                        type="text"
                        id="name"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Name"
                        value={reaction.name}
                    />
                     <label htmlFor="name">Reaction ImageUrl:</label>
                    <input
                        type="text"
                        id="imageLocation"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Image Url"
                        value={reaction.imageLocation}
                    />
                </div>
                
            </fieldset>
            <Button color="success" className="btn-add-save" onClick={handleClickSaveReaction}>
                Save Reaction
            </Button>
            <Button
                className="btn-add-edit ml-2"
                onClick={() => history.push("/reactions")}
            >
                Cancel
            </Button>
        </form>
    );
};

export default AddReaction;

