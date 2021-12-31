import {ActivityIndicator, Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import {modalStyles} from "../../common/styles";
import React, {useState} from "react";
import {ISkill} from "../../api/interfaces/ISkill";
import APIClient from "../../api/APIClient";
import {useDispatch} from "react-redux";
import {createSkillItem, fetchSkills} from "../../redux/actions/skillsAction";

interface CreateNewSkillModalProps {
    visible : boolean,
    callback : any
}

export const CreateNewSkillModal : React.FC <CreateNewSkillModalProps> = (props) => {
    const [nameInputText, setNameInputText] = useState("");
    const [descriptionInputText, setDescriptionInputText] = useState("");
    const [loading, setLoading] = useState(false);
    const apiClient : APIClient = new APIClient();
    const dispatch = useDispatch();

    const onPressSubmit = async () => {
        setLoading(true);
        const skill : ISkill = {id : "null", name: nameInputText, description : descriptionInputText, languages : []};
        dispatch(createSkillItem(skill));
        await apiClient.portfolioDataService.createSkill(skill);
        const skillsResponse = await apiClient.portfolioDataService.fetchSkills();
        dispatch(fetchSkills(skillsResponse.data));
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
