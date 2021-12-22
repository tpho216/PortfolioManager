import { combineReducers} from "redux";
import projectsReducer, { projectsState} from "./projectsReducer";

export interface RootState {
  projects: projectsState
}
export const rootReducer = combineReducers<RootState>({
  projects : projectsReducer,
});

export default rootReducer;
