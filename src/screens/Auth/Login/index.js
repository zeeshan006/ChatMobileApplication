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
  SafeAreaView,
} from "react-native";
import styles from "./style";
import * as Animatable from "react-native-animatable";
import Textinput from "../../../components/Textinput/textInput";
import Countrypicker from "../../../components/Countrypicker/CountryPickerinput";
import Button from "../../../components/Buttons/Button";
import SignUp from "../../../components/SignUp/signUp";
import GLOBAL_STYLE from "../../../theme/global";
import { images } from "../../../constants";
import NavRoutes from "../../../routes/navRoutes";
import { useDispatch, useSelector } from "react-redux";
import { ColorTheme } from "../../../theme/change_theme";
import apiConstants from "../../../constants/apiConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Socket from "../../../socket/socket";
import ErrorModal from "../../../components/ErrorModal/modal";
import addMsg from "../../Chat/ChatScreens/ChatMessage/helper/addMsg";
import { getallUsers } from "../../Chat/ChatScreens/ChatMessage/helper/getallUser";
import { THEME } from "../../../theme/index";
const Login = ({ navigation }) => {
  const [country, setCountry] = useState("+34");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const windowHeight = Dimensions.get("window").height;
  const [animate, setAnimate] = useState("");
  const [animate1, setAnimate1] = useState("");
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState();
  const [errorModal, setErrormodal] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(true);
  const dispatch = useDispatch();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const Colors = useSelector((state) => state?.ColorTheme?.Color_theme);
  const image = Colors ? images.bgWhite : images.Bgimage;
  const logo = Colors ? images.appLogowhite : images.appLogo;
  // const [visible, setVisible] = useState(true);
  const theme = ColorTheme(Colors);

  const changePassword = (text) => {
    setPassword(text);
  };
  const handlepassword = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const hanldeCountryPicker = (text) => {
    setCountry(text);
  };
  const onchange = (text) => {
    setPhone(text);
  };
  const modalClose = () => {
    setErrormodal(false);
  };

  useEffect(() => {
    return () => {
      keyboardDidHideListener.remove(() => {});
      keyboardDidShowListener.remove(() => {});
    };
  }, []);

  const Login = async () => {
    if (phone == "") {
      setError("Phone Number field is required");
      setErrormodal(true);
    } else if (password == "") {
      setError("Password field is required");
      setErrormodal(true);
    } else {
      const mobileNumber = country + phone;
      setLoading(true);
      setDisable(true);
      axios
        .post(apiConstants.base_url + apiConstants.simpleLogin, {
          phone: mobileNumber,
          password: password,
          fcm_token: "fcm_token",
        })
        .then(async (response) => {
          setLoading(false);
          setDisable(false);
          setSocket();
          AsyncStorage.setItem("token", response?.data?.data);
          setTimeout(() => {
            navigation.navigate("ChatNavigators");
          }, 2000);

          // console.log("response", response?.data?.data);
        })
        .catch((error) => {
          setLoading(false);
          setDisable(false);
          setError(error?.response?.data?.error);
          setErrormodal(true);
          console.log("error", error?.response?.data?.error);
        });
    }
  };

  const setSocket = async () => {
    Socket.setupSocket((data) => {
      console.log(data, "data");
      Socket.messageReciver((data) => {
        addMsg(dispatch, data);
        getallUsers(dispatch);
      });
    });
    Socket.sendMediaMessage((data) => {
      data?.media?.forEach((element) => {
        addMsg(dispatch, element);
        getallUsers(dispatch);
      });
    });
  };
  return (
    <ImageBackground source={image} style={{ flex: 1 }}>
      <ErrorModal
        visible={errorModal}
        errorMesssage={error}
        close={modalClose}
      />
      <ScrollView style={{}} keyboardShouldPersistTaps="always">
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          {isKeyboardVisible ? (
            <Animatable.Image
              // duration={500}
              animation={animate1}
              source={logo}
              style={[styles.logo]}
            />
          ) : null}

          <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            keyboardVerticalOffset={50}
          >
            <Animatable.View animation={animate} duration={600}>
              <View style={[GLOBAL_STYLE.CENTER, styles.textView]}>
                <Text style={[styles.MainText, {}]}>All-in-one app</Text>
                <Text
                  style={[
                    styles.detailtext,
                    {
                      paddingTop: 8,
                      color: THEME.COLORS.authtextColor,
                    },
                  ]}
                >
                  Duis autem vel eum iriure dolor in
                </Text>
                <Text
                  style={[
                    styles.detailtext,
                    { color: THEME.COLORS.authtextColor },
                  ]}
                >
                  hendrerit in vulputate esse.
                </Text>
              </View>
              <Countrypicker
                country={country}
                placeholder={"Phone Number"}
                image={images.user}
                onchange={onchange}
                value={phone}
                hanldeCountryPicker={hanldeCountryPicker}
              />
              <Textinput
                placeholder={"Password"}
                iconhide={images.hide}
                iconshow={images.show}
                value={password}
                handleChange={handlepassword}
                onChange={changePassword}
                secureTextEntry={secureTextEntry}
              />
              <Button
                text={"Login"}
                disable={disable}
                loading={loading}
                onpress={() => Login()}
              />
              <TouchableOpacity
                style={styles.forgetBtn}
                onPress={() => navigation.navigate(NavRoutes.FORGOT_PASSWORD)}
              >
                <Text style={[styles.forgetText, {}]}>Forgot password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(NavRoutes.CREATE_ACCOUNT);
                }}
                style={styles.alreadyAccountView}
              >
                <Text
                  style={[
                    styles.forgetText,
                    { color: theme.color.authtextColor },
                  ]}
                >
                  Don’t have an account yet?
                </Text>
                <SignUp image={images.SignImage} width={60} height={40} />
              </TouchableOpacity>
            </Animatable.View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Login;
