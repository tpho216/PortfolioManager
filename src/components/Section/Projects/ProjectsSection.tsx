import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Animated } from "react-native";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "../../../redux/reducers/rootReducer";
import APIClient from "../../../api/APIClient";
import {IProject } from "../../../api/interfaces/IProject";
import {Swipeable} from "react-native-gesture-handler";
import {
  deleteProjectItem,
  fetchProjects,
  editProjectItem
} from "../../../redux/actions/projectsAction";
import {EditProjectModal} from "./EditProjectModal";
import {sectionStyles} from "../../../common/styles";
import {height, swipeLeft} from "../../../common/animation";

export const ProjectsSection: React.FC <{
  title: string;
}> = ({children, title}) => {
  const dispatch = useDispatch();
  const apiClient : APIClient = new APIClient();
  const projectsData : any = useSelector((state: RootState) => state.projects);
  const [shouldDisplayEditProjectModal, setShouldDisplayEditProjectModal] = useState(false);

  useEffect(() => {
    (async () => {
      const projectsResponse = await apiClient.portfolioDataService.fetchProjects();
      dispatch(fetchProjects(projectsResponse.data));
    })();
  }, []);


    const renderItem : ListRenderItem<IProject> = ({item} : {item: IProject}) => {

        return (
            <Swipeable renderRightActions={swipeLeft} rightThreshold={-200}
                       onSwipeableOpen={async () => handleDeleteAnimation(item)}
            >
                <Animated.View style={{flex:1}}>
                    <TouchableOpacity
                        style={sectionStyles.listItem}
                        onPress={() => onPressItem(item)}>
                        <Text style={sectionStyles.listItemName}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </Swipeable>
        );
    };

  const handleDeleteAnimation = async (item : IProject) => {
    Animated.timing(height, {
      toValue: 0,
      duration: 350,
      useNativeDriver:false
    }).start(async () => {

      dispatch(deleteProjectItem(projectsData.projects, item));
      await apiClient.portfolioDataService.deleteProject(item);
    });

  }


  const onPressItem = (
    item : IProject) => {
    if (item) {
      dispatch(editProjectItem(item));
      setShouldDisplayEditProjectModal(true);
    } else { //if no item, means to callback from modal view
      setShouldDisplayEditProjectModal(false);
    }
  };


  return (
    <View style={sectionStyles.container}>
      <Text
        style={[sectionStyles.title]}>
        {title}
      </Text>
      <Text
        style={[sectionStyles.description]}>
        {children}
      </Text>
      <FlatList
        data={projectsData.projects}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      >
      </FlatList>

      <EditProjectModal visible={shouldDisplayEditProjectModal}
                        callback={onPressItem}/>
    </View>
  )
}
