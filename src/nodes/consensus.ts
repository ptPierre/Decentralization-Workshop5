import { BASE_NODE_PORT } from "../config";

export async function startConsensus(N: number) {
  // launch a node
  for (let index = 0; index < N; index++) {
    try {
      // Use the original port scheme to match the tests
      await fetch(`http://localhost:${BASE_NODE_PORT + index}/start`);
    } catch (error) {
      console.error(`Error starting consensus for node ${index}: ${error}`);
    }
  }
}

export async function stopConsensus(N: number) {
  // launch a node
  for (let index = 0; index < N; index++) {
    try {
      // Use the original port scheme to match the tests
      await fetch(`http://localhost:${BASE_NODE_PORT + index}/stop`);
    } catch (error) {
      // Ignore errors when stopping nodes
    }
  }
}
