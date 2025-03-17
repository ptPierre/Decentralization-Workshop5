import { launchNodes } from "./nodes/launchNodes";
import { Value } from "./types";

export async function launchNetwork(
  N: number,
  F: number,
  initialValues?: Value[],
  faultyArray?: boolean[]
) {
  // Create default values if not provided
  if (!initialValues) {
    initialValues = new Array(N).fill(null).map(() => 
      Math.random() < 0.5 ? 0 : 1
    );
  }
  
  // Always use the exact faultyArray from the test without modification
  const faultyList = faultyArray || new Array(N).fill(false).map((_, i) => i < F);
  
  // Add detailed debugging for the faulty node configuration
  console.log(`CRITICAL - Test is using faultyArray: ${faultyList.map((v, i) => v ? i : '-').filter(v => v !== '-').join(',')}`);
  
  return await launchNodes(N, F, initialValues, faultyList);
}
