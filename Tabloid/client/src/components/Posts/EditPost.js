import React, { useState } from "react";
import { useHistory } from "react-router";
import { getPostById, updatePost } from "../../modules/PostManager";
import { getAllCategories } from "../../modules/CategoryManager";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EditPost = () => {

    const [categories, setCategories] = useState([]);

    const [post, setPost] = useState({
        title: "",
        content: "",
        imageLocation: "",
        createDateTime: "",
        publishDateTime: "",
        isApproved: true,
        categoryId: null,
        UserProfileId: localStorage.getItem("LoggedInUserId")
    });

    const { id } = useParams();

    const history = useHistory();

    const getCategories = () => {
        getAllCategories().then((category) => setCategories(category));
    };

    useEffect((event) => {
        getCategories();
        getPostById(id)
            .then(res => setPost(res))
    }, []);

    const handleControlledInputChange = (event) => {
        const newPost = { ...post };
        let selectedVal = event.target.value;

        newPost[event.target.id] = selectedVal;
        // update state
        setPost(newPost);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        updatePost(post).then(history.goBack())
    };

    return (
        <form className="main-content">
            <h2 className="_title">Add Post:</h2>
            <fieldset className="fieldset">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        rows="6"
                        className="form-control"
                        value={post.title}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea
                        type="text"
                        id="content"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        className="form-control"
                        value={post.content}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Image Url:</label>
                    <input
                        type="text"
                        id="imageLocation"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        className="form-control"
                        value={post.imageLocation}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        value={post.categoryId}
                        name="categoryId"
                        id="categoryId"
                        onChange={handleControlledInputChange}
                        className="form-control"
                    >
                        <option value="0">Select a Category</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>

            </fieldset>
            <button className="btn-edit-save" onClick={handleSubmit}>
                Submit
            </button>
            <button
                className="btn-edit-cancel"
                onClick={() => history.push(`/`)}
            >
                Cancel
            </button>
        </form>
    );
};

export default EditPost;