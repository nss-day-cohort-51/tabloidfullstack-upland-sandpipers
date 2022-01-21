import React from "react";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { useState, useEffect } from "react";
import Reaction from "./ReactionModal";
import {getAllReactions} from "../../modules/ReactionManager"

const PostReactionModal = ({postId}) => {
  // Modal open state
  const [modal, setModal] = React.useState(false);
  const [reactions, setReactions] = useState([]);

  const getReactions = () => {
    getAllReactions().then((reactions) => setReactions(reactions));
  };

  useEffect(() => {
    getReactions();
  }, []);
  // Toggle for Modal
  const toggle = () => setModal(!modal);

  return (
    <div
      style={{
        display: "block",
        width: 700,
        padding: 30,
      }}
    >
      <button  onClick={toggle}
      title="Add a Reaction">
      😊
      </button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add a Reaction to this post.</ModalHeader>
        <ModalBody>
        <div className="grid-container"
        style={{
        display: "flex",
        flexWrap: "wrap"
      }}>
          {reactions.map((reaction) => (
            <Reaction 
            reaction={reaction} 
            key={reaction.id} 
            postId={postId}
            />
          ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PostReactionModal;
