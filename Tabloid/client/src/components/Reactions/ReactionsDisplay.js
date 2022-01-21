import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { getPostReactionById } from "../../modules/ReactionManager";
import { useState, useEffect } from "react";

const DisplayReaction = ({ postId }) => {
  const [postReactions, setPostReactions] = useState([]);
  const [groupReaction, setGroupReaction] = useState([]);
  const getPostReaction = () => {
    getPostReactionById(postId).then((res) => setPostReactions(res));
  };

   const groupBy = (postReactionList) =>  {
    const newObj = postReactionList.reduce((acc, currentValue) => {
        debugger
      if (!acc[currentValue["reaction"]["name"]]) {
        acc[currentValue["reaction"]["name"]] = [];
      }
      acc[currentValue["reaction"]["name"]].push(currentValue);
      return acc;
    }, {});
    return newObj;
  }
  const getGroupReactions = () => {
    setGroupReaction(groupBy(postReactions))
  }

  useEffect(() => {
    getPostReaction();
  }, []);
  useEffect(() => {
    getGroupReactions()
  }, [postReactions]);
  return (
    <div>
      {postReactions?.map((reaction) => (
        <div key={reaction.id}>
          <img src={reaction.imageLocation} alt={reaction.name} />
          <p>{reaction.name}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayReaction;
