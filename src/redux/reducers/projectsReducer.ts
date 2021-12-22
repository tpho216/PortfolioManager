import {Payload} from "../../common/types";

export interface projectsState {
  projects : []
}

const initialProjectsState = {
  projects : [
    {
      name: 'Loading...',
      description: "Loading",
      languages: ["loading..."]
    },
  ]
}


/**
 * Skills Reducer
 * Handle state for getting projects information
 */

export default function projectsReducer (
  state = initialProjectsState,
  action : Payload)
{
  switch (action.type) {
    case "INIT_PROJECTS":
      return {
        ...state,
        projects : initialProjectsState
      };
    case "FETCH_PROJECTS_DATA":
      return {
        ...state,
        projects: action.payload
      };
    default:
      return state;

  }
}
