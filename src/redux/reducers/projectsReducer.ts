import {
  CREATE_PROJECT_ITEM_ACTION, DELETE_PROJECT_ITEM_ACTION, EDIT_PROJECT_ITEM_ACTION, FETCH_PROJECTS_DATA_ACTION,
  INIT_PROJECTS_DATA_ACTION,
  Payload,
  UPDATE_PROJECT_ITEM_ACTION
} from "../../common/types";
import {IProject} from "../../api/interfaces/IProject";

export interface projectsState {
  projects : IProject[],
}

const initialProjectsState = {
  projects : [
    {
      name: 'Loading...',
      description: "Loading",
    },
  ],
}


/**
 * Projects Reducer
 * Handle state for getting projects information
 */

function projectsReducer (
  state   = initialProjectsState,
  action : Payload)
{
  switch (action.type) {
    case INIT_PROJECTS_DATA_ACTION:
      return {
        ...state,
        projects : initialProjectsState,
      };
    case CREATE_PROJECT_ITEM_ACTION:
      return {
        ...state,
        projects: [...state.projects, action.payload.project]
      }
    case FETCH_PROJECTS_DATA_ACTION:
      return {
        ...state,
        projects: action.payload
      };
    case UPDATE_PROJECT_ITEM_ACTION:
      return {
        ...state,
        projects: [
            ...state.projects.slice(0, action.payload.index),
          {
            name : action.payload.project.name,
            description: action.payload.project.description
          },
            ...state.projects.slice(action.payload.index + 1)
        ]
      }
    case DELETE_PROJECT_ITEM_ACTION:
      var a = state.projects.slice(0, action.payload.index);
      var b = state.projects.slice(action.payload.index + 1);
      return {
        ...state,
        projects : a.concat(b)
      }
    default:
      return state;
  }
}


export interface editProjectModalState {
  editProjectModal : IProject
}


const initialEditProjectModalState = {
  editProjectModal : {
    id: "Loading...",
    name: "Loading...",
    description: "Loading...",
  }
}

function editProjectModalReducer (
    state = initialEditProjectModalState,
    action : Payload
) {
  switch (action.type) {
    case "INIT_EDIT_PROJECT_MODAL":
      return {
        ...state,
          editProjectModal : initialEditProjectModalState
      };
    case EDIT_PROJECT_ITEM_ACTION:
      console.log("action.payload.project", action.payload.project);
      return {
        ...state,
        editProjectModal: action.payload.project
      };
    default:
      return state;

  }
}

export {
  projectsReducer,
  editProjectModalReducer
}
