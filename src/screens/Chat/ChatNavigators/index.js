import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Header from "../../../components/Header";
import { heightPixel, widthPixel } from "../../../theme/responsive";
import TopTabViews from "./TabTopViews";
import ChatFlatItems from "../../../components/ChatFlatItems/index";
import { images } from "../../../constants";
import { useNavigation } from "@react-navigation/native";
import NavRoutes from "../../../routes/navRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearChat } from "../../../redux/reducer/chat";
import apiConstants from "../../../constants/apiConstants";
import GLOBAL_STYLE from "../../../theme/global";
import { THEME } from "../../../theme";
import ChatFlatHorizontalStory from "../../../components/ChatFlatHorizontalStory";
import moment from "moment";
import { alluserdata } from "../../../redux/reducer/allUsers";
const ChatNavigators = () => {
  const navigation = useNavigation();
  // const [usersData, setUserData] = useState([]);
  const usersData = useSelector((state) => state?.allUsers?.allUsersdata);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [image, setimages] = useState([
    require("../../../assets/images/uploadProfile.png"),
  ]);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      chatListApi();
      dispatch(clearChat());
      AsyncStorage.removeItem("chatPartner");
      AsyncStorage.removeItem("singlechat");
    });
    return unsubscribe;
  }, [navigation]);

  const chatListApi = async () => {
    const token = await AsyncStorage.getItem("token");
    setLoading(true);
    axios
      .get(apiConstants.base_url + apiConstants.get_message_contacts, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((response) => {
        // console.log("Response", response?.data?.data);
        dispatch(alluserdata(response?.data?.data));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error chatlist", error?.response?.data?.error);
      });
  };

  return (
    <>
      <Header />
      <View style={{ backgroundColor: THEME.COLORS.primaryColor, flex: 1 }}>
        <TopTabViews />
        <TouchableOpacity
          onPress={() => navigation.navigate(NavRoutes.newChat)}
          style={{
            position: "absolute",
            right: 20,
            bottom: 80,
          }}
        >
          <Image
            source={images.edit}
            style={{
              height: heightPixel(80),
              width: widthPixel(80),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
export default ChatNavigators;
const style = StyleSheet.create({
  profileimg: {
    width: widthPixel(65),
    height: heightPixel(65),
    resizeMode: "contain",
  },
  userNameView: {
    paddingTop: "3%",
    width: "60%",
    paddingLeft: "3%",
  },
  nameText: {
    fontSize: 14,
    lineHeight: 16.94,
    fontWeight: "400",
    color: THEME.COLORS.textColor,
  },
  lastMessageText: {
    paddingTop: "3%",
    color: THEME.COLORS.placeHolderColor,
  },
  unseenView: {
    width: widthPixel(25),
    height: heightPixel(25),
    borderRadius: 20,
    backgroundColor: THEME.COLORS.selectCircle,
  },
  updatedTime: {
    fontSize: 12,
    textAlign: "right",
    color: THEME.COLORS.placeHolderColor,
    // paddingLeft: "10%",
  },
  ParentView: {
    width: "100%",
  },
  borderStyle: {
    width: "94%",
    borderBottomColor: "#49495366",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    height: heightPixel(110),
  },
});
