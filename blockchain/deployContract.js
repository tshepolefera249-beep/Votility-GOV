// blockchain/deployContract.js
import { ethers } from 'ethers';
import fs from 'fs';

const source = `
pragma solidity ^0.8.0;
contract VotilityIntegrity {
    bytes32[] public elections;
    event ElectionAnchored(bytes32 electionHash);
    function recordElection(bytes32 electionHash) public {
        elections.push(electionHash);
        emit ElectionAnchored(electionHash);
    }
    function getElection(uint256 index) public view returns (bytes32) {
        return elections[index];
    }
}
`;

async function deploy() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const factory = new ethers.ContractFactory(
    JSON.parse(fs.readFileSync('VotilityIntegrity.abi.json')),
    fs.readFileSync('VotilityIntegrity.bin'),
    wallet
  );
  const contract = await factory.deploy();
  console.log('Deployed at:', contract.target);
}
deploy().catch(console.error);
