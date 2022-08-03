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
} from "react-native";

const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
   setKeyboardVisible(true); // or some other action
   setAnimate("fadeInUpBig");
   setAnimate1("fadeOut");

   // setAnimate1("slideOut");
});
const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
   setKeyboardVisible(false); // or some other action
   setAnimate("fadeIn");
   setAnimate1("fadeIn");
});
export { keyboardDidShowListener, keyboardDidHideListener };
