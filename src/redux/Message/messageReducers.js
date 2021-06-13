import { SET_MESSAGE, CLEAR_MESSAGE } from './messageTypes';

const initialState = {
  message: [],
};

export default function messageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { ...state, message: state.message.push(payload.message) };

    case CLEAR_MESSAGE:
      return { message: '' };

    default:
      return state;
  }
}
