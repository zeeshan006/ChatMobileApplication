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
  ActivityIndicator,
  SafeAreaView,
  Keyboard,
} from "react-native";
import Toast from "react-native-simple-toast";
import * as Animatable from "react-native-animatable";
import style from "./style";
import Button from "../../../../components/Buttons/Button";
import { images } from "../../../../constants";
import GLOBAL_STYLE from "../../../../theme/global";
import BackNavigate from "../../../../components/BackNavigate/backNavigate";
import NavRoutes from "../../../../routes/navRoutes";
import { useDispatch, useSelector } from "react-redux";
import { ColorTheme } from "../../../../theme/change_theme";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import apiConstants from "../../../../constants/apiConstants";
import axios from "axios";
import ErrorModal from "../../../../components/ErrorModal/modal";
import SignUp from "../../../../components/SignUp/signUp";
import CreateAccountPassword from "../CreateAccountPassword/index";

const CreateAccountOtp = ({ navigation, route }) => {
  const [animate, setAnimate] = useState("");
  const [animate1, setAnimate1] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [otp, setOtp] = useState();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendloading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState();
  const [errorModal, setErrormodal] = useState(false);
  const windowHeight = Dimensions.get("window").height;
  const [TextInputDisableStatus, SetTextInputDisableStatus] = useState(true);
  const CELL_COUNT = 4;
  const Colors = useSelector((state) => state?.ColorTheme?.Color_theme);
  const image = Colors ? images.Bgimage : images.bgWhite;
  const theme = ColorTheme(Colors);
  const mobileNumber = route?.params?.mobileNumber;
  const modalClose = () => {
    setErrormodal(false);
  };
  const verificationOtp = async () => {
    if (otp == "" || otp === null) {
      setError("Sorry you cannot proceed without an OTP verification");
      setErrormodal(true);
      setLoading(false);
      setDisable(false);
    } else {
      setLoading(true);
      setDisable(true);

      axios
        .post(apiConstants.base_url + apiConstants.otp_verification, {
          phone: mobileNumber,
          otp: otp,
        })
        .then((response) => {
          console.log("response", response?.data);
          setLoading(false);
          setDisable(false);
          Toast.show(response?.data?.data);
          setTimeout(() => {
            navigation.navigate(NavRoutes.CREATE_ACCOUNT_PASSWORD, {
              mobileNumber,
            });
            setOtp("");
          }, 2000);
        })
        .catch((error) => {
          setError("OTP is not correct");
          setErrormodal(true);
          setDisable(false);
          setLoading(false);
          setOtp("");
        });
    }
  };

  const resendOtp = async () => {
    setResendloading(true);
    const mobileNumber = route?.params?.mobileNumber;
    axios
      .post(apiConstants.base_url + apiConstants.otp_req, {
        phone: mobileNumber,
      })
      .then(async (response) => {
        setResendloading(false);
        Toast.show(response?.data?.data);
        console.log("response", response?.data?.data);
      })
      .catch(async (error) => {
        setResendloading(false);
        console.log("error", error?.response?.data.data);
      });
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
        console.log("of");
        setAnimate("fadeIn");
        setAnimate1("fadeIn");
      }
    );
    return () => {
      keyboardDidHideListener.remove(() => {
        console.log("--DidHide");
      });
      keyboardDidShowListener.remove(() => {
        console.log("--DidShow");
      });
      console.log("--DidHide outside");
    };
  }, []);

  return (
    <ImageBackground source={images.Bgimage} style={{ flex: 1 }}>
      <BackNavigate
        text={"Create Account"}
        onpress={() => navigation.goBack()}
      />
      <ScrollView keyboardShouldPersistTaps="always">
        <ErrorModal
          visible={errorModal}
          errorMesssage={error}
          close={modalClose}
        />

        <View style={style.container}>
          <Animatable.View
            animation={animate1}
            duration={500}
            style={[GLOBAL_STYLE.CENTER, style.IconImage]}
          >
            <Image source={images.userVector} style={style.iconStyle} />
          </Animatable.View>
          <KeyboardAvoidingView behavior="position">
            <Animatable.View animation={animate} duration={600} style={{}}>
              <View style={[GLOBAL_STYLE.CENTER, style.textView]}>
                <Text style={style.MainText}>Enter code</Text>
                <Text style={[style.detailtext, { paddingTop: 8 }]}>
                  We have sent you an SMS with the
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={style.detailtext}>code to </Text>
                  <Text style={[style.detailtext, { fontWeight: "bold" }]}>
                    {mobileNumber}.
                  </Text>
                </View>
              </View>

              <View style={style.optView}>
                <CodeField
                  // autoFocus
                  value={otp}
                  onChangeText={(v) => {
                    setOtp(v);
                  }}
                  editable={TextInputDisableStatus}
                  cellCount={CELL_COUNT}
                  rootStyle={{
                    width: "90%",
                  }}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <>
                      <View>
                        <View
                          style={[
                            style.underlineStyleBase,
                            isFocused && style.focusCell,
                          ]}
                        >
                          <Text
                            key={index}
                            style={[
                              {
                                fontSize: 24,
                                fontWeight: "700",
                                color: "white",
                              },
                            ]}
                          >
                            {symbol || (isFocused ? <Cursor /> : null)}
                          </Text>
                        </View>
                      </View>
                    </>
                  )}
                />
              </View>

              <Button
                text={"Continue"}
                disable={disable}
                loading={loading}
                onpress={() => {
                  verificationOtp();
                }}
              />
              {resendLoading ? (
                <View style={[style.alreadyAccountView]}>
                  <ActivityIndicator></ActivityIndicator>
                </View>
              ) : (
                <TouchableOpacity
                  style={[style.alreadyAccountView]}
                  onPress={() => resendOtp()}
                >
                  <Text
                    style={[
                      style.forgetText,
                      { color: theme.color.authtextColor },
                    ]}
                  >
                    Did not receive the code?
                  </Text>
                  <SignUp image={images.resend} width={90} height={20} />
                </TouchableOpacity>
              )}
            </Animatable.View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default CreateAccountOtp;
