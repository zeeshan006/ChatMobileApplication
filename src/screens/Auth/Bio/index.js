import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  Animated,
  ScrollView,
  FlatList,
  Keyboard,
} from "react-native";
import style, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from "./style";
// import Textinput from "../../../components/Textinput/textInput";
import Countrypicker from "../../../components/Countrypicker/CountryPickerinput";
import Button from "../../../components/Buttons/Button";
import SignUp from "../../../components/SignUp/signUp";
import { images } from "../../../constants";
import GLOBAL_STYLE from "../../../theme/global";
import BackNavigate from "../../../components/BackNavigate/backNavigate";
import NavRoutes from "../../../routes/navRoutes";
import _ from "lodash";
import { THEME } from "../../../theme/index";
import { useSelector, useDispatch } from "react-redux";
import { ColorTheme } from "../../../theme/change_theme";
import { Color_theme } from "../../../redux/reducer/Color_theme";
import { galleryBorder } from "../../../constants/images";
import { RFValue } from "react-native-responsive-fontsize";
import { heightPixel } from "../../../theme/responsive";
import Textinput from "../../../components/Textinput/textInput";

const Bio = ({ navigation, route }) => {
  const windowHeight = Dimensions.get("window").height;
  const [bio, setBio] = useState("");
  const Colors = useSelector((state) => state?.ColorTheme?.Color_theme);
  const image = Colors ? images.Bgimage : images.bgWhite;
  const theme = ColorTheme(Colors);
  const { gallery } = route?.params;
  const routeData = route?.params;
  console.log("---routeData---", routeData);

  const [imageHeight, setImageHeight] = useState(
    new Animated.Value(IMAGE_HEIGHT)
  );
  var AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

  useEffect(() => {
    // LogBox.ignoreWarnings(["Animated: `useNativeDriver`"]);
    // LogBox.ignoreWarnings(["Animated: `useNativeDriver`"]);
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

  return (
    <ImageBackground source={images.Bgimage} style={{ flex: 1 }}>
      <BackNavigate
        text={"Profile setup"}
        onpress={() => navigation.goBack()}
        skipText={"Skip"}
        skip={() => navigation.navigate(NavRoutes.JoinGroup)}
      />
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">
        <View style={style.container}>
          <KeyboardAvoidingView behavior="padding">
            {gallery[0]?.uri ? (
              <ImageBackground
                resizeMode="contain"
                source={images.galleryBorder}
                style={[style.UploadedBorder, {}]}
              >
                <Animated.Image
                  source={{ uri: gallery[0]?.uri }}
                  style={[style.pickerStyle, {}]}
                />
              </ImageBackground>
            ) : (
              <View
                style={{ marginTop: heightPixel(106), marginBottom: "10%" }}
              ></View>
            )}

            <View
              style={[
                style.Input,
                { backgroundColor: theme.color.textInputBgColor },
              ]}
            >
              <TextInput
                value={bio}
                style={{ color: theme.color.textColor }}
                onChangeText={(text) => setBio(text)}
                multiline
                placeholder={"Bio (optional)"}
                placeholderTextColor={theme.color.authtextColor}
              />
            </View>

            <Button
              text={"Continue"}
              onpress={() =>
                navigation.navigate(NavRoutes.JoinGroup, {
                  routeData,
                  bio,
                })
              }
            />
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Bio;
