import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import actionsCreator from "../store/actionsCreator/index";

// ЧТО-БЫ не писать useDispatch(action)
export const useActions = ()  => {
  const dispatch = useDispatch();
  return bindActionCreators(actionsCreator, dispatch);
};
export default useActions;
