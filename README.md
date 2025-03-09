# Decentralized Voting System (dApp)

## Overview
This project is a **decentralized voting application (dApp)** built on the **Volta blockchain**, leveraging **smart contracts** to ensure secure, transparent, and immutable voting processes. The application allows administrators to create votes with customizable parameters, such as voting duration and candidate lists, while users can participate by casting their votes securely via their **MetaMask wallets**. This project was developed for educational purposes, demonstrating the integration of blockchain technology with modern web development frameworks.

---

## Features

### 1. **Admin Functionality**
   - **Admin Authentication**: Admins are filtered and authenticated using their **MetaMask wallet address**.
   - **Vote Creation**: Admins can create new votes by specifying:
     - Voting duration (start and end times).
     - List of candidates for the election.
   - **Smart Contract Deployment**: Each vote is deployed as a new smart contract on the Volta blockchain.

### 2. **User Functionality**
   - **Vote Participation**: Users can connect their MetaMask wallets to the dApp and cast **one vote per election** for their preferred candidate.
   - **Transparency**: All votes are recorded on the blockchain, ensuring transparency and immutability.
   - **Real-Time Updates**: Users can view active votes and track voting progress in real time.

---

## Technologies Used

### Blockchain
- **Solidity**: For writing and deploying smart contracts.
- **Hardhat**: For compiling, testing, and deploying smart contracts.
- **Volta Blockchain**: A public Ethereum-compatible blockchain for deploying and interacting with smart contracts.
- **Ethers.js**: For interacting with the blockchain from the frontend.

### Frontend
- **React**: For building the user interface.
- **MetaMask**: For user authentication and wallet integration.

### Development Environment
- **Node.js** and **npm**: For managing dependencies and running scripts.
- **Visual Studio Code**: Primary IDE for development.

---

## Project Setup

### Prerequisites
- Install **Node.js** and **npm**.
- Install the **MetaMask** browser extension and configure it to connect to the Volta network.

### Installation

1. **Clone the Repository**:
   ```shell
   git clone https://github.com/your-username/voting-dApp.git
   cd voting-dApp
   ```

2. **Install Dependencies**:
   ```shell
   npm install
   ```

3. **Compile Smart Contracts**:
   ```shell
   npx hardhat compile
   ```

4. **Deploy the Smart Contract**:
   - Deploy a new voting contract to the Volta network:
     ```shell
     npx hardhat run --network volta scripts/deploy.js
     ```
   - Update the contract address in the following files:
     - `.env`
     - `react-app/src/Constant/constant.js`

5. **Start the React Application**:
   ```shell
   cd react-app
   npm start
   ```

---

## Usage

### For Admins
1. Connect your MetaMask wallet to the dApp.
2. Create a new vote by specifying the voting duration and candidate list.
3. Deploy the vote as a new smart contract.

### For Users
1. Connect your MetaMask wallet to the dApp.
2. Browse active votes and select the one you want to participate in.
3. Cast your vote for your preferred candidate.

---

## Future Improvements
1. **Multiple Elections**: Allow admins to create and manage multiple elections simultaneously.
2. **Vote Delegation**: Implement a feature for users to delegate their votes to others.
3. **Enhanced UI/UX**: Improve the user interface with better design and responsiveness.
4. **Docker Integration**: Package the application in Docker containers for easier deployment and scalability.

---

## Links
- **Volta Explorer**: [View Contract Transactions](https://volta-explorer.energyweb.org/address/{contract_address}/transactions#address-tabs)
- **Volta Faucet**: [Get Test Tokens](https://voltafaucet.energyweb.org/)

---

For more details, visit the [GitHub repository](https://github.com/your-username/voting-dApp).
