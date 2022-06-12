import React from "react";
import { Modal, Button, Card, ListGroup } from "react-bootstrap";
import metamask from "../assests/metamask.png";
import unslogin from "../assests/uns-domain.png";
import walletpicture from "../assests/Wallet-Connect.jpg";

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
        <Modal.Body>
          <div>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div onClick={web3handler}>
                    <img
                      src={metamask}
                      alt="Metamask"
                      height="100px"
                      style={{ marginLeft: "40px", marginRight: "45px" }}
                    />
                    <strong>Login with Metamask</strong>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <div onClick={walletC}>
                    <img
                      src={walletpicture}
                      alt="wallet-connect"
                      height="100px"
                    />
                    <strong>Login with Wallet Connect</strong>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <div onClick={unsLogin}>
                    <img
                      src={unslogin}
                      alt="unstopabble domain"
                      height="100px"
                      style={{ marginLeft: "40px", marginRight: "45px" }}
                    />
                    <strong>Login with Unstoppable Domain</strong>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConnect(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WalletModal;
