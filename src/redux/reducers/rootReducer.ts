import { combineReducers} from "redux";
import skillsReducer, {skillsState} from "./skillsReducer";
import {editProjectModalReducer, editProjectModalState, projectsReducer, projectsState} from "./projectsReducer";

export interface RootState {
  projects: projectsState,
  editProjectModal : editProjectModalState,
  skills: skillsState,

}
export const rootReducer = combineReducers<RootState>({
  projects : projectsReducer,
  editProjectModal : editProjectModalReducer,
  skills : skillsReducer,
});

export default rootReducer;
