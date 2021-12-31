import React, {useState} from "react";
import {ActivityIndicator, Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import {modalStyles} from "../../../common/styles";
import {editProjectItem} from "../../../redux/actions/projectsAction";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers/rootReducer";
import APIClient from "../../../api/APIClient";
import {editSkillItem, fetchSkills, updateSkillItem} from "../../../redux/actions/skillsAction";

interface EditSkillModalProps {
    visible : boolean,
    callback : any
}

export const EditSkillModal: React.FC <EditSkillModalProps> = (props) => {
    const skillsData : any  = useSelector((state: RootState) => state.skills);
    const editSkillModalData : any = useSelector((state: RootState) => state.editSkillModal);
    const [loading, setLoading] = useState(false);
    const apiClient : APIClient = new APIClient();
    const dispatch = useDispatch();

    const handleInputChanged = (newName : string, newDescription : string) => {
        console.log("newName: ", newName);
        console.log("editSkillModalData", editSkillModalData);
        const newSkill = {
            id: editSkillModalData.editSkillModal.id,
            name : newName,
            description : newDescription,
            languages : editSkillModalData.editSkillModal.languages,
        }
        dispatch(editSkillItem(newSkill));
    }


    const onPressSaveEdit = async () => {
        setLoading(true);
        const newSkill = {
            id: editSkillModalData.editSkillModal.id,
            name : editSkillModalData.editSkillModal.name,
            description: editSkillModalData.editSkillModal.description,
            languages : editSkillModalData.editSkillModal.languages
        }

        // ! Make API call here (not in dispatch function)
        // may cause interruption otherwise
        console.log("NEW SKILL:", newSkill);
        await apiClient.portfolioDataService.updateSkill(newSkill);
        dispatch(updateSkillItem(skillsData.skills, newSkill));

        const projectsResponse = await apiClient.portfolioDataService.fetchSkills();
        dispatch(fetchSkills(projectsResponse.data));
        setLoading(false);
        props.callback(null);

    };

    return (
        <Modal
            animationType="fade"
            visible={props.visible}
            onRequestClose={()=> props.callback(null)}>
            <View
                style={modalStyles.view}
            >
                <Text style={modalStyles.lbl}>
                    Name
                </Text>
                <TextInput
                    style={modalStyles.input}
                    onChangeText={(nameTxt) =>
                        handleInputChanged(nameTxt, editSkillModalData.editSkillModal.description)
                    }
                    defaultValue={editSkillModalData.editSkillModal.name}
                    editable={true}
                    multiline={false}
                    maxLength={20}
                >
                </TextInput>
                <Text style={modalStyles.lbl}>
                    Description
                </Text>
                <TextInput
                    style={modalStyles.input}
                    onChangeText={(descTxt) =>
                        handleInputChanged(editSkillModalData.editSkillModal.name, descTxt)}
                    defaultValue={editSkillModalData.editSkillModal.description}
                    editable={true}
                    multiline={false}
                    maxLength={20}
                >
                </TextInput>

                <TouchableOpacity
                    onPress={async () => {await onPressSaveEdit()}}
                    style={modalStyles.touchableSave}>
                    <View>
                        {loading
                            ?
                            <ActivityIndicator style={modalStyles.lbl} size="large" color="black"/>
                            :
                            <Text style={modalStyles.lbl}>
                                Save
                            </Text>}

                    </View>

                </TouchableOpacity>

            </View>

        </Modal>
    )
}
