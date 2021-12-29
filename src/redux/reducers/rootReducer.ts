import { combineReducers} from "redux";
import projectsReducer, { projectsState} from "./projectsReducer";
import skillsReducer, {skillsState} from "./skillsReducer";

export interface RootState {
  projects: projectsState,
  skills: skillsState
}
export const rootReducer = combineReducers<RootState>({
  projects : projectsReducer,
  skills : skillsReducer,
});

export default rootReducer;
