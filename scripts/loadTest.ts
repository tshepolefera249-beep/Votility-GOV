import { generateMockVotes } from './generateMockVotes';

async function runTest() {
  console.log('Simulating 1000 votes...');
  await generateMockVotes('election_test_001', 1000);
  console.log('Load test complete!');
}

runTest();
