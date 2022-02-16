import { AccessTypeAction } from "../../action/access";
import { SET_ACCESS } from "../../action/access/interface";
import AccessState from "./interface";

const initState: AccessState = {
    access: ""
};

const AccessReducer = (
    state = initState,
    action: AccessTypeAction
) => {
    switch (action.type) {
        case SET_ACCESS:
            return {
                ...state,
                access: action.payload
            }
        default:
            return state;
    }
}

export default AccessReducer;