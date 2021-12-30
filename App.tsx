import React from "react";
import {RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, useColorScheme, View} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Header } from "./src/components/Header/Header";
import { ProjectsSection } from "./src/components/Section/Project/ProjectsSection";
import {SkillsSection} from "./src/components/Section/SkillsSection";
import {PortfolioActionButtonsGroup} from "./src/components/PortfolioAction/PortfolioActionButtonsGroup";
import {useDispatch} from "react-redux";
import {fetchProjects} from "./src/redux/actions/projectsAction";
import APIClient from "./src/api/APIClient";

const App = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  const apiClient : APIClient = new APIClient();
  const dispatch = useDispatch();

    const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const projectsResponse = await apiClient.portfolioDataService.fetchProjects();
    dispatch(fetchProjects(projectsResponse.data));
    setRefreshing(false);

  }, [])



  return (

    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl refreshing={refreshing}
            onRefresh={onRefresh}/>
        }
      >
        <Header/>
        <ProjectsSection title="My Projects"/>
        <SkillsSection title="My Skills"/>

      </ScrollView>
        <PortfolioActionButtonsGroup/>
    </SafeAreaView>

  );
};



export default App;
