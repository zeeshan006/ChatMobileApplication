import React, { useState } from "react";
import {
   View,
   Text,
   FlatList,
   Image,
   TouchableOpacity,
   StyleSheet,
   ActivityIndicator,
} from "react-native";
import GLOBAL_STYLE from "../../../../../theme/global";
import { heightPixel, widthPixel } from "../../../../../theme/responsive";
import { THEME } from "../../../../../theme/index";
import ChatFlatItems from "../../../../../components/ChatFlatItems/index";
import ChatFlatHorizontalStory from "../../../../../components/ChatFlatHorizontalStory";
import { Fontfamily, images } from "../../../../../constants";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { clearChat } from "../../../../../redux/reducer/chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavRoutes from "../../../../../routes/navRoutes";
import axios from "axios";
import apiConstants from "../../../../../constants/apiConstants";
import { alluserdata } from "../../../../../redux/reducer/allUsers";
import { createImageProgress } from "react-native-image-progress";
import FastImage from "react-native-fast-image";
import Header from "../../../../../components/Header";

const All = () => {
   const navigation = useNavigation();
   // const [usersData, setUserData] = useState([]);
   const usersData = useSelector((state) => state?.allUsers?.allUsersdata);
   const [loading, setLoading] = useState(false);

   const dispatch = useDispatch();
   const Imageprogress = createImageProgress(FastImage);
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
            // console.log(
            //    "Response",
            //    response?.data?.data[1]?.my_gallery_pictures[0]?.picture_url
            // );
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
         <View style={{ flex: 1, backgroundColor: THEME.COLORS.primaryColor }}>
            <ChatFlatHorizontalStory />
            <View style={style.bottomParentView}>
               <View style={style.bottomMainView}>
                  <Image
                     style={{
                        width: 30,
                        height: 30,
                        resizeMode: "contain",
                     }}
                     source={require("../../../../../assets/icons/home.png")}
                  />
                  <Image
                     style={{
                        width: 30,
                        height: 30,
                        resizeMode: "contain",
                     }}
                     source={require("../../../../../assets/icons/wallet.png")}
                  />
                  <Image
                     style={{
                        width: 30,
                        height: 30,
                        resizeMode: "contain",
                     }}
                     source={require("../../../../../assets/icons/chat.png")}
                  />
                  <Image
                     style={{
                        width: 30,
                        height: 30,
                        resizeMode: "contain",
                     }}
                     source={require("../../../../../assets/icons/nft.png")}
                  />
                  <Image
                     style={{
                        width: 30,
                        height: 30,
                        resizeMode: "contain",
                     }}
                     source={require("../../../../../assets/icons/exchange.png")}
                  />
               </View>
            </View>

            {usersData?.length == 0 && !loading && (
               <View
                  style={{
                     paddingTop: "500%",
                     justifyContent: "flex-end",
                     alignItems: "center",
                  }}
               >
                  <Text style={style.emptyChat}>Empty chat</Text>
               </View>
            )}

            <View style={{ height: "100%", zIndex: -1 }}>
               {loading ? (
                  <ActivityIndicator size={"large"} color={"white"} />
               ) : (
                  <FlatList
                     // contentContainerStyle={{ flexGrow: 1 }}
                     showsVerticalScrollIndicator={false}
                     data={usersData}
                     renderItem={({ item, index }) => (
                        <>
                           {!item?.group_name && (
                              <TouchableOpacity
                                 onPress={() => {
                                    AsyncStorage.setItem(
                                       "chatPartner",
                                       item?.group_id
                                    );
                                    navigation.navigate(NavRoutes.Chat, {
                                       userInfo: item,
                                    });
                                 }}
                                 style={[GLOBAL_STYLE.CENTER, style.ParentView]}
                              >
                                 <View style={style.borderStyle}>
                                    <View
                                       style={[
                                          GLOBAL_STYLE.CENTER,
                                          {
                                             width: "20%",
                                          },
                                       ]}
                                    >
                                       <Image
                                          source={images?.noProfile}
                                          key={index}
                                          style={style.profileimg}
                                       />
                                       {/* )} */}
                                    </View>
                                    <View style={[style.userNameView]}>
                                       {item?.username && (
                                          <Text style={style.nameText}>
                                             {item?.username}
                                          </Text>
                                       )}
                                       {item?.last_message?.includes(
                                          "https://"
                                       ) ? (
                                          <Text style={style.lastMessageText}>
                                             attatchment
                                          </Text>
                                       ) : (
                                          <Text
                                             numberOfLines={2}
                                             style={style.lastMessageText}
                                          >
                                             {item?.last_message}
                                          </Text>
                                       )}
                                    </View>
                                    <View
                                       style={{
                                          width: "20%",
                                          alignItems: "center",
                                          justifyContent: "center",
                                       }}
                                    >
                                       <View>
                                          <Text style={style.updatedTime}>
                                             {moment(item.created_at).format(
                                                "LT"
                                             )}
                                          </Text>
                                       </View>

                                       {item?.un_seen_counter != 0 && (
                                          <View
                                             style={{
                                                paddingTop: "20%",
                                             }}
                                          >
                                             <View
                                                style={[
                                                   GLOBAL_STYLE.CENTER,
                                                   style.unseenView,
                                                   {
                                                      width:
                                                         item?.un_seen_counter
                                                            ?.length < 99
                                                            ? widthPixel(25)
                                                            : widthPixel(30),
                                                      height:
                                                         item?.un_seen_counter
                                                            ?.length < 99
                                                            ? heightPixel(25)
                                                            : heightPixel(30),
                                                   },
                                                ]}
                                             >
                                                <Text
                                                   style={{
                                                      color: THEME.COLORS
                                                         .primaryColor,
                                                   }}
                                                >
                                                   {item?.un_seen_counter}
                                                </Text>
                                             </View>
                                          </View>
                                       )}
                                    </View>
                                 </View>
                              </TouchableOpacity>
                           )}
                        </>
                     )}
                  />
               )}
            </View>
         </View>
      </>
   );
};

export default All;
const style = StyleSheet.create({
   profileimg: {
      width: widthPixel(75),
      height: heightPixel(75),
      resizeMode: "contain",
   },
   userNameView: {
      // paddingTop: "3%",
      width: "60%",
      paddingLeft: "3%",
   },
   nameText: {
      fontSize: 14,
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
      height: heightPixel(90),
   },
   emptyChat: {
      fontSize: 14,
      fontWeight: "400",
      textAlign: "center",
      color: THEME.COLORS.placeHolderColor,
      fontFamily: Fontfamily.primaryFont,
   },
   bottomParentView: {
      backgroundColor: "#01182A",
      position: "absolute",
      bottom: 0,
      padding: "3%",
   },
   bottomMainView: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      backgroundColor: "#1A2434",
      padding: "3%",
      width: "94%",
      marginLeft: "3%",
      borderRadius: 40,
   },
});
