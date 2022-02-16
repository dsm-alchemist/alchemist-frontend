import { useDispatch } from "react-redux"
import { setAccess } from "../../../modules/action/access";
import useSelectState from "../useSelectState";

const useAccess = () => {
    const dispatch = useDispatch();
    const state = useSelectState().access;

    const setState = {
        setAccess: (payload: string) => {
            dispatch(setAccess(payload));
        },
    }

    return{
        state,
        setState
    }
}

export default useAccess;