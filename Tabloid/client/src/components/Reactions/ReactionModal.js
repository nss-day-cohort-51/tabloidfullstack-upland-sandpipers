import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { addPostReaction } from "../../modules/ReactionManager";
import { useState } from "react";

const Reaction = ({ reaction, postId }) => {
  const history = useHistory();

  const postReaction = {
    postId: postId,
    reactionId: reaction.id,
    userProfileId: localStorage.getItem("LoggedInUserId"),
  }


  const handleReaction = (event) => {
    event.preventDefault(); //Prevents the browser from submitting the form
    console.log(postReaction);
    addPostReaction(postReaction);
}

  return (
    <div className="reaction p-2 d-flex flex-column">
      <img src={reaction.imageLocation} alt={reaction.name} />
      <button onClick={handleReaction}>{reaction.name}</button>
    </div>
  );
};

export default Reaction;
