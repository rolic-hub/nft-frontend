import React, { useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import marketabi from "./utils/Marketplace.json";
import Navigation from "./components/Navbar";
import nftabi from "./utils/Nft.json";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Home from "./components/Home";
import Create from "./components/create";
import MyListedItems from "./components/myListed";
import MyPurchases from "./components/myPurchases";

const App = () => {
  const nftAddress = "0x815DCC1EAE4677C10e54ecf036d50B012A3c2E49";
  const marketAddress = "0x93Fa46b5BA6D37Ebf05A09A668D2c20c4d7bB433";

  const { ethereum } = window;
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [nft, setNft] = useState({});
  const [marketPlace, setMarketPlace] = useState({});

  const web3handler = async () => {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setAccount(accounts[0]);
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    loadContract(signer);
  };

  const loadContract = async (signer) => {
    const market = await new ethers.Contract(marketAddress, marketabi.abi, signer);
    setMarketPlace(market);
    const nft = await new ethers.Contract(nftAddress, nftabi.abi, signer);
    setNft(nft);
    setLoading(false);
  };
  return (
    <div className="App">
      <Navigation web3handler={web3handler} account={account} />
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
          }}
        >
          <Spinner animation="border" style={{ display: "flex" }} />
          <p className="mx-3 my-0"> Awaiting Metamask Connection....</p>
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={<Home marketPlace={marketPlace} nft={nft} />}
          />
          <Route
            path="/create"
            element={<Create marketPlace={marketPlace} nft={nft} />}
          />
          <Route
            path="/my-listed-items"
            element={
              <MyListedItems
                marketPlace={marketPlace}
                nft={nft}
                account={account}
              />
            }
          />
          <Route
            path="/my-purchases"
            element={
              <MyPurchases
                marketPlace={marketPlace}
                nft={nft}
                account={account}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
