import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { addPost } from "../modules/PostManager";
import { useParams } from "react-router-dom";
import { getAllCategories } from "../modules/CategoryManager";


const AddPost = () => {
  const [category, setCategories] = useState([]);
  const history = useHistory();
  const { id } = useParams();

  const [post, setPost] = useState({
    title: "",
    content: "",
    imageLocation: "",
    categoryId: "",
    isApproved: true,
    userProfileId: localStorage.getItem("LoggedInUserId"),
  });

  const getCategories = () => {
    getAllCategories().then((category) => setCategories(category));
  };

  const handleControlledInputChange = (event) => {
    const newPost = { ...post };
    let selectedVal = event.target.value;
    newPost[event.target.id] = selectedVal;
    setPost(newPost);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //Prevents the browser from submitting the form
    addPost(post).then(() => history.push(`/posts`));
  };

  useEffect(() => {
        getCategories();
    }, []);

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
            {category.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

      </fieldset>
      <button className="btn-add-save" onClick={handleSubmit}>
        Submit
      </button>
      <button
        className="btn-add-edit"
        onClick={() => history.push(`/myPosts`)}
      >
        Cancel
      </button>
    </form>
  );
};

export default AddPost;
