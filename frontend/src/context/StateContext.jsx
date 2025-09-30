import React, { useContext, createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [address, setAddress] = useState('');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  // Function to initialize contract and provider
  const initializeContract = (ethProvider) => {
    const signer = ethProvider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
    setContract(contractInstance);
  };
  
  // Function to connect to MetaMask (Ethers v6 syntax)
  const connect = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
        
        setAddress(accounts[0]);
        setContract(contractInstance);
        console.log("Wallet Connected with Ethers v6:", accounts[0]);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert('Please install MetaMask');
    }
  };

  // Function to publish a new campaign (Ethers v6 syntax)
  const publishCampaign = async (form) => {
    try {
      if(!contract) return alert("Contract not initialized");

      const { title, description, target, deadline, image } = form;
      
      // Call the contract function
      const transaction = await contract.createCampaign(
        address, // owner
        title,
        description,
        ethers.parseEther(target), // Convert ETH to WEI using v6 syntax
        new Date(deadline).getTime(),
        image
      );
      
      console.log('Transaction started...', transaction.hash);
      await transaction.wait(); // Wait for the transaction to be mined
      console.log('Transaction successful!');

    } catch (error) {
      console.error("Contract call failed", error);
    }
  };


  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);