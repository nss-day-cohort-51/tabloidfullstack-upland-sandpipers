import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { getPostReactionById } from "../../modules/ReactionManager";
import { useState, useEffect } from "react";

const DisplayReaction = ({ postId }) => {
  const [postReactions, setPostReactions] = useState([]);
  const [groupReaction, setGroupReaction] = useState([]);
  // const [reactionList, setReactionList] = useState([]);
  const getPostReaction = () => {
    getPostReactionById(postId).then((res) => setPostReactions(res));
  };

   const groupBy = (postReactionList) =>  {
    const newObj = postReactionList.reduce((acc, currentValue) => {
        
      if (!acc[currentValue["reaction"]["name"]]) {
        acc[currentValue["reaction"]["name"]] = [];
      }
      acc[currentValue["reaction"]["name"]].push(currentValue);
      return acc;
    }, {});
    return newObj;
  }

  const getGroupReactions = () => {
    const resValues = Object.values(groupBy(postReactions))
    setGroupReaction(resValues)
  }
  useEffect(() => {
    getPostReaction();
  }, []);
  useEffect(() => {
    getGroupReactions()
  }, [postReactions]);
  return (
    <div>
      {groupReaction?.map((group) => (
        <div className="d-flex flex-row" key={group[0].reactionId}>
          <div>{group.length}</div>
          <img src={group[0].reaction.imageLocation} alt={group[0].reaction.name} />
          <p>{group[0].reaction.name}</p>
        </div>))}
    </div>
  );
};

export default DisplayReaction;
