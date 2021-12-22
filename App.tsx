import React from "react";
import { SafeAreaView, ScrollView, StatusBar, useColorScheme, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Header } from "./src/components/Header/Header";
import { Section } from "./src/components/Section/Section";
import { ProjectsSection } from "./src/components/Section/ProjectsSection";

const App = () => {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (

    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <Header/>
        <View>
          <ProjectsSection title="My Projects"></ProjectsSection>
          <Section title="Services"></Section>
        </View>
      </ScrollView>

    </SafeAreaView>

  );
};

export default App;
