import React from "react";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { useState, useEffect } from "react";
import Reaction from "./Reaction";

const PostReactionModal = () => {
  // Modal open state
  const [modal, setModal] = React.useState(false);

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
      <Button color="danger" onClick={toggle}>
        Reactions
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add a Reaction to this post.</ModalHeader>
        <ModalBody>
        {reactions.map((reaction) => (
                        <Reaction reaction={reaction} key={reaction.id} />
                    ))}
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
