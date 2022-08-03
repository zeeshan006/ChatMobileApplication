import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import style from "./style";
import Countrypicker from "../../../../components/Countrypicker/CountryPickerinput";
import GLOBAL_STYLE from "../../../../theme/global";
import { images } from "../../../../constants";
import NavRoutes from "../../../../routes/navRoutes";
import { THEME } from "../../../../theme/index";
import BackNavigate from "../../../../components/BackNavigate/backNavigate";
import Button from "../../../../components/Buttons/Button";
import SignUp from "../../../../components/SignUp/signUp";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-simple-toast";
import { ColorTheme } from "../../../../theme/change_theme";
import apiConstants from "../../../../constants/apiConstants";
import axios from "axios";
import ErrorModal from "../../../../components/ErrorModal/modal";

import * as Animatable from "react-native-animatable";
const ForgotPassword = ({ navigation }) => {
  const [country, setCountry] = useState("+34");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  33;
  const [error, setError] = useState();
  const [errorModal, setErrormodal] = useState(false);
  const windowHeight = Dimensions.get("window").height;
  const Colors = useSelector((state) => state?.ColorTheme?.Color_theme);
  const image = Colors ? images.bgWhite : images.Bgimage;
  const theme = ColorTheme(Colors);
  const [animate, setAnimate] = useState("");
  const [animate1, setAnimate1] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  return (
    <SafeAreaView style={GLOBAL_STYLE.FLEX}>
      <ImageBackground source={images.Bgimage} style={{ flex: 1 }}>
        <BackNavigate
          text={"Forgot Password"}
          onpress={() => navigation.goBack()}
        />
        <ErrorModal
          visible={errorModal}
          errorMesssage={error}
          close={modalClose}
        />
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={style.container}>
            <Animatable.View
              animation={animate1}
              duration={500}
              style={[GLOBAL_STYLE.CENTER, style.IconImage]}
            >
              <Image source={images.forgot1} style={style.iconStyle} />
            </Animatable.View>
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={10}
            >
              <Animatable.View animation={animate} duration={600} style={{}}>
                <View style={[GLOBAL_STYLE.CENTER, style.textView]}>
                  <Text style={style.MainText}>Forgot password?</Text>
                  <Text style={[style.detailtext, { paddingTop: 8 }]}>
                    Please confirm your country code and
                  </Text>
                  <Text style={style.detailtext}>enter your phone number.</Text>
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
                  onpress={() => requestOtp()}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(NavRoutes.CREATE_ACCOUNT);
                  }}
                  style={style.alreadyAccountView}
                >
                  <Text style={[style.forgetText]}>
                    Don’t have an account yet?
                  </Text>
                  <SignUp image={images.SignImage} width={60} height={40} />
                </TouchableOpacity>
              </Animatable.View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ForgotPassword;
