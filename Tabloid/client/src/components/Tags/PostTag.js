import React from "react";
import { Button } from "reactstrap";
import { useState, useEffect } from "react";

const PostTag = ({ postTag, handleTagSelected, activeTagIds }) => {
    const [isTaggedToPost, setIsTaggedToPost] = useState(false);

    useEffect(() => {
        setIsTaggedToPost(
            activeTagIds.length > 0 && activeTagIds.includes(postTag.id)
        );
    }, [activeTagIds]);

    return (
        <tr>
            <th scope="row">{postTag.name}</th>
            <Button
                id={`manageTags--${postTag.id}`}
                onClick={handleTagSelected}
                color={isTaggedToPost ? "danger" : "primary"}
            >
                {isTaggedToPost ? "Remove" : "Add Tag"}
            </Button>
        </tr>
    );
};

export default PostTag;
