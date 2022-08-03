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
import style from "./style";
import Textinput from "../../../../components/Textinput/textInput";
import Countrypicker from "../../../../components/Countrypicker/CountryPickerinput";
import Button from "../../../../components/Buttons/Button";
import SignUp from "../../../../components/SignUp/signUp";
import { images } from "../../../../constants";
import GLOBAL_STYLE from "../../../../theme/global";
import BackNavigate from "../../../../components/BackNavigate/backNavigate";
import NavRoutes from "../../../../routes/navRoutes";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import { ColorTheme } from "../../../../theme/change_theme";
import { useSelector, useDispatch } from "react-redux";
import { Color_theme } from "../../../../redux/reducer/Color_theme";
import apiConstants from "../../../../constants/apiConstants";
import ErrorModal from "../../../../components/ErrorModal/modal";
import styles from "../../app/styles";
import Toast from "react-native-simple-toast";

const CreateAccount = ({ navigation }) => {
  const [country, setCountry] = useState("+34");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const windowHeight = Dimensions.get("window").height;
  const [animate, setAnimate] = useState("");
  const [animate1, setAnimate1] = useState("");
  const [error, setError] = useState();
  const [errorModal, setErrormodal] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const Colors = useSelector((state) => state?.ColorTheme?.Color_theme);
  const image = Colors ? images.bgWhite : images.Bgimage;
  const theme = ColorTheme(Colors);

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
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
        console.log("on");
        setAnimate("fadeInUpBig");
        setAnimate1("fadeOut");
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

  const requestOtp = async () => {
    if (phone == "" || country == "") {
      setError("Phone Number field is required");
      setErrormodal(true);
    } else {
      const mobileNumber = country + phone;
      setLoading(true);
      setDisable(true);
      axios
        .post(apiConstants.base_url + apiConstants.otp_req, {
          phone: mobileNumber,
        })
        .then(async (response) => {
          setLoading(false);
          setDisable(false);
          Toast.show(response?.data?.data);
          setTimeout(() => {
            navigation.navigate(NavRoutes.CREATE_ACCOUNT_OTP, { mobileNumber });
          }, 2000);

          console.log("response", response?.data?.data);
        })
        .catch((error) => {
          setError(error?.response?.data?.error);
          setErrormodal(true);
          setLoading(false);
          setDisable(false);
          console.log("error", error);
        });
    }
  };

  return (
    <ImageBackground source={image} style={{ flex: 1 }}>
      <BackNavigate text={"Sign up"} onpress={() => navigation.goBack()} />
      <ErrorModal
        visible={errorModal}
        errorMesssage={error}
        close={modalClose}
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.container}>
          <Animatable.View
            animation={animate1}
            duration={500}
            style={[GLOBAL_STYLE.CENTER, style.IconImage]}
          >
            <Image source={images.userVector} style={style.iconStyle} />
          </Animatable.View>

          <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
            <Animatable.View animation={animate} duration={600}>
              <View style={[GLOBAL_STYLE.CENTER, style.textView]}>
                <Text
                  style={[style.MainText, { color: theme.color.authtextColor }]}
                >
                  Create an account
                </Text>
                <Text
                  style={[
                    style.detailtext,
                    { paddingTop: 8, color: theme.color.authtextColor },
                  ]}
                >
                  Please confirm your country code and
                </Text>
                <Text
                  style={[
                    style.detailtext,
                    { color: theme.color.authtextColor },
                  ]}
                >
                  enter your phone number.
                </Text>
              </View>

              <Countrypicker
                country={country}
                placeholder={"Phone Number"}
                image={images.Calling}
                onchange={onchange}
                value={phone}
                hanldeCountryPicker={hanldeCountryPicker}
              />
              <Button
                text={"Continue"}
                disable={disable}
                loading={loading}
                onpress={() => {
                  requestOtp();
                }}
              />
              <TouchableOpacity
                style={[style.alreadyAccountView]}
                onPress={() => navigation.navigate(NavRoutes.LOGIN)}
              >
                <Text
                  style={[
                    style.forgetText,
                    { color: theme.color.authtextColor },
                  ]}
                >
                  Don’t have an account yet?
                </Text>
                <SignUp image={images.Login} width={40} height={40} />
              </TouchableOpacity>
            </Animatable.View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default CreateAccount;
