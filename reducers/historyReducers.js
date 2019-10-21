export const HISTORY_PUSH = "HISTORY_PUSH";

export function historyReducer(state, action) {
  switch (action.type) {
    case HISTORY_PUSH:
      return [...state, action.payload];

    default:
      throw new Error();
  }
}
