import {ISkill} from "../../api/interfaces/ISkill";

export const CREATE_SKILL_ITEM_ACTION = "CREATE_SKILL_ITEM";
export const FETCH_SKILLS_DATA_ACTION = "FETCH_SKILLS_DATA";
export const UPDATE_SKILL_ITEM_ACTION = "UPDATE_SKILL_ITEM";
export const EDIT_SKILL_ITEM_ACTION = "EDIT_SKILL_ITEM";
export const DELETE_SKILL_ITEM_ACTION = "DELETE_SKILL_ITEM";
export const fetchSkills = (skills : ISkill[]) => async (dispatch : any) => {
    try {
        dispatch({ type: FETCH_SKILLS_DATA_ACTION, payload: skills});
    } catch (e) {
        console.log("error:", e);
        throw e;
    }
}

export const createSkillItem = (skill : ISkill) => async (dispatch : any) => {
    try {
        dispatch({type: CREATE_SKILL_ITEM_ACTION, payload: {skill : skill}});
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const updateSkillItem = (skills: ISkill[], skill : ISkill) => async (dispatch: any) => {
    try {
        skills.map((item : ISkill, index : number) => {
            if (item.id === skill.id) {
                dispatch({type: UPDATE_SKILL_ITEM_ACTION, payload: {skill : skill, index: index}});
            }
        })
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const deleteSkillItem = (skills : ISkill[], skill : ISkill) => async (dispatch : any) =>
{
    try {
        skills.map((item : ISkill, index : number) => {
            if (item.id === skill.id) {
                dispatch({ type: DELETE_SKILL_ITEM_ACTION, payload: {index : index}});
            }
        });
    } catch (e) {
        console.log("error: ", e);
        throw e;
    }
}

export const editSkillItem = (skill : ISkill) => async (dispatch : any) => {
    try {
        console.log("DISPATCH", skill);
        dispatch({ type: EDIT_SKILL_ITEM_ACTION, payload: {skill : skill}});
    } catch (e) {
        console.log("error: ", e);
        throw e;
    }
}
