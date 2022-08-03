import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  PermissionsAndroid,
  Platform,
  KeyboardAvoidingView,
  Pressable,
  Modal,
  Alert,
  FlatList,
  Keyboard,
  Animated,
} from "react-native";
import style, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from "./style";
import Textinput from "../../../components/Textinput/textInput";
import Countrypicker from "../../../components/Countrypicker/CountryPickerinput";
import Button from "../../../components/Buttons/Button";
import SignUp from "../../../components/SignUp/signUp";
import { images } from "../../../constants";
import GLOBAL_STYLE from "../../../theme/global";
import BackNavigate from "../../../components/BackNavigate/backNavigate";
import NavRoutes from "../../../routes/navRoutes";
import CameraRoll from "@react-native-community/cameraroll";
import FastImage from "react-native-fast-image";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { ColorTheme } from "../../../theme/change_theme";
import { Color_theme } from "../../../redux/reducer/Color_theme";
import ErrorModal from "../../../components/ErrorModal/modal";
import { RFValue } from "react-native-responsive-fontsize";
import { heightPixel } from "../../../theme/responsive";

const Profile = ({ navigation, route }) => {
  const windowHeight = Dimensions.get("window").height;
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadprofile, setUploadprofile] = useState(false);
  const [error, setError] = useState();
  const [errorModal, setErrormodal] = useState(false);
  const [name, setName] = useState("");
  const [gallery, setGallery] = useState([]);
  const [galleryImg, setGalleryImg] = useState([]);
  const [image, setImages] = useState();
  const [galleryImages, setGalleryImages] = useState([]);
  const Colors = useSelector((state) => state?.ColorTheme?.Color_theme);
  const theme = ColorTheme(Colors);
  const bgimg = Colors ? images.Bgimage : images.bgWhite;
  const uplogBtnImg = Colors ? images.uploadProfile : images?.profileWhite;
  const profileBorder = Colors ? images.profileUpload : images?.whiteBorder;
  const { password, mobileNumber } = route?.params;
  const [imageHeight, setImageHeight] = useState(
    new Animated.Value(IMAGE_HEIGHT)
  );

  const onChange = (text) => {
    setName(text);
  };

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

  const ItemRender = ({ item }) => {
    return (
      <>
        {item?.index !== 0 && (
          <TouchableOpacity
            style={style.galleryView}
            onPress={() => getPhoto()}
          >
            <ImageBackground
              source={images?.galleryBorder}
              resizeMode="contain"
              style={style.galleryBorder}
            >
              <Animated.Image
                source={{ uri: item?.index !== 0 && item?.item?.uri }}
                style={[style.galleryImage]}
              />
            </ImageBackground>
          </TouchableOpacity>
        )}
      </>
    );
  };
  return (
    <ImageBackground source={images.Bgimage} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">
        <View style={{ flex: 1 }}>
          <ErrorModal
            visible={errorModal}
            errorMesssage={error}
            close={modalClose}
          />
          <BackNavigate
            text={"Sign up"}
            onpress={() => navigation.goBack()}
            skipText={"Skip"}
            skip={() => moveNext()}
          />
          <View
            style={[
              gallery?.length > 1 &&
                {
                  // position: "relative",
                  // bottom: 50,
                  // alignSelf: "center",
                },
            ]}
          >
            <TouchableOpacity onPress={() => getPhoto()}>
              {gallery?.length == 0 || uploadprofile == false ? (
                <Animated.Image
                  source={images.uploadProfile}
                  style={[
                    style.iconStyle,
                    { height: imageHeight, marginTop: RFValue(90) },
                  ]}
                />
              ) : (
                <Animated.View style={{}}>
                  <ImageBackground
                    source={profileBorder}
                    resizeMode="contain"
                    style={[style.UploadedBorder, {}]}
                  >
                    <Animated.Image
                      source={{ uri: gallery[0]?.uri }}
                      style={[style.profileUpload, {}]}
                    />
                  </ImageBackground>
                </Animated.View>
              )}
            </TouchableOpacity>
            {gallery?.length > 1 && uploadprofile == true && (
              <View style={{ alignItems: "center" }}>
                <FlatList
                  keyboardShouldPersistTaps={"handled"}
                  horizontal
                  key={"_"}
                  keyExtractor={(item) => item?.id}
                  data={gallery}
                  renderItem={(itemData) => <ItemRender item={itemData} />}
                />
              </View>
            )}
          </View>
          {/* </View> */}
          <KeyboardAvoidingView behavior="padding">
            <View
              style={[
                GLOBAL_STYLE.CENTER,
                { marginTop: heightPixel(60), marginBottom: RFValue(10) },
              ]}
            >
              <Text style={[style.MainText]}>Profile photo and name</Text>
              <Text
                style={[
                  style.detailtext,
                  { paddingTop: RFValue(10), color: theme.color.authtextColor },
                ]}
              >
                Please enter your name and
              </Text>
              <Text
                style={[style.detailtext, { color: theme.color.authtextColor }]}
              >
                upload your profile picture.
              </Text>
            </View>
            <Textinput
              placeholder={"Name"}
              iconshow={images.user}
              value={name}
              onChange={onChange}
            />
            <Button
              text={"Continue"}
              onpress={() => {
                moveNext();
              }}
            />
          </KeyboardAvoidingView>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Pressable
              style={{ height: windowHeight }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <View style={style.centeredView}>
                <View style={style.modalView}>
                  <Text style={style.modalText}>Choose up to 5 photos</Text>
                  <FlatList
                    keyboardShouldPersistTaps={"handled"}
                    numColumns={3}
                    columnWrapperStyle={{
                      justifyContent: "flex-start",
                      alignSelf: "center",
                      width: "98%",
                      // height: 90,f
                      flex: 1,
                    }}
                    key={"_"}
                    keyExtractor={(item) => item?.id}
                    data={image}
                    renderItem={renderItem}
                  />
                  <View style={{ marginBottom: "2%" }}>
                    <Button
                      text={"Confirm"}
                      onpress={() => {
                        Done();
                      }}
                    />
                  </View>
                </View>
              </View>
            </Pressable>
          </Modal>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Profile;
