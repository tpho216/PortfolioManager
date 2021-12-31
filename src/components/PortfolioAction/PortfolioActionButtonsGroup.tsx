import React, {useState} from "react";
import ActionButton from "react-native-action-button";
// @ts-ignore
import Icon from "react-native-vector-icons/Ionicons";
import {StyleSheet} from "react-native";
import {CreateNewProjectModal} from "./CreateNewProjectModal";
import {CreateNewSkillModal} from "./CreateNewSkillModal";

export const PortfolioActionButtonsGroup: React.FC <{}> = ({
    children
}) => {
    const [shouldDisplayCreateProjectModal, setShouldDisplayCreateProjectModal] = useState(false);
    const [shouldDisplayCreateSkillModal, setShouldDisplayCreateSkillModal] = useState(false);


    const handleCreateProjectAction = async (shouldDisplayModal : boolean) => {
        console.log("Create Projects Action ...");
        setShouldDisplayCreateProjectModal(shouldDisplayModal);
    }

    const handleCreateSkillAction = async (shouldDisplayModal : boolean) => {
        console.log("Create Skills Action ...");
        setShouldDisplayCreateSkillModal(shouldDisplayModal)
    }
    return (
        <>
            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#9b59b6' title="New Project" onPress={() => handleCreateProjectAction( true)}>
                    <Icon name="add" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#1abc9c' title="New Skill" onPress={() => handleCreateSkillAction(true)}>
                    <Icon name="add" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
            <CreateNewProjectModal visible={shouldDisplayCreateProjectModal} callback={handleCreateProjectAction}/>
            <CreateNewSkillModal visible={shouldDisplayCreateSkillModal} callback={handleCreateSkillAction}/>
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
