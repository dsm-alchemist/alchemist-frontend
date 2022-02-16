import { combineReducers } from "redux";
import AccessReducer from "./access";


const rootReducer = combineReducers({
    access: AccessReducer,

})

export type reducerType =
    ReturnType<typeof rootReducer>;

export default rootReducer;