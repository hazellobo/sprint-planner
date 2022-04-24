import { TicketActionType } from "../Actions/tickets-action";
import AppState from "./../State";

// set the app state as the initial state of the store
const reducer = (state = AppState, action) => {
  const type = action.type;
  let tickets;

  switch (type) {
    case TicketActionType.GET_TICKET:
      tickets = [...state.tickets];
      break;
    default:
      tickets = [...state.tickets];
  }

  return Object.assign({}, state, { tickets });
};

export default reducer;
