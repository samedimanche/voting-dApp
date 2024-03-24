import { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import {contractAbi, contractAddress} from './Constant/constant';
import Login from './Components/Login';
import Finished from './Components/Finished';
import Connected from './Components/Connected';
import ListVotes from './Components/ListVotes';
import LoginError from './Components/LoginError'
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Assuming React Router for routing
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setremainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState('');
  const [CanVote, setCanVote] = useState(true);

  const [newCandidateName, setNewCandidateName] = useState(''); // State for new candidate name

  
  useEffect( () => {
    getCandidates();
    getRemainingTime();
    getCurrentStatus();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return() => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
  });

  

  async function addCandidate() {
    try {
      if(account=='0xf8abc2c83708d538285B2ceB53B7bE4F4D1B86fA'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      // Call the contract's function to add a candidate
      const tx = await contractInstance.addCandidate(newCandidateName);
      await tx.wait();

      // Fetch updated candidates after adding
      const updatedCandidates = await fetchCandidates(); // Assuming a function to fetch candidates
      setCandidates(updatedCandidates);

      setNewCandidateName(''); // Clear the input field
      }
      else{
        console.log("You dont have permissions");
      }
    } catch (error) {
      console.error("Error adding candidate:", error);
      // Handle errors gracefully, e.g., display an error message to the user
    }
  }

  async function fetchCandidates() {
    // Replace with your actual implementation of fetching candidates
    const response = await fetch('/api/candidates');
    const candidates = await response.json();
    return candidates;
  }
  

  async function vote() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      
      const tx = await contractInstance.vote(number - 1);
      await tx.wait();
      canVote();
  }


  async function canVote() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const voteStatus = await contractInstance.voters(await signer.getAddress());
      setCanVote(voteStatus);

  }

  async function getCandidates() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const candidatesList = await contractInstance.getAllVotesOfCandiates();
      const formattedCandidates = candidatesList.map((candidate, index) => {
        return {
          index: index,
          name: candidate.name,
          voteCount: candidate.voteCount.toNumber()
        }
      });
      setCandidates(formattedCandidates);
  }


  async function getCurrentStatus() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const status = await contractInstance.getVotingStatus();
      // console.log(status);
      setVotingStatus(status);
  }

  async function getRemainingTime() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const time = await contractInstance.getRemainingTime();
      setremainingTime(parseInt(time, 16));
  }


  function convertTimeToHoursMinutes(remainingTime) {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
  
    const hoursString = hours > 0 ? `${hours}ч ` : '';
    const minutesString = minutes > 0 ? `${minutes}мин ` : '';
  
    return `${hoursString}${minutesString}`;;
  }
  
  const formattedTime = convertTimeToHoursMinutes(remainingTime);
  // console.log(formattedTime); 
  

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      canVote();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected : " + address);
        setIsConnected(true);
        canVote();
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask is not detected in the browser")
    }
  }

  async function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  // return (
  //   <div className="App">
  //     { votingStatus ? (isConnected ? (<Connected 
  //                     account = {account}
  //                     candidates = {candidates}
  //                     remainingTime = {remainingTime}
  //                     number= {number}
  //                     handleNumberChange = {handleNumberChange}
  //                     voteFunction = {vote}
  //                     showButton = {CanVote}/>) 
                      
  //                     : 
                      
  //                     (<Login connectWallet = {connectToMetamask}/>)) : (<Finished />)}
    
  //   {votingStatus ? (
  //       isConnected ? (
  //         <ListVotes
  //           candidates={candidates}
  //           newCandidateName={newCandidateName}
  //           setNewCandidateName={setNewCandidateName}
  //           addCandidate={addCandidate}
  //         />
  //       ) : (
  //         <Login connectWallet={connectToMetamask} />
  //       )
  //     ) : (
  //       <Finished />
  //     )}
  //   </div>
  // );


  return (
    <Router>
      {isConnected && (
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">VotingPlatform</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto link_navbar1">
              <Link style = {{marginRight: "30px", color: '#5f5f5f', fontSize: '20px'}} to="/">Голосование</Link>
              {account === '0xf8abc2c83708d538285B2ceB53B7bE4F4D1B86fA' && (
              <Link to="/listvotes" style = {{ color: '#5f5f5f', fontSize: '20px'}}>Добавить кандидата</Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      )}
        <Routes>
          <Route
            path="/"
            element={
              votingStatus ? (
                isConnected ? (
                  <Connected
                    account={account}
                    candidates={candidates}
                    remainingTime={formattedTime}
                    number={number}
                    handleNumberChange={handleNumberChange}
                    voteFunction={vote}
                    showButton={CanVote}
                  />
                ) : (
                  <Login connectWallet={connectToMetamask} />
                )
              ) : (
                <Finished account={account}
                candidates={candidates}  />
              )
            }
          />
          <Route
            path="/listvotes"
            element={
              account === '0xf8abc2c83708d538285B2ceB53B7bE4F4D1B86fA' ? ( // Allow access only to specific account
              
              votingStatus ? (
                isConnected ? (
              <ListVotes
                candidates={candidates}
                remainingTime={formattedTime}
                newCandidateName={newCandidateName}
                setNewCandidateName={setNewCandidateName}
                addCandidate={addCandidate}
                />
                ) : (
                  <Login connectWallet={connectToMetamask} />
                )
              ) : (
                <Finished account={account}
                candidates={candidates}  />
              )
              ) : ( // Show a message or alternate content for denied access
              <LoginError /> 
            )
            }
          />
        </Routes>
    </Router>
  );

};

export default App;
