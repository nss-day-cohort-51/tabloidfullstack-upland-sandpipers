import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Table, Button } from "reactstrap";
import { getAllPosts, getPostsByCategoryId } from "../../modules/PostManager";
import { useHistory } from "react-router";
import { getAllCategories } from "../../modules/CategoryManager";

const PostList = () => {
    const history = useHistory();

    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedState, setSelected] = useState(0);

    const getPosts = () => {
        getAllPosts().then((posts) => setPosts(posts));
        setSelected(0);
    };

    const getCategories = () => {
        getAllCategories().then(resp => setCategories(resp))
    }

    const HandleCategoryChange = (event) => {
        setSelected(event.target.value);

        getPostsByCategoryId(event.target.value).then(resp => setPosts(resp));
    }

    useEffect(() => {
        getPosts();
        getCategories();
    }, []);

    useEffect(() => {
    }, [posts])

    return (
        <div className="container">
            <div className="form-group">
                <label htmlFor="category">Filter By Category:</label>
                <select
                    value={selectedState}
                    name="categoryId"
                    id="categoryId"
                    onChange={HandleCategoryChange}
                    className="form-control"
                >
                    <option value="0">Select a Category</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
                <Button
                    className="mt-2 PostList__NewPost"
                    color="success"
                    onClick={() => getPosts()}
                >
                    Clear filter
                </Button>
            </div>
            <div className="PostList__NewPost--container">
                <Button
                    className="mt-2 PostList__NewPost"
                    color="success"
                    onClick={() => history.push("/addPost")}
                >
                    New Post
                </Button>
            </div>
            <div className="row justify-content-center">
                {posts.map((post) => (
                    <Post post={post} key={post.id} />
                ))}
            </div>
        </div>
    );
};

export default PostList;
