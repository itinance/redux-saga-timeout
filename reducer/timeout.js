import {ACTION_SET_TIMEOUT} from '../actions';

export default function timeoutReducer(state = {
}, action) {
  switch(action.type) {

    case ACTION_SET_TIMEOUT: {

      return {
        ...state,
      }
    }

    default: {
      return state;
    }
  }
}
