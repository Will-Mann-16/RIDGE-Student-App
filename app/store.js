import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducers";

const middleware = applyMiddleware(thunk)(createStore);
const store = middleware(reducer);
export default store;
