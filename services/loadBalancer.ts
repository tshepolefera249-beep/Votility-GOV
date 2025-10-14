let lastUsedEndpoint = 0;
const endpoints = ['votes1', 'votes2', 'votes3']; // Example collections

export function getNextEndpoint() {
  const endpoint = endpoints[lastUsedEndpoint];
  lastUsedEndpoint = (lastUsedEndpoint + 1) % endpoints.length;
  return endpoint;
}
