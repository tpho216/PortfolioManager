import React, {useState} from "react";
import {ActivityIndicator, Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import {IProject} from "../../api/interfaces/IProject";
import {useDispatch} from "react-redux";
import APIClient from "../../api/APIClient";
import {addProjectItem, fetchProjects} from "../../redux/actions/projectsAction";
import {modalStyles} from "../../common/styles";

interface CreateNewProjectModalProps {
    visible : boolean,
    callback : any
}

export const CreateNewProjectModal: React.FC <CreateNewProjectModalProps> = (props) => {
    const [nameInputText, setNameInputText] = useState("");
    const [descriptionInputText, setDescriptionInputText] = useState("");
    const [loading, setLoading] = useState(false);
    const apiClient : APIClient = new APIClient();
    const dispatch = useDispatch();


    const onPressSubmit = async () => {
        setLoading(true);
        const project : IProject = {id : "null", name: nameInputText, description : descriptionInputText};
        dispatch(addProjectItem(project));
        await apiClient.portfolioDataService.createProject(project);
        const projectsResponse = await apiClient.portfolioDataService.fetchProjects();
        dispatch(fetchProjects(projectsResponse.data));
        setLoading(false);
        props.callback(false);
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
                    <View>
                        {loading
                            ?
                            <ActivityIndicator style={modalStyles.lbl} size="large" color="black"/>
                            :
                            <Text style={modalStyles.lbl}>
                                Create
                            </Text>}

                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}
