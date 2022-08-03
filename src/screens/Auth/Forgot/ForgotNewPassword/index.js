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
  Animated,
} from "react-native";
import BackNavigate from "../../../../components/BackNavigate/backNavigate";
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from "./style";
import GLOBAL_STYLE from "../../../../theme/global";
import { images } from "../../../../constants";
import Textinput from "../../../../components/Textinput/textInput";
import Button from "../../../../components/Buttons/Button";
import Toast from "react-native-simple-toast";
import NavRoutes from "../../../../routes/navRoutes";
import { THEME } from "../../../../theme/index";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import { ColorTheme } from "../../../../theme/change_theme";
import { Color_theme } from "../../../../redux/reducer/Color_theme";
import apiConstants from "../../../../constants/apiConstants";
import ErrorModal from "../../../../components/ErrorModal/modal";

const ForgotNewPassword = ({ navigation, route }) => {
  const windowHeight = Dimensions.get("window").height;
  const [imageHeight, setImageHeight] = useState(
    new Animated.Value(IMAGE_HEIGHT)
  );
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureCpassword, setSecureCpassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState();
  const [errorModal, setErrormodal] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const Colors = useSelector((state) => state?.ColorTheme?.Color_theme);
  const image = Colors ? images.Bgimage : images.bgWhite;
  const theme = ColorTheme(Colors);
  const changePassword = (text) => {
    setPassword(text);
  };
  const changeCpassowrd = (text) => {
    setCpassword(text);
  };
  const handlepassword = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <ImageBackground source={images.Bgimage} style={{ flex: 1 }}>
      <BackNavigate
        text={"Forgot Password"}
        onpress={() => navigation.goBack()}
      />
      <ScrollView style={{}} keyboardShouldPersistTaps="always">
        <ErrorModal
          visible={errorModal}
          errorMesssage={error}
          close={modalClose}
        />
        <View style={styles.container}>
          <View style={{}}>
            <Animated.Image
              source={images.forgot3}
              style={[styles.logo, { height: imageHeight }]}
            />
          </View>
          {/* <ScrollView style={{ flex: 1 }}> */}
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={[GLOBAL_STYLE.CENTER, styles.textView]}>
              <Text style={styles.MainText}>New password</Text>
              <Text style={[styles.detailtext, { paddingTop: 10 }]}>
                Great! You are almost there. Please
              </Text>
              <Text style={styles.detailtext}>
                enter the new password below.
              </Text>
            </View>

            <Textinput
              placeholder={"Password"}
              iconhide={images.hide}
              iconshow={images.show}
              value={password}
              handleChange={handlepassword}
              onChange={changePassword}
              secureTextEntry={secureTextEntry}
            />
          </KeyboardAvoidingView>
          {/* </ScrollView> */}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ForgotNewPassword;
