import React, { Component, useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Dimensions,
  Alert,
} from "react-native";
// import { images } from "../../../../constants/images";
import Toast from "react-native-simple-toast";
import { useSelector, useDispatch } from "react-redux";
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from "./style";
import Textinput from "../../../../components/Textinput/textInput";
import Button from "../../../../components/Buttons/Button";
import { THEME } from "../../../../theme";
import GLOBAL_STYLE from "../../../../theme/global";
import { images } from "../../../../constants";
import BackNavigate from "../../../../components/BackNavigate/backNavigate";
import NavRoutes from "../../../../routes/navRoutes";
import { ColorTheme } from "../../../../theme/change_theme";
import ErrorModal from "../../../../components/ErrorModal/modal";
const CreateAccountPassword = ({ navigation, route }) => {
  const windowHeight = Dimensions.get("window").height;
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureCpassword, setSecureCpassword] = useState(true);
  const [error, setError] = useState();
  const [errorModal, setErrormodal] = useState(false);
  const mobileNumber = route?.params?.mobileNumber;
  const Colors = useSelector((state) => state?.ColorTheme?.Color_theme);
  const theme = ColorTheme(Colors);
  const image = Colors ? images.Bgimage : images.bgWhite;
  const changePassword = (text) => {
    setPassword(text);
  };
  const changeCpassowrd = (text) => {
    setCpassword(text);
  };
  const handlepassword = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleCpassword = () => {
    setSecureCpassword(!secureCpassword);
  };
  const modalClose = () => {
    setErrormodal(false);
  };

  const createAccount = () => {
    if (password == "") {
      setError("Password field is required");
      setErrormodal(true);
    }
    if (cPassword == "") {
      setError("Confirm password field is required");
      setErrormodal(true);
    } else if (!password.trim() || !cPassword.trim()) {
      setError("Password field is required");
      setErrormodal(true);
    } else if (password?.length < 6) {
      setError("Password must be at least 6 characters long");
      setErrormodal(true);
    } else if (password != cPassword) {
      setError("Password and Confirm Password must be the same");
      setErrormodal(true);
    } else {
      Toast.show("Account Created Successfully");
      navigation.navigate(NavRoutes.Profile, {
        password: password,
        mobileNumber: mobileNumber,
      });
    }
  };
  const [imageHeight, setImageHeight] = useState(
    new Animated.Value(IMAGE_HEIGHT)
  );

  useEffect(() => {
    const keyboardVisibleListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      keyboardDidShow
    );
    const keyboardHiddenListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      // handleKeyboardHidden
      keyboardDidHide
    );

    return () => {
      keyboardHiddenListener.remove();
      keyboardVisibleListener.remove();
    };
  }, []);

  const keyboardWillShow = (event) => {
    Animated.timing(imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
  };

  const keyboardWillHide = (event) => {
    Animated.timing(imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT,
    }).start();
  };

  const keyboardDidShow = (event) => {
    Animated.timing(imageHeight, {
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
  };

  const keyboardDidHide = (event) => {
    Animated.timing(imageHeight, {
      toValue: IMAGE_HEIGHT,
    }).start();
  };
  return (
    <>
      <ImageBackground source={images.Bgimage} style={{ flex: 1 }}>
        <BackNavigate
          text={"Create Account"}
          onpress={() => navigation.goBack()}
        />
        <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">
          <ErrorModal
            visible={errorModal}
            errorMesssage={error}
            close={modalClose}
          />
          <View style={styles.container}>
            <View style={{}}>
              <Animated.Image
                source={images.userVector}
                style={[styles.logo, { height: imageHeight }]}
              />
            </View>
            {/* <ScrollView style={{ flex: 1 }}> */}
            <KeyboardAvoidingView style={styles.container} behavior="padding">
              <View style={[GLOBAL_STYLE.CENTER, styles.textView]}>
                <Text style={styles.MainText}>You are almost there!</Text>
                <Text style={[styles.detailtext, { paddingTop: 10 }]}>
                  Set up your username and password
                </Text>
                <Text style={styles.detailtext}>
                  below to complete the registration.
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
              <Textinput
                placeholder={"Retype password"}
                iconhide={images.hide}
                iconshow={images.show}
                value={cPassword}
                handleChange={handleCpassword}
                onChange={changeCpassowrd}
                secureTextEntry={secureCpassword}
              />
              <View style={{ marginBottom: "5%" }}>
                <Button
                  text={"Create account"}
                  onpress={() => {
                    createAccount();
                  }}
                />
              </View>
            </KeyboardAvoidingView>
            {/* </ScrollView> */}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};
export default CreateAccountPassword;
