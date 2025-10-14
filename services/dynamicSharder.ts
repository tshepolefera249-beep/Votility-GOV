let shardIndex = 0;
const SHARD_COUNT = 5;

export function assignShard(userId: string) {
  const shard = shardIndex;
  shardIndex = (shardIndex + 1) % SHARD_COUNT;
  return `votes_shard_${shard}`;
}
