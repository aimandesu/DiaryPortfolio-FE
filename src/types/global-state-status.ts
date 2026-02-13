export const StateStatus = {
  INITIAL: "initial",
  LOADING: "loading",
  COMPLETED: "completed",
  ERROR: "error",
} as const;

export type StateStatus = (typeof StateStatus)[keyof typeof StateStatus];
