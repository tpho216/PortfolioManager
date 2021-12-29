import APIClient from "../../api/APIClient";
import {IProject} from "../../api/interfaces/IProject";
import {
    CREATE_PROJECT_ITEM_ACTION,
    DELETE_PROJECT_ITEM_ACTION,
    FETCH_PROJECTS_DATA_ACTION,
    UPDATE_PROJECT_ITEM_ACTION
} from "../../common/types";


export const fetchProjects = (projects : IProject[]) => async (dispatch : any) => {
    try {
        dispatch({ type: FETCH_PROJECTS_DATA_ACTION, payload: projects});
    } catch (e) {
        console.log("error:", e);
        throw e;
    }
}

export const updateProjectItem = (projectsArray : IProject[], project: IProject,
                                         ) => async (dispatch : any) => {
    try {
        projectsArray.map((projectItem : IProject, index: number) => {
            if (projectItem.id === project.id) {
                dispatch({ type: UPDATE_PROJECT_ITEM_ACTION, payload: {project: project, index: index}});
            }
        })
    } catch (e) {
        console.log("error:", e);
        throw e;
    }
}

export const deleteProjectItem = (projectsArray : IProject[], project : IProject) => async (dispatch: any) => {
    try {
        projectsArray.map((projectItem : IProject, index : number) => {
            if (projectItem.id === project.id) {
                dispatch({ type: DELETE_PROJECT_ITEM_ACTION, payload: {index: index}})
            }
        });
    } catch (e) {
        console.log("error:", e);
        throw e;
    }
}

export const addProjectItem = (project : IProject) => async (dispatch : any) => {
    try {
        dispatch({type: CREATE_PROJECT_ITEM_ACTION, payload: {project: project}});
    } catch (e) {
        console.log("error: ", e);
        throw e;
    }
}
