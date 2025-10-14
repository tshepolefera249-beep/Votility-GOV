// blockchain/anchorVotes.ts
import { ethers } from 'ethers';

const ABI = [
  "function recordElection(bytes32 electionHash) public",
  "function getElection(uint256 index) public view returns (bytes32)"
];

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

export async function anchorElectionHash(hash: string) {
  const tx = await contract.recordElection(hash);
  await tx.wait();
  console.log(`Election hash anchored on-chain: ${tx.hash}`);
  return tx.hash;
}
