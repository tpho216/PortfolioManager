import React from "react";
import { ImageBackground, StyleSheet, useColorScheme, View, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";


export const Header: React.FC <{
}> = ({
  children,  }) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View>
      <ImageBackground
        accessibilityRole="image"
        source={require('../../../assets/logo.png')}
        style={[
          styles.background,
          {
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
          },
        ]}
        imageStyle={styles.logo}>
        <Text
          style={[styles.text,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            }
            ]}
          >
          Portfolio Manager
        </Text>
      </ImageBackground>

    </View>




  );
};

const styles = StyleSheet.create({
  background: {
    paddingBottom: 40,
    paddingTop: 96,
    paddingHorizontal: 32,
  },
  logo: {
    opacity: 0.2,
    overflow: 'visible',
    resizeMode: 'cover',
    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */
    marginLeft: 0,
    marginBottom: 0,
  },
  text: {
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
  },
});
