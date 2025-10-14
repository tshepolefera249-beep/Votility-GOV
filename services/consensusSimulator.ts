// Extremely simplified PBFT-style consensus simulator (for tests/demos).
type Node = { id: string, vote: boolean, alive: boolean };

export function simulateRound(nodes: Node[]) {
  // Primary proposes true if majority of nodes have vote true
  const alive = nodes.filter(n => n.alive);
  const trueVotes = alive.filter(n => n.vote).length;
  const primaryProposal = trueVotes > alive.length / 2;
  const approvals = alive.filter(n => n.vote === primaryProposal).length;
  return { proposal: primaryProposal, approvals, quorum: alive.length, success: approvals >= Math.ceil((2/3)*alive.length) };
}
