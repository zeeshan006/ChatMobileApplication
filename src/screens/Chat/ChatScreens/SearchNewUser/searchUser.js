import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  PermissionsAndroid,
  ImageBackground,
  Dimensions,
  Platform,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import Contacts from "react-native-contacts";
import { images } from "../../../../constants";
import BackNavigate from "../../../../components/BackNavigate/backNavigate";
import { heightPixel, widthPixel } from "../../../../theme/responsive";
import { THEME } from "../../../../theme/index";
import Fontfamily from "../../../../constants/fontFamily";
import GLOBAL_STYLE from "../../../../theme/global";
import Apiconstants from "../../../../constants/apiConstants";
import apiConstants from "../../../../constants/apiConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import _, { replace } from "lodash";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import NavRoutes from "../../../../routes/navRoutes";
import FastImage from "react-native-fast-image";
import { createImageProgress } from "react-native-image-progress";

const SearchUser = ({ navigation }) => {
  const windowHeight = Dimensions.get("window").height;
  const [loading, setLoading] = useState(false);
  const [getContact, setGetcontact] = useState([]);
  const [stringTosearch, setStringtosearch] = useState("");
  const [value, setValue] = useState([]);
  const [searchData, setSearchdata] = useState([]);
  const Imageprogress = createImageProgress(FastImage);

  useEffect(() => {
    getConatcts();
    // searchUser();
  }, []);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "none" },
      tabBarVisible: false,
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: "none" },
        tabBarVisible: false,
      });
  }, [navigation]);

  const renderItem = (item, index) => {
    return (
      <>
        {item?.item?.username && tempList?.includes(item?.item?.phone) && (
          <TouchableOpacity
            style={[style.flatlistMainView]}
            onPress={() => {
              navigation.navigate(NavRoutes.Chat, {
                userInfo: item?.item,
                is_group_chat: false,
              }),
                AsyncStorage.setItem("singlechat", item?.item?.user_id);
            }}
          >
            <View style={style.flatlistBorder}>
              <View
                style={[
                  GLOBAL_STYLE.CENTER,
                  {
                    width: "20%",
                  },
                ]}
              >
                {item?.item?.my_gallery_pictures?.length != 0 ? (
                  <Imageprogress
                    indicator={
                      <ActivityIndicator
                        size={"small"}
                        color="white"
                      ></ActivityIndicator>
                    }
                    source={{
                      uri: item?.item?.my_gallery_pictures[0]?.picture_url,
                      priority: FastImage.priority.high,
                    }}
                    imageStyle={{
                      borderRadius: 50,
                    }}
                    key={index}
                    style={style.flatlistImg}
                  />
                ) : (
                  <Image
                    source={images.noProfile}
                    key={index}
                    style={{
                      width: widthPixel(70),
                      height: heightPixel(70),
                    }}
                  />
                )}
              </View>
              <View
                style={[
                  {
                    width: "60%",
                    paddingLeft: "3%",
                  },
                ]}
              >
                <Text style={style.nameText}>{item?.item?.username}</Text>
                <Text style={style.lastSeenText}>
                  Last seen {moment().calendar(item?.item?.updated_at)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  };

  const renderData = (item, index) => {
    return (
      <>
        {item?.item?.username && (
          <TouchableOpacity
            style={[style.flatlistMainView]}
            onPress={() => {
              navigation.navigate(NavRoutes.Chat, {
                userInfo: item?.item,
                is_group_chat: false,
              }),
                AsyncStorage.setItem("singlechat", item?.item?.user_id);
            }}
          >
            <View style={style.flatlistBorder}>
              <View
                style={[
                  GLOBAL_STYLE.CENTER,
                  {
                    width: "20%",
                  },
                ]}
              >
                {item?.item?.my_gallery_pictures?.length != 0 ? (
                  <Imageprogress
                    indicator={
                      <ActivityIndicator
                        size={"small"}
                        color="white"
                      ></ActivityIndicator>
                    }
                    source={{
                      uri: item?.item?.my_gallery_pictures[0]?.picture_url,
                      priority: FastImage.priority.high,
                    }}
                    imageStyle={{
                      borderRadius: 50,
                    }}
                    key={index}
                    style={style.flatlistImg}
                  />
                ) : (
                  <Image
                    source={images.noProfile}
                    key={index}
                    style={{
                      width: 65,
                      height: 65,
                    }}
                  />
                )}
              </View>
              <View
                style={[
                  {
                    width: "60%",
                    paddingLeft: "3%",
                  },
                ]}
              >
                <Text style={style.nameText}>{item?.item?.username}</Text>
                <Text style={style.lastSeenText}>
                  Last seen {moment().calendar(item?.item?.updated_at)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <SafeAreaView>
      <ImageBackground source={images.Bgimage} style={{ height: windowHeight }}>
        <BackNavigate
          text={"Start new chat"}
          onpress={() => navigation.goBack()}
        />
        <View style={style.textInputView}>
          <TextInput
            placeholder="Search"
            maxLength={35}
            autoFocus
            onChangeText={onChangeSearch}
            value={stringTosearch}
            style={style.textinput}
            placeholderTextColor={THEME.COLORS.placeHolderColor}
          />
          <Image
            source={images.search}
            resizeMode="contain"
            style={style.img}
          />
        </View>
        {searchData != 0 && (
          <>
            {value?.length == 0 && stringTosearch && (
              <Text style={style.noUserfound}>No contact Found</Text>
            )}
            <></>
          </>
        )}
        <View style={{ flex: 1 }}>
          {loading ? (
            <ActivityIndicator
              size={"large"}
              color={"white"}
            ></ActivityIndicator>
          ) : stringTosearch == "" ? (
            <FlatList
              // ItemSeparatorComponent={renderSeparator}
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
              data={searchData}
              renderItem={renderItem}
            />
          ) : (
            <FlatList
              // ItemSeparatorComponent={renderSeparator}
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
              data={stringTosearch ? value : searchData}
              renderItem={renderData}
            />
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SearchUser;

const style = StyleSheet.create({
  textInputView: {
    // width: widthPixel(380),
    width: "94%",
    height: heightPixel(48),
    flexDirection: "row",
    backgroundColor: THEME.COLORS.searchinputClr,
    borderRadius: 30,
    marginHorizontal: widthPixel(14),
    justifyContent: "space-between",
    paddingHorizontal: "4%",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: heightPixel(22),
  },
  textinput: {
    fontSize: 14,
    fontFamily: Fontfamily.primaryFont,
    fontWeight: "400",
    color: THEME.COLORS.textColor,
    width: "90%",
  },
  img: {
    width: widthPixel(20),
    height: heightPixel(20),
  },
  flatlistMainView: {
    // flexDirection: "row",
    width: "100%",
    // padding: THEME.PADDING.LOW,
    alignItems: "center",
    // height: heightPixel(110),
  },
  flatlistImg: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    borderRadius: 100,
  },
  nameText: {
    fontSize: 14,
    fontWeight: "400",
    color: THEME.COLORS.textColor,
  },
  lastSeenText: {
    paddingTop: "3%",
    fontSize: 12,
    color: THEME.COLORS.placeHolderColor,
  },
  flatlistBorder: {
    width: "94%",
    borderBottomColor: "#49495366",
    borderBottomWidth: 1,
    flexDirection: "row",
    // padding: THEME.PADDING.LOW,
    alignItems: "center",
    height: heightPixel(100),
  },
  noUserfound: {
    color: THEME.COLORS.textColor,
    fontWeight: "600",
    textAlign: "center",
  },
});
