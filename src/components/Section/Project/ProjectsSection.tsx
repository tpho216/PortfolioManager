import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Animated } from "react-native";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "../../../redux/reducers/rootReducer";
import APIClient from "../../../api/APIClient";
import {IProject } from "../../../api/interfaces/IProject";
import {Swipeable} from "react-native-gesture-handler";
import {
  deleteProjectItem,
  updateProjectItem,
  fetchProjects,
  editProjectItem
} from "../../../redux/actions/projectsAction";
import {EditProjectModal} from "./EditProjectModal";
import {sectionStyles} from "../../../common/styles";

export const ProjectsSection: React.FC <{
  title: string;
}> = ({children, title}) => {
  const dispatch = useDispatch();
  const apiClient : APIClient = new APIClient();
  const [isRendering, setIsRendering] = useState(false);
  const projectsData : any = useSelector((state: RootState) => state.projects);
  const [shouldDisplayEditProjectModal, setShouldDisplayEditProjectModal] = useState(false);

  useEffect(() => {
    (async () => {
      const projectsResponse = await apiClient.portfolioDataService.fetchProjects();
      dispatch(fetchProjects(projectsResponse.data));
    })();
  }, []);

  const swipeRight = (progress: any,dragX : any) =>{
    const scale = dragX.interpolate({
      inputRange:[-200,0],
      outputRange:[1,0.5],
      extrapolate:'clamp'
    })
    return(
        <Animated.View style={{backgroundColor:'red',width:"100%",justifyContent:'center'}}>
          <Animated.Text style={{marginLeft:'auto',marginRight:50, fontSize:15, fontWeight:'bold',transform:[{scale}]}}>Delete</Animated.Text>
        </Animated.View>
    )
  }

  const height = new Animated.Value(70)

  const handleDeleteAnimation = async (projectItem : IProject) => {
    Animated.timing(height, {
      toValue: 0,
      duration: 350,
      useNativeDriver:false
    }).start(async () => {

      dispatch(deleteProjectItem(projectsData.projects, projectItem));
      await apiClient.portfolioDataService.deleteProject(projectItem);
    });

  }

  const renderItem : ListRenderItem<IProject> = ({item} : {item: IProject}) => {

    return (
        <Swipeable renderRightActions={swipeRight} rightThreshold={-200}
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
        extraData={isRendering}
      >
      </FlatList>

      <EditProjectModal visible={shouldDisplayEditProjectModal}
                        callback={onPressItem}/>
    </View>
  )
}
