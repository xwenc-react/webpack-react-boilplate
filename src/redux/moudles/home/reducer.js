import {
  HOME
} from "./action";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case HOME:
      return {
        isAuthenticated: true,
        user: {},
      };

    default:
      return state;
  }
}