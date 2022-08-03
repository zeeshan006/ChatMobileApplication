import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  Animated,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { images } from "../constants";
import GLOBAL_STYLE from "../theme/global";
import styles from "./style";

const Test = ({ navigation }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [country, setCountry] = useState("+34");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const windowHeight = Dimensions.get("window").height;
  const [animate, setAnimate] = useState("");
  const [animate1, setAnimate1] = useState("");

  useEffect(() => {
    // setAnimate("fadeInUpBig");
    // setAnimate1("fadeOut");

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
        console.log("on");
        // setAnimate("fadeInUp");
        // setAnimate("slideInUp");
        setAnimate("fadeInUpBig");
        setAnimate1("fadeOut");

        // setAnimate1("slideOut");
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
        setAnimate("fadeIn");
        setAnimate1("fadeIn");
      }
    );

    return () => {
      keyboardDidHideListener.remove(() => {});
      keyboardDidShowListener.remove(() => {});
    };
  }, []);

  return (
    <ImageBackground source={images.Bgimage} style={{ flex: 1 }}>
      <View
        style={{ flex: 1, backgroundColor: "#4c69a5", alignItems: "center" }}
      >
        <Animated.Image
          source={logo}
          style={[styles.logo, { height: this.imageHeight }]}
        />
        <ScrollView style={{ flex: 1 }}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <TextInput placeholder="Name" style={styles.input} />

            <TextInput placeholder="Surname" style={styles.input} />
            <TextInput placeholder="Email" style={styles.input} />

            <TextInput placeholder="Password" style={styles.input} />
            <TextInput placeholder="Confirm Password" style={styles.input} />
          </KeyboardAvoidingView>
        </ScrollView>
        <View>
          <TouchableOpacity style={styles.register}>
            <Text>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Test;
