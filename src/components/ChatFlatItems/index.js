import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GLOBAL_STYLE from "../../theme/global";
import { widthPixel, heightPixel } from "../../theme/responsive";
import { THEME } from "../../theme/index";
import { images } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiConstants from "../../constants/apiConstants";
import axios from "axios";
import NavRoutes from "../../routes/navRoutes";

const ChatFlatItems = ({ navigation }) => {
  // debugger;
  // console.log("--route----", route?.params);
  const [stringTosearch, setStringtosearch] = useState("");
  const [value, setValue] = useState([]);
  const [searchData, setSearchdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setimages] = useState([
    require("../../assets/images/uploadProfile.png"),
    require("../../assets/images/uploadProfile.png"),
    require("../../assets/images/uploadProfile.png"),
    require("../../assets/images/uploadProfile.png"),
    require("../../assets/images/uploadProfile.png"),
    require("../../assets/images/uploadProfile.png"),
    require("../../assets/images/uploadProfile.png"),
    require("../../assets/images/uploadProfile.png"),
    require("../../assets/images/uploadProfile.png"),
  ]);

  // React.useEffect(() => {
  //    const unsubscribe = navigation.addListener("focus", () => {
  //       chatListApi();
  //    });
  //    return unsubscribe;
  // }, [navigation]);
  // useEffect(() => {
  //    chatListApi();
  //    searchUser();
  // }, []);

  // const searchFilterFunction = (text) => {
  //    const formattedQuery = text.toLowerCase();
  //    const data = searchData?.filter((user) => {
  //       if (
  //          user?.chatMates?.username
  //             ?.toLowerCase()
  //             ?.includes(formattedQuery) ||
  //          user?.groups?.group_name?.toLowerCase()?.includes(formattedQuery) ||
  //          user?.groups?.group
  //             ?.toLowerCase()
  //             ?.group_name?.includes(formattedQuery) ||
  //          user?.username?.toLowerCase()?.includes(formattedQuery)
  //       ) {
  //          return true;
  //       }
  //    });
  //    setValue(data);
  // };
  // useEffect(() => {
  //    searchFilterFunction(stringTosearch);
  // }, [stringTosearch]);

  // const onChangeSearch = (query) => setStringtosearch(query);

  // const searchUser = async () => {
  //    const token = await AsyncStorage.getItem("token");
  //    axios
  //       .get(apiConstants.base_url + apiConstants.getMyAllData, {
  //          headers: {
  //             "Content-Type": "application/json",
  //             Authorization: token,
  //          },
  //       })
  //       .then((response) => {
  //          console.log("response search", response?.data?.data);
  //          setSearchdata(response?.data?.data);
  //       })
  //       .catch((error) => {
  //          console.log("Error", error?.response?.data);
  //       });
  // };

  // const chatListApi = async () => {
  //    const token = await AsyncStorage.getItem("token");
  //    setLoading(true);
  //    axios
  //       .get(apiConstants.base_url + apiConstants.get_message_contacts, {
  //          headers: {
  //             "Content-Type": "application/json",
  //             Authorization: token,
  //          },
  //       })
  //       .then((response) => {
  //          console.log("Response", response?.data?.data);
  //          setLoading(false);
  //       })
  //       .catch((error) => {
  //          setLoading(false);
  //          // console.log('error chatlist', error?.response?.data?.error);
  //       });
  // };
  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "90%",
          backgroundColor: "gray",
          marginHorizontal: "5%",
        }}
      />
    );
  };
  return (
    <>
      <View style={{ height: "100%" }}>
        {loading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <FlatList
            ItemSeparatorComponent={renderSeparator}
            // contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            data={image}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  GLOBAL_STYLE.CENTER,
                  {
                    flexDirection: "row",
                    width: "100%",
                    padding: THEME.PADDING.LOW,
                    height: 100,
                  },
                ]}
                onPress={() => navigation.navigate(NavRoutes.CHAT_USER)}
              >
                <View
                  style={[
                    GLOBAL_STYLE.CENTER,
                    {
                      width: "20%",
                    },
                  ]}
                >
                  <Image
                    source={item}
                    key={index}
                    style={{
                      width: widthPixel(65),
                      height: heightPixel(65),
                      // borderWidth: 2,
                      resizeMode: "contain",
                      // marginTop: heightPixel(21),
                      // marginBottom:'3%'
                    }}
                  />
                </View>
                <View
                  style={[
                    // GLOBAL_STYLE.CENTER,
                    {
                      paddingTop: "3%",
                      // width: widthPixel(220),
                      width: "60%",
                      // backgroundColor: "red",
                      paddingLeft: "3%",
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      lineHeight: 16.94,
                      fontWeight: "400",
                      color: THEME.COLORS.textColor,
                    }}
                  >
                    chatApp.io News Channel
                  </Text>
                  <Text
                    style={{
                      paddingTop: "3%",
                      color: THEME.COLORS.placeHolderColor,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetuer adipiscing…
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        textAlign: "right",
                        color: THEME.COLORS.placeHolderColor,
                        // paddingLeft: "10%",
                      }}
                    >
                      15 mint
                    </Text>
                  </View>

                  <View
                    style={{
                      paddingTop: "20%",
                    }}
                  >
                    <View
                      style={[
                        GLOBAL_STYLE.CENTER,
                        {
                          width: widthPixel(25),
                          height: heightPixel(25),
                          borderRadius: 20,
                          backgroundColor: THEME.COLORS.selectCircle,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color: THEME.COLORS.primaryColor,
                        }}
                      >
                        1
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </>
  );
};

export default ChatFlatItems;
