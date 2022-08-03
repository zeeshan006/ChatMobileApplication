import React, { useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { THEME } from "../../../../theme/index";
import images from "../../../../constants/images";
import { heightPixel, widthPixel } from "../../../../theme/responsive";
import NavRoutes from "../../../../routes/navRoutes";

const GoForNewChat = ({ navigation }) => {
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "none" },
      tabBarVisible: false,
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          backgroundColor: "#1A2434",
          // position: "absolute",
          // bottom: 5,
          width: "96%",
          marginLeft: "2%",
          borderRadius: 40,
        },
        tabBarVisible: undefined,
      });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.imgaesView}>
        <TouchableOpacity
          onPress={() => navigation.navigate(NavRoutes.SearchUser)}
        >
          <Image source={images.newChat} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("post")}>
          <Image source={images.createPost} style={styles.image} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GoForNewChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A2434",
  },
});
