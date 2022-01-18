import React, { useEffect, useState } from "react";
import Tag from "./Tag";
import { getAllTags } from "../modules/TagManager";

const TagList = () => {
    const [tags, setTags] = useState([]);

    const getTags = () => {
        getAllTags().then((tags) => setTags(tags));
    };

    useEffect(() => {
        getTags();
    }, []);

    return (
        <div className="container">
            <Table>
            <thead>
          <tr>
            <th>#</th>
            <th>Tag Name</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>          
               
                {tags.map((tag) => (
                    <Tag tag={tag} key={tag.id} />
                ))}
          
            </Table>

        </div>
    );
};

export default TagList;
