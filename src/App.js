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
import WalletConnectProvider from "@walletconnect/web3-provider";
import UAuth from "@uauth/js";

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

  const walletC = async () => {
    const provider = new WalletConnectProvider({
      infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
    });
    //  Enable session (triggers QR Code modal)
    await provider.enable();
    await provider.request({payload: "eth_requestAccounts"})

    const web3Provider = new ethers.providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
    const accounts = signer.getAddress();
    setAccount(accounts);
    loadContract(signer);
  };
    const uauth = new UAuth({
      clientID: "0bfe1e72-23d4-4a8c-80c6-c30dfe52d12b",
      scope: "openid email wallet",
      redirectUri: "https://localhost:3000/callback",
    });

    const unsLogin = async () => {
      try {
         const authorization = await uauth.loginWithPopup();
         const accounts = authorization.idToken.address;
         
         setAccount(accounts);
         
      } catch (error) {
        console.log(error);
      }
      
    }

  const loadContract = async (signer) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const Defsigner = provider.getSigner();
    
    const market = await new ethers.Contract(
      marketAddress,
      marketabi.abi,
      signer || Defsigner
    );
    setMarketPlace(market);
    const nft = await new ethers.Contract(nftAddress, nftabi.abi, signer || Defsigner);
    setNft(nft);
    setLoading(false);
  };
  return (
    <div className="App">
      <Navigation web3handler={web3handler} account={account} unsLogin={unsLogin} walletC={walletC} />
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
