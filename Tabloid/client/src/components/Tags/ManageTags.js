import React, { useEffect, useState } from "react";
import PostTag from "./PostTag";
import { getAllTags } from "../../modules/TagManager";
import {
    getPostTagsByPostId,
    replaceTags,
    clearPostTags,
} from "../../modules/PostTagManager";
import { Table } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";

const ManageTags = () => {
    const { id } = useParams();

    const history = useHistory();
    const [tags, setTags] = useState([]);
    const [activeTagIds, setActiveTagIds] = useState([]);

    let isAdmin = localStorage.getItem("LoggedInUserType") == 1;
    const getTags = () => {
        getAllTags().then((tags) => setTags(tags));
    };

    useEffect(() => {
        getTags();
        getPostTagsByPostId(id).then((postTags) => {
            setActiveTagIds(postTags.map((pt) => pt.tagId));
        });
    }, []);

    const handleSave = () => {
        if (activeTagIds.length > 0)
            replaceTags(
                activeTagIds.map((tagId) => {
                    return { tagId: tagId, postId: parseInt(id) };
                })
            );
        else clearPostTags(id);
        setTimeout(() => {
            history.push(`/posts/${id}`);
        }, 500);
    };

    const handleTagSelected = (event) => {
        event.preventDefault();
        const newId = parseInt(event.target.id.split("--")[1]);

        const activeTagIdsCopy = [...activeTagIds];
        // set new list of tags by filtering out a tag that already exists else adding a new id to the list
        if (activeTagIdsCopy.includes(newId)) {
            setActiveTagIds([
                ...activeTagIdsCopy.filter((tag) => tag != newId),
            ]);
        } else {
            activeTagIdsCopy.push(newId);
            setActiveTagIds(activeTagIdsCopy);
        }
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
                    {tags.map((postTag) => (
                        <PostTag
                            postTag={postTag}
                            key={postTag.id}
                            handleTagSelected={handleTagSelected}
                            activeTagIds={activeTagIds}
                        />
                    ))}
                </tbody>
            </Table>
            <Button
                color="secondary"
                className="ManageTags__save"
                onClick={handleSave}
            >
                Save
            </Button>
        </div>
    );
};

export default ManageTags;
