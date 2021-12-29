import React, {useState} from "react";
import {Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import {IProject} from "../../api/interfaces/IProject";
import {useDispatch} from "react-redux";
import APIClient from "../../api/APIClient";
import {addProjectItem} from "../../redux/actions/projectsAction";
import {modalStyles} from "../../common/styles";

interface CreateNewProjectModalProps {
    visible : boolean,
    callback : any
}


export const CreateNewProjectModal: React.FC <CreateNewProjectModalProps> = (props) => {
    const [nameInputText, setNameInputText] = useState("");
    const [descriptionInputText, setDescriptionInputText] = useState("");
    const apiClient : APIClient = new APIClient();
    const dispatch = useDispatch();


    const onPressSubmit = async () => {
        props.callback(false);
        const project : IProject = {id : "null", name: nameInputText, description : descriptionInputText};
        dispatch(addProjectItem(project));
        await apiClient.portfolioDataService.createProject(project);
    };

    return (
        <Modal
            animationType="fade"
            visible={props.visible}
            onRequestClose={()=> props.callback(false)}>
            <View
                style={modalStyles.view}
            >
                <Text style={modalStyles.lbl}>
                    Name
                </Text>
                <TextInput
                    style={modalStyles.input}
                    onChangeText={(text) => setNameInputText(text)}
                    defaultValue={nameInputText}
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
                    onChangeText={(text) => setDescriptionInputText(text)}
                    defaultValue={descriptionInputText}
                    editable={true}
                    multiline={false}
                    maxLength={20}
                >
                </TextInput>

                <TouchableOpacity
                    onPress={async () => { await onPressSubmit()}}
                    style={modalStyles.touchableSave}>
                    <Text style={modalStyles.lbl}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}
