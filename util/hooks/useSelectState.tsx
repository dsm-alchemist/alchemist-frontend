import { useSelector } from "react-redux"
import { reducerType } from "../../modules/reducer";

const useSelectState = () => {
    return useSelector((state: reducerType) => state);
}

export default useSelectState;