export function getShard(electionId: string, userId: string, shardCount = 10) {
  const hash = [...electionId + userId].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return hash % shardCount;
}
