import React, { useEffect, useState } from "react";
import {
  Animated,
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {useDispatch} from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers/rootReducer";
import APIClient from "../../../api/APIClient";
import { ISkill } from "../../../api/interfaces/ISkill";
import {height, swipeLeft} from "../../../common/animation";
import {Swipeable} from "react-native-gesture-handler";
import {sectionStyles} from "../../../common/styles";
import {deleteSkillItem, editSkillItem, fetchSkills} from "../../../redux/actions/skillsAction";
import {EditSkillModal} from "./EditSkillModal";

export const SkillsSection: React.FC <{
  title: string;
}> = ({children, title}) => {
  const dispatch = useDispatch();
  const apiClient : APIClient = new APIClient();
  const skillsData : any = useSelector((state: RootState) => state.skills);
  const [shouldDisplayEditSkillModal, setShouldDisplayEditSkillModal] = useState(false);

  useEffect(() => {
    (async () => {
        // dispatch({type : "INIT_EDIT_SKILL_MODAL", payload: "something...?"});
        const skillsResponse = await apiClient.portfolioDataService.fetchSkills();
        dispatch(fetchSkills(skillsResponse.data));
    })();
  }, []);

  const renderItem : ListRenderItem<ISkill> = ({item} : {item: ISkill}) => {
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

  const handleDeleteAnimation = async (item : ISkill) => {
    Animated.timing(height, {
      toValue: 0,
      duration: 350,
      useNativeDriver:false
    }).start(async () => {
        dispatch(deleteSkillItem(skillsData.skills, item));
        await apiClient.portfolioDataService.deleteSkill(item);
    });
  }

  const onPressItem = (
      item : ISkill) => {
    if (item) {
        console.log("ITEM", item);
      dispatch(editSkillItem(item));
      setShouldDisplayEditSkillModal(true);
    } else {
      setShouldDisplayEditSkillModal(false);
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
        data={skillsData.skills}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}>
      </FlatList>

      <EditSkillModal visible={shouldDisplayEditSkillModal}
                      callback={onPressItem}/>

    </View>
  )
}
