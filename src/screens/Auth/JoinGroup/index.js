import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import style from "./style";
import Textinput from "../../../components/Textinput/textInput";
import Button from "../../../components/Buttons/Button";
import { images } from "../../../constants";
import GLOBAL_STYLE from "../../../theme/global";
import BackNavigate from "../../../components/BackNavigate/backNavigate";
import NavRoutes from "../../../routes/navRoutes";
import _, { round } from "lodash";
import { THEME } from "../../../theme/index";
import { Color_theme } from "../../../redux/reducer/Color_theme";
import { ColorTheme } from "../../../theme/change_theme";
import { useSelector, useDispatch } from "react-redux";
import apiConstants from "../../../constants/apiConstants";
import axios from "axios";
import Toast from "react-native-simple-toast";
import { createImageProgress } from "react-native-image-progress";
import FastImage from "react-native-fast-image";
import ErrorModal from "../../../components/ErrorModal/modal";
import qs from "qs";

const JoinGroup = ({ navigation, route }) => {
  const windowHeight = Dimensions.get("window").height;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState();
  const [errorModal, setErrormodal] = useState(false);
  const [groupsdata, setGroups] = useState([]);
  const [groupUsers, setGroupusers] = useState([]);
  const Colors = useSelector((state) => state?.ColorTheme?.Color_theme);
  const image = Colors ? images.Bgimage : images.bgWhite;
  const theme = ColorTheme(Colors);
  const routeData = route?.params;
  const gallery = routeData?.routeData?.gallery;
  const password = routeData?.routeData?.password;
  const bio = routeData?.bio ? routeData?.bio : null;
  const name = routeData?.routeData?.name;
  const phone = routeData?.routeData?.mobileNumber;
  const Imageprogress = createImageProgress(FastImage);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      Groups();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ImageBackground source={images.Bgimage} style={{ height: windowHeight }}>
      <ErrorModal
        visible={errorModal}
        errorMesssage={error}
        close={modalClose}
      />
      <BackNavigate
        text={"Profile setup"}
        onpress={() => navigation.goBack()}
        skipText={"Skip"}
        skip={() => SignUp()}
      />
      <ScrollView sty>
        <View style={[GLOBAL_STYLE.CENTER, style.textView]}>
          <Text style={[style.MainText, { color: theme?.color?.textColor }]}>
            We are almost finished!
          </Text>
          <Text
            style={[
              style.detailtext,
              { paddingTop: 10, color: theme.color.authtextColor },
            ]}
          >
            Almost there, David! We found some
          </Text>
          <Text
            style={[style.detailtext, { color: theme.color.authtextColor }]}
          >
            suggestions for you. You can select
          </Text>
          <Text
            style={[style.detailtext, { color: theme.color.authtextColor }]}
          >
            up to 5 groups or skip this step.
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          {loadingData ? (
            <View style={{ flex: 1 }}>
              <ActivityIndicator size={"large"}></ActivityIndicator>
            </View>
          ) : groupsdata.length == 0 ? (
            <View style={{ flex: 1 }}>
              <Text style={style.noUserfound}>No group found</Text>
            </View>
          ) : (
            <FlatList
              keyboardShouldPersistTaps={"handled"}
              showsVerticalScrollIndicator={false}
              key={"_"}
              keyExtractor={(item) => item?.id}
              data={groupsdata}
              renderItem={({ item, index }) => {
                return (
                  <View style={[style.selectBtn]}>
                    <TouchableOpacity
                      style={[style.flatListbtn]}
                      onPress={() => addusers(item?.allGroupData?.group_id)}
                    >
                      <View style={{ width: "13%" }}>
                        <Image
                          source={{
                            uri: item?.allGroupData?.group_image,
                          }}
                          style={[
                            style.ProfileImage,
                            {
                              opacity: _.includes(
                                groupUsers,
                                item?.allGroupData?.group_id
                              )
                                ? 1
                                : 0.6,
                            },
                          ]}
                          resizeMode="contain"
                        />
                      </View>
                      <View
                        style={{
                          width: "75%",
                          alignSelf: "center",
                        }}
                      >
                        <Text
                          style={[
                            style.flatListUsername,
                            {
                              opacity: _.includes(
                                groupUsers,
                                item?.allGroupData?.group_id
                              )
                                ? 1
                                : 0.6,
                            },
                          ]}
                        >
                          {item?.allGroupData?.group_name}
                        </Text>
                        <Text
                          style={[
                            style.member,
                            {
                              opacity: _.includes(
                                groupUsers,
                                item?.allGroupData?.group_id
                              )
                                ? 1
                                : 0.6,
                            },
                          ]}
                        >
                          {item?.allGroupData?.group_members?.length +
                            "  " +
                            "Members"}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          width: "10%",
                          justifyContent: "center",
                        }}
                      >
                        {_.includes(
                          groupUsers,
                          item?.allGroupData?.group_id
                        ) ? (
                          <Image
                            source={images?.check}
                            style={{
                              height: 30,
                              width: 30,
                              resizeMode: "contain",
                            }}
                          />
                        ) : (
                          <Image
                            source={images?.add}
                            style={{
                              height: 30,
                              width: 30,
                              resizeMode: "contain",
                            }}
                          />
                        )}
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          )}
        </View>
      </ScrollView>
      <View
        style={{
          marginBottom: "5%",
          position: "absolute",
          bottom: 10,
          right: 0,
          left: 0,
        }}
      >
        <Button
          disable={disable}
          loading={loading}
          text={"Complete"}
          onpress={() => SignUp()}
        />
      </View>
    </ImageBackground>
  );
};

export default JoinGroup;
