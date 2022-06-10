import React from "react";
import { Modal, Button } from "react-bootstrap";

const WalletModal = ({
  web3handler,
  unsLogin,
  walletC,
  connect,
  setConnect,
}) => {
  return (
    <>
      <Modal
        show={connect}
        onHide={() => setConnect(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WalletModal;
