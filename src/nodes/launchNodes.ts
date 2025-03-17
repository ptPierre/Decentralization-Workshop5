import { Value } from "../types";
import { node } from "./node";

export async function launchNodes(
  N: number, // total number of nodes in the network
  F: number, // number of faulty nodes in the network
  initialValues: Value[], // initial values of each node
  faultyList: boolean[] // list of faulty values for each node, true if the node is faulty, false otherwise
) {
  // CRITICAL: Print exactly which nodes will be faulty
  const faultyIndices = faultyList.map((v, i) => v ? i : null).filter(v => v !== null);
  console.log(`CRITICAL - These nodes will be marked faulty: ${faultyIndices.join(',')}`);
  
  // Validation is fine
  if (initialValues.length !== faultyList.length || N !== initialValues.length)
    throw new Error("Arrays don't match");
  if (faultyList.filter((el) => el === true).length !== F)
    throw new Error("faultyList doesnt have F faulties");

  const promises = [];
  const nodesStates = new Array(N).fill(false);

  function nodesAreReady() {
    return nodesStates.find((el) => el === false) === undefined;
  }

  function setNodeIsReady(index: number) {
    nodesStates[index] = true;
  }

  // launch nodes with the provided faultyList
  for (let index = 0; index < N; index++) {
    const newPromise = node(
      index,
      N,
      F,
      initialValues[index],
      faultyList[index],  // Use the exact faultyList provided by tests
      nodesAreReady,
      setNodeIsReady
    );
    promises.push(newPromise);
  }

  const servers = await Promise.all(promises);
  return servers;
}
