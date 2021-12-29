import React, {useState} from "react";
import APIClient from "../../../api/APIClient";
import {useDispatch} from "react-redux";
import {IProject} from "../../../api/interfaces/IProject";
import {addProjectItem, updateProjectItem} from "../../../redux/actions/projectsAction";
import {Modal, TextInput, TouchableOpacity, View, Text} from "react-native";
import {modalStyles} from "../../../common/styles";


interface EditProjectModalProps {
    nameInputText : string,
    descriptionInputText : string,
    visible : boolean,
    editItem : IProject,
    data : IProject[]
    callback : any
}

export const EditProjectModal: React.FC <EditProjectModalProps> = (props) => {
    const [nameInputText, setNameInputText] = useState(props.nameInputText);
    const [descriptionInputText, setDescriptionInputText] = useState(props.descriptionInputText);

    const [isRendering, setIsRendering] = useState(false);
    const apiClient : APIClient = new APIClient();
    const dispatch = useDispatch();


    const handleEditItem = async (editItem : IProject) => {
        const newProject = {
            id: editItem.id,
            name : nameInputText,
            description: descriptionInputText
        }

        // ! Make API call here (not in dispatch function)
        // may cause interruption otherwise
        await apiClient.portfolioDataService.updateProject(newProject);
        dispatch(updateProjectItem(props.data, newProject));

        setIsRendering(!isRendering);
    };


    const onPressSaveEdit = () => {
        handleEditItem(props.editItem);
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
                    onPress={() => {onPressSaveEdit()}}
                    style={modalStyles.touchableSave}>
                    <Text style={modalStyles.lbl}>
                        Save
                    </Text>
                </TouchableOpacity>

            </View>

        </Modal>
    )
}

