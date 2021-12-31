import {Payload} from "../../common/types";
import {ISkill} from "../../api/interfaces/ISkill";
import {
    CREATE_SKILL_ITEM_ACTION,
    DELETE_SKILL_ITEM_ACTION,
    EDIT_SKILL_ITEM_ACTION,
    FETCH_SKILLS_DATA_ACTION, UPDATE_SKILL_ITEM_ACTION
} from "../actions/skillsAction";

export interface skillsState {
    skills : ISkill[]
}

const initialSkillsState = {
    skills: [{
        name: 'Loading...',
        description: "Loading",
        languages: ["Loading"]
    }
    ]
}

function skillsReducer (
    state = initialSkillsState,
    action: Payload
) {
    switch (action.type) {
        case "INIT_SKILLS":
            return {
                ...state,
                skills : initialSkillsState
            };
        case CREATE_SKILL_ITEM_ACTION:
            return {
                ...state,
                skills: [...state.skills, action.payload.skill]
            };
        case FETCH_SKILLS_DATA_ACTION:
            return {
                ...state,
                skills: action.payload
            };
        case UPDATE_SKILL_ITEM_ACTION:
            return {
                ...state,
                skills: [
                    ...state.skills.slice(0, action.payload.index),
                    {
                        name : action.payload.skill.name,
                        description: action.payload.skill.description,
                        languages : action.payload.skill.languages
                    },
                    ...state.skills.slice(action.payload.index + 1)
                ]
            };
        case DELETE_SKILL_ITEM_ACTION:
            var a = state.skills.slice(0, action.payload.index);
            var b = state.skills.slice(action.payload.index + 1);
            return {
                ...state,
                skills: a.concat(b)
            };
        default:
            return state;

    }

}


export interface editSkillModalState {
    editSkillModal : ISkill;
}


const initialEditSkillModalState = {
    editSkillModal : {
        id: "Loading...",
        name: "Loading...",
        description: "Loading...",
        languages : ["Loading..."]
    }
}

function editSkillModalReducer (
    state = initialEditSkillModalState,
        action : Payload
) {
    switch (action.type) {
        case "INIT_EDIT_SKILL_MODAL":
            return {
                ...state,
                editSkillModal: initialEditSkillModalState
            };
        case EDIT_SKILL_ITEM_ACTION:
            console.log("action.payload.skill", action.payload.skill)
            return {
                ...state,
                editSkillModal: action.payload.skill
            };
        default:
            return state;
    }
}

export {
    skillsReducer,
    editSkillModalReducer
}
