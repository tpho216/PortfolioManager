import React, {useEffect, useState} from "react";
import APIClient from "../../../api/APIClient";
import {useDispatch, useSelector} from "react-redux";
import {editProjectItem, fetchProjects, updateProjectItem} from "../../../redux/actions/projectsAction";
import {Modal, TextInput, TouchableOpacity, View, Text, ActivityIndicator} from "react-native";
import {modalStyles} from "../../../common/styles";
import {RootState} from "../../../redux/reducers/rootReducer";

interface EditProjectModalProps {
    visible : boolean,
    callback : any
}

export const EditProjectModal: React.FC <EditProjectModalProps> = (props) => {
    const projectsData : any  = useSelector((state: RootState) => state.projects);
    const editProjectModalData : any = useSelector((state: RootState) => state.editProjectModal);
    const [loading, setLoading] = useState(false);
    const apiClient : APIClient = new APIClient();
    const dispatch = useDispatch();

    const handleInputChanged = (newName : string, newDescription : string) => {
        const newProject = {
            id: editProjectModalData.editProjectModal.id,
            name : newName,
            description : newDescription
        }
        dispatch(editProjectItem(newProject));
    }

    const onPressSaveEdit = async () => {
        setLoading(true);
        const editItem  = editProjectModalData.editProjectModal;
        const newProject = {
            id: editItem.id,
            name : editItem.name,
            description: editItem.description
        }

        // ! Make API call here (not in dispatch function)
        // may cause interruption otherwise
        console.log("NEW PROJECT:", newProject);
        await apiClient.portfolioDataService.updateProject(newProject);
        dispatch(updateProjectItem(projectsData.projects, newProject));

        const projectsResponse = await apiClient.portfolioDataService.fetchProjects();
        dispatch(fetchProjects(projectsResponse.data));
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
                        handleInputChanged(nameTxt, editProjectModalData.editProjectModal.description)
                    }
                    defaultValue={editProjectModalData.editProjectModal.name}
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
                        handleInputChanged(editProjectModalData.editProjectModal. name, descTxt)}
                    defaultValue={editProjectModalData.editProjectModal.description}
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

