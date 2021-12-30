import React, {useEffect, useState} from "react";
import ActionButton from "react-native-action-button";
// @ts-ignore
import Icon from "react-native-vector-icons/Ionicons";
import {FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {CreateNewProjectModal} from "./CreateNewProjectModal";

export const PortfolioActionButtonsGroup: React.FC <{}> = ({
    children
}) => {
    const [shouldDisplayCreateProjectModal, setShouldDisplayCreateProjectModal] = useState(false);



    const handleCreateProjectButtonPressed = async (shouldDisplayModal : boolean) => {
        console.log("Create Project Action ...");
        setShouldDisplayCreateProjectModal(shouldDisplayModal);
    }

    const handleCreateSkillAction = async () => {
        console.log("Create Skill Action ...");
    }
    return (
        <>
            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#9b59b6' title="New Project" onPress={() => handleCreateProjectButtonPressed( true)}>
                    <Icon name="add" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#1abc9c' title="New Skill" onPress={() => handleCreateSkillAction()}>
                    <Icon name="add" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
            <CreateNewProjectModal visible={shouldDisplayCreateProjectModal} callback={handleCreateProjectButtonPressed}/>
        </>


)
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});
