import {Payload} from "../../common/types";

export interface skillsState {
    skills : []
}

const initialSkillsState = {
    skills: [{
        name: 'Loading...',
        description: "Loading",
        languages: "Loading"
    }
    ]
}

export default function skillsReducer (
    state = initialSkillsState,
    action: Payload
) {
    switch (action.type) {
        case "INIT_SKILLS":
            return {
                ...state,
                skills : initialSkillsState
            };
        case "FETCH_SKILLS_DATA":
            return {
                ...state,
                skills: action.payload
            };
        default:
            return state;

    }

}
