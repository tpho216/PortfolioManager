import { combineReducers} from "redux";
import {editSkillModalReducer, editSkillModalState, skillsReducer, skillsState} from "./skillsReducer";
import {editProjectModalReducer, editProjectModalState, projectsReducer, projectsState} from "./projectsReducer";

export interface RootState {
  projects: projectsState,
  editProjectModal : editProjectModalState,
  skills: skillsState,
  editSkillModal : editSkillModalState,

}
export const rootReducer = combineReducers<RootState>({
  projects : projectsReducer,
  editProjectModal : editProjectModalReducer,
  skills : skillsReducer,
  editSkillModal : editSkillModalReducer,
});

export default rootReducer;
