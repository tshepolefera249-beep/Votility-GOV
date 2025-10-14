let lastUsedEndpoint = 0;
const endpoints = ['votes1', 'votes2', 'votes3']; // Example collections

export function getNextEndpoint() {
  const endpoint = endpoints[lastUsedEndpoint];
  lastUsedEndpoint = (lastUsedEndpoint + 1) % endpoints.length;
  return endpoint;
}
let currentRegion = 0;
const regions = ['us-east', 'eu-central', 'ap-south'];

export function getNextRegion() {
  const region = regions[currentRegion];
  currentRegion = (currentRegion + 1) % regions.length;
  return region;
}
