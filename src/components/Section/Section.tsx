import React, { useState } from "react";
import {
  Platform, FlatList, StyleSheet, Text, useColorScheme, View,
  Modal, TouchableOpacity, TextInput, ListRenderItem
} from "react-native";
import { SectionItem } from "./SectionItem";

export interface Props {
  sectionItems: SectionItem[];
}
const mockData : SectionItem[] = [
    new SectionItem("Programming"),

];

export const Section: React.FC<{
  title: string;
}> = ({children, title}) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nameInputText, setNameInputText] = useState("String");
  const [editItem, setEditItem] = useState("something");
  const [data, setData] = useState(mockData);
  const [isRendering, setIsRendering] = useState(false);
  const renderItem : ListRenderItem<SectionItem> = ({item} : {item: SectionItem}) => {
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
    item : SectionItem) => {
    setIsModalVisible(true);
    console.log(item.name);
    setNameInputText(item.name);
    setEditItem(item.name)
  };

  const setInputText = (text : string) => {
      setNameInputText(text);
  };
  const handleEditItem = (editItem : any) => {
    const newData = mockData.map(item => {
      if (item.name === editItem) {
        item.name = nameInputText;
        return item;
      }
      return item;
    });
    setData(newData);
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
          data={data}
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
  );
};

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
