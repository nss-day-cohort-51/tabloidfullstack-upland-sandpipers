import React, { useEffect, useState } from "react";
import Tag from "./Tag";
import { getAllTags } from "../modules/TagManager";
import { Table } from "reactstrap";

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
                        <th>Tag Name</th>
                        <th></th>
                        <th></th>
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
