import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {useDispatch} from "react-redux";
import { SectionItem } from "./SectionItem";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";
import APIClient from "../../api/APIClient";
import { IProject } from "../../api/interfaces/IProject";


export interface Props {
  sectionItems: SectionItem[];
}

const mockData : SectionItem[] = [
  new SectionItem("Programming"),
];

export const ProjectsSection: React.FC <{
  title: string;
}> = ({children, title}) => {
  const dispatch = useDispatch();
  const apiClient : APIClient = new APIClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nameInputText, setNameInputText] = useState("String");
  const [editItem, setEditItem] = useState<IProject | undefined>(undefined);
  const [data, setData] = useState(mockData);
  const [isRendering, setIsRendering] = useState(false);
  const projectsData : any = useSelector((state: RootState) => state.projects);
  //const [projectsData, setProjectsData] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const projectsResponse = await apiClient.portfolioDataService.getProjects();
        dispatch({ type: "FETCH_PROJECTS_DATA", payload: projectsResponse.data });
         console.log(projectsResponse.data);
      } catch (e) {
        console.log("error:", e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 useEffect(() => {
   //console.log("projectsData", projectsData);
 }, [projectsData])
  const renderItem : ListRenderItem<IProject> = ({item} : {item: IProject}) => {
    return (
      <TouchableOpacity
        style={styles.sectionListItem}
        onPress={() => onPressItem(item)}>
        <Text style={styles.sectionListItemName}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const onPressItem = (
    item : IProject | undefined) => {
    if (item) {
      setIsModalVisible(true);
      setNameInputText(item.name);
      setEditItem(item)
    }
  };


  const setInputText = (text : string) => {
    setNameInputText(text);
  };
  const handleEditItem = (editItem : IProject | undefined) => {
    console.log("editItem :", editItem);
    const newData = projectsData.projects.map((project: IProject) => {
      if (project === editItem) {
        project.name = nameInputText;
        return project;
      }
      return project;
    });
    setData(newData);
    console.log("newData:", newData);
    setIsRendering(!isRendering);
  };


  const onPressSaveEdit = () => {
    handleEditItem(editItem);
    setIsModalVisible(false);

  };

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[styles.sectionTitle]}>
        {title}
      </Text>
      <Text
        style={[styles.sectionDescription]}>
        {children}
      </Text>
      <FlatList
        data={projectsData.projects}
        keyExtractor={(item) => item.name.toString()}
        renderItem={renderItem}
        extraData={isRendering}
      >
      </FlatList>

      <Modal
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={()=> setIsModalVisible(false)}>
        <View
          style={styles.modalView}
        >
          <Text style={styles.modalTxt}>
            Name
          </Text>
          <TextInput
            style={styles.modalInput}
            onChangeText={(text) => setInputText(text)}
            defaultValue={nameInputText}
            editable={true}
            multiline={false}
            maxLength={20}
          >
          </TextInput>
          <TouchableOpacity
            onPress={() => {onPressSaveEdit()}}
            style={styles.touchableSave}>
            <Text style={styles.modalTxt}>
              Save
            </Text>
          </TouchableOpacity>

        </View>

      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  sectionListItem: {
    borderBottomWitdth: 1,
    alignItems: "flex-start",
    backgroundColor: 'gray',
  },
  sectionListItemName: {
    marginVertical: 30,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'black',
  },
  modalView : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalTxt : {
    marginVertical: 30,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'black',
  },
  modalInput : {
    width: '90%',
    height: 70,
    borderColor: 'grey',
    borderWidth: 1,
    fontSize: 25,
    color: 'black',
  },
  touchableSave : {
    backgroundColor: 'orange',
    paddingHorizontal: 100,
    alignItems: 'center',
    marginTop: 20,
  }


});
