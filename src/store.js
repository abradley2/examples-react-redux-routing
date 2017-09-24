import { createStore } from "redux";

const initialState = {
  route: null
};

export default createStore((state = initialState, action) => {
  switch (action.type) {
    case "ROUTE_CHANGE":
      return Object.assign({}, state, { route: action });

    default:
      return initialState;
  }
});
