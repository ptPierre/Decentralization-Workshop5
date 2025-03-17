export type NodeState = {
  killed: boolean;
  x: Value | null;
  decided: boolean | null;
  k: number | null;
};

export type Value = 0 | 1 | "?";

export type Message = {
  phase: 1 | 2;
  k: number;
  value: Value;
  sender: number;
};
