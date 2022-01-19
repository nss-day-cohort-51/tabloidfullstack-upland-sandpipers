import React, { useEffect, useState } from "react";
import Tag from "./Tag";
import { getAllTags } from "../modules/TagManager";
import { Table, Button } from "reactstrap";

const TagList = () => {
  const [tags, setTags] = useState([]);
  let isAdmin = localStorage.getItem("LoggedInUserType") == 1
  const getTags = () => {
    getAllTags().then((tags) => setTags(tags));
  };

  useEffect(() => {
    if(isAdmin)getTags();
  }, []);

  return (
    <div className="container">
      <h1>Tags</h1>
      <Button className="mt-2" color="success">
        New Tag
      </Button>{" "}
      <Table className="mt-2">
        <thead>
          <tr>
            <th>Tag Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <Tag tag={tag} key={tag.id} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TagList;

