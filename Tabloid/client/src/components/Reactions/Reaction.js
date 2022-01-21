import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

const Reaction = ({ reaction }) => {
  const history = useHistory();

  // const handleReaction = () => {

  // };

  return (
    <div className="reaction p-2 d-flex flex-column">
      <img src={reaction.imageLocation} alt={reaction.name} />
      <button>{reaction.name}</button>
    </div>
  );
};

export default Reaction;
