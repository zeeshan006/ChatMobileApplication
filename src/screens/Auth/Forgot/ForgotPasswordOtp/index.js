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
  ActivityIndicator,
} from "react-native";
import style from "./style";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import * as Animatable from "react-native-animatable";
import { images } from "../../../../constants";
import GLOBAL_STYLE from "../../../../theme/global";
import BackNavigate from "../../../../components/BackNavigate/backNavigate";
import Button from "../../../../components/Buttons/Button";
import SignUp from "../../../../components/SignUp/signUp";
import NavRoutes from "../../../../routes/navRoutes";
import Toast from "react-native-simple-toast";
import { useDispatch, useSelector } from "react-redux";
import { ColorTheme } from "../../../../theme/change_theme";
import { Color_theme } from "../../../../redux/reducer/Color_theme";
import apiConstants from "../../../../constants/apiConstants";
import axios from "axios";
import ErrorModal from "../../../../components/ErrorModal/modal";

const ForgotPasswordOtp = ({ navigation, route }) => {
  const [otp, setOtp] = useState();
  const windowHeight = Dimensions.get("window").height;
  const [TextInputDisableStatus, SetTextInputDisableStatus] = useState(true);
  const CELL_COUNT = 4;
  const [animate, setAnimate] = useState("");
  const [animate1, setAnimate1] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendloading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState();
  const [errorModal, setErrormodal] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const dispatch = useDispatch();
  const Colors = useSelector((state) => state?.ColorTheme?.Color_theme);
  const image = Colors ? images.bgWhite : images.Bgimage;
  const theme = ColorTheme(Colors);
  const mobileNumber = route?.params?.mobileNumber;
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

  return (
    <ImageBackground source={images.Bgimage} style={{ flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps="always">
        <ErrorModal
          visible={errorModal}
          errorMesssage={error}
          close={modalClose}
        />
        <View style={style.container}>
          <BackNavigate
            text={"Forgot Password Otp"}
            onpress={() => navigation.goBack()}
          />
          <Animatable.View
            animation={animate1}
            duration={500}
            style={[GLOBAL_STYLE.CENTER, style.IconImage]}
          >
            <Image source={images.forgot2} style={style.iconStyle} />
          </Animatable.View>
          <KeyboardAvoidingView behavior="position">
            <Animatable.View animation={animate} duration={600} style={{}}>
              <View style={[GLOBAL_STYLE.CENTER, style.textView]}>
                <Text style={style.MainText}>Enter code</Text>
                <Text style={[style.detailtext, { paddingTop: 8 }]}>
                  We have sent you an SMS with the
                </Text>
                <Text style={[style.detailtext, { fontWeight: "bold" }]}>
                  {"code to " + mobileNumber}
                </Text>
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
              {/* <Button
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
                  <Text style={[style.forgetText]}>
                    Did not receive the code?
                  </Text>
                  <SignUp image={images.resend} height width />
                </TouchableOpacity>
              )} */}
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

export default ForgotPasswordOtp;
