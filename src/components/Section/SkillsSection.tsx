import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {useDispatch} from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";
import APIClient from "../../api/APIClient";
import { ISkill } from "../../api/interfaces/ISkill";

export const SkillsSection: React.FC <{
  title: string;
}> = ({children, title}) => {
  const dispatch = useDispatch();
  const apiClient : APIClient = new APIClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nameInputText, setNameInputText] = useState("");
  const [descriptionInputText, setDescriptionInputText] = useState("");
  const [editItem, setEditItem] = useState<ISkill | undefined>(undefined);
  const [isRendering, setIsRendering] = useState(false);
  const skillsData : any = useSelector((state: RootState) => state.skills);

  useEffect(() => {
    (async () => {
      try {
        const skillsResponse = await apiClient.portfolioDataService.getSkills();
        dispatch({ type: "FETCH_SKILLS_DATA", payload: skillsResponse.data });
      } catch (e) {
        console.log("error:", e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const renderItem : ListRenderItem<ISkill> = ({item} : {item: ISkill}) => {
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
    item : ISkill | undefined) => {
    if (item) {
      setIsModalVisible(true);
      setNameInputText(item.name);
      setDescriptionInputText(item.description)
      setEditItem(item)
    }
  };



  const handleEditItem = (editItem : ISkill | undefined) => {
    skillsData.skills.map((skill: ISkill) => {
      if (skill === editItem) {
        skill.name = nameInputText;
        skill.description = descriptionInputText;
        updateSkill(skill);
        return skill;
      }
      return skill;
    });

    setIsRendering(!isRendering);
  };

  const updateSkill = (skill : ISkill) => {
    const result = apiClient.portfolioDataService.updateSkill(skill);
    console.log(result);
  }


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
        data={skillsData.skills}
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
            onChangeText={(text) => setNameInputText(text)}
            defaultValue={nameInputText}
            editable={true}
            multiline={false}
            maxLength={20}
          >
          </TextInput>
          <Text style={styles.modalTxt}>
            Description
          </Text>
          <TextInput
              style={styles.modalInput}
              onChangeText={(text) => setDescriptionInputText(text)}
              defaultValue={descriptionInputText}
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
