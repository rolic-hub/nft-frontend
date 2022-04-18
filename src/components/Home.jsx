import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Row, Col, Card, Button } from "react-bootstrap";

const Home = ({ marketPlace, nft }) => {
  const [currentItem, setItem] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMarketItem = async () => {
    const itemNum = await marketPlace.getItemCount();
    let items = [];
    for (let i = 1; i <= itemNum; i++) {
      const getItem = await marketPlace.items(i);
      if (!getItem.sold) {
        const url = await nft.tokenURI(getItem.tokenId);

        const response = await fetch(url);
        const metadata = await response.json();

        const totalPrice = await marketPlace.getTotalPrice(getItem.itemId);

        items.push({
          totalPrice,
          itemId: getItem.itemId,
          seller: getItem.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        });
      }
    }
    setItem(items);
    setLoading(false);
  };

  const buyMarketItem = async (item) => {
    await (
      await marketPlace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();

    loadMarketItem();
  };

  useEffect(() => {
    loadMarketItem();
  }, []);

  if (loading) {
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>;
  }

  return (
    <div className="flex justify-center">
      {currentItem.length > 0 ? (
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {currentItem.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body color="secondary">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className="d-grid">
                      <Button
                        onClick={() => buyMarketItem(item)}
                        variant="primary"
                        size="lg"
                      >
                        Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <main style={{ padding: "1rem 0" }}>
          <h2>No listed assets</h2>
        </main>
      )}
    </div>
  );
};

export default Home;
