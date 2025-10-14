// Simple quorum check utilities
export function quorumReached(totalNodes: number, approvals: number, thresholdPercent = 66): boolean {
  const required = Math.ceil((thresholdPercent / 100) * totalNodes);
  return approvals >= required;
}

// Example: computing dynamic quorum based on node health
export function dynamicQuorum(nodeCount: number, healthyNodes: number) {
  // require 2/3 of healthy nodes
  return Math.ceil((2 / 3) * healthyNodes);
}
