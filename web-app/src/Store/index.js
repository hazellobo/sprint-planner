import { createStore } from "redux";

import reducer from "./Reducers/tickets-reducer";

// creates a new store with the reducer
const store = createStore(reducer);

export default store;
