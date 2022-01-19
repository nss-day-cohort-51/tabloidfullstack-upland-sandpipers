import React, { useEffect, useState } from "react";
import Tag from "./Tag";
import { getAllTags } from "../../modules/TagManager";
import { Table, Button } from "reactstrap";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { getPostById } from "../../modules/PostManager";

const ManageTags = () => {
    const history = useHistory();
    const { id } = useParams();

    const [tags, setTags] = useState([]);
    const [post, setPost] = useState(null);
    const [tagIds, setTagIds] = useState([]);

    let isAdmin = localStorage.getItem("LoggedInUserType") == 1;
    const getTags = () => {
        getAllTags().then((tags) => setTags(tags));
    };

    useEffect(() => {
        getTags();
        getPostById(id).then((post) =>
            setTagIds(post.Tags.map((tag) => tag.id))
        );
    }, []);

    const handleTagSelected = (event) => {
        event.preventDefault();
        const newId = event.target.id.split("--")[1];

        const tagIdsCopy = [...tagIds];
        // set new list of tags by filtering out a tag that already exists else adding a new id to the list
        if (tagIdsCopy.includes(newId)) {
            setTagIds(tagIdsCopy.filter((tag) => tag != newId));
        } else setTagIds(tagIdsCopy.push(newId));
    };

    const tagInteractionText = (id) => {
        if (tagIds.includes(id)) return "Remove Tag";
        else return "Add Tag";
    };

    return (
        <div className="container">
            <h1>Tags</h1>
            <Table className="mt-2">
                <thead>
                    <tr>
                        <th>Tag Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tags.map((tag) => (
                        <>
                            <Tag tag={tag} key={tag.id} />
                            <Button id={`manageTags--${tag.id}`}>
                                {tagInteractionText(tag.id)}
                            </Button>
                        </>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ManageTags;
