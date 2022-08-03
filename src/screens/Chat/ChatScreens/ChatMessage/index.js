import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  ActivityIndicator,
  Button,
  BackHandler,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import GLOBAL_STYLE from "../../../../theme/global";
import { Fontfamily, images } from "../../../../constants";
import { THEME } from "../../../../theme";
import {
  heightPixel,
  pixel_width,
  widthPixel,
} from "../../../../theme/responsive";
import ChatHeader from "../../../../components/Header/index";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";
import jwt_decode from "jwt-decode";
import apiConstants from "../../../../constants/apiConstants";
import {
  addNewMessage,
  clearChat,
  Messages,
  concateChatMsg,
  Media,
} from "../../../../redux/reducer/chat";
import { useDispatch, useSelector } from "react-redux";
import DocumentPicker, { types } from "react-native-document-picker";
import { getallUsers } from "./helper/getallUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackNavigate from "../../../../components/BackNavigate/backNavigate";
import FastImage from "react-native-fast-image";
import moment from "moment";
import NavRoutes from "../../../../routes/navRoutes";
import { createImageProgress } from "react-native-image-progress";
import _ from "lodash";
import ImagePicker from "react-native-image-crop-picker";
import Swipeimages from "../../../../components/ImageSwipe/imagesSwipe";

const ChatMessage = ({ navigation, route }) => {
  const userInfo = route?.params?.userInfo;
  const dispatch = useDispatch();
  const [swipesImage, setSwipesImages] = useState(false);
  const [indexed, setIndexed] = useState("");
  const [openMedia, setMedia] = useState(false);
  const [message, setmessage] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tokenUser, setUserToken] = useState();
  const messageArray = useSelector((state) => state?.chat?.chat);
  const uniqueArr = _.uniq(messageArray, "id");
  const dimensions = Dimensions.get("window");
  const Imageprogress = createImageProgress(FastImage);
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => {
      backHandler.remove();
      dispatch(clearChat());
      AsyncStorage.removeItem("chatPartner");
      AsyncStorage.removeItem("singlechat");
    };
  }, []);
  useEffect(() => {
    fetch_messages(Messages);
    return () => {
      getallUsers(dispatch);
    };
  }, []);
  const sendMessage = async () => {
    const token = await AsyncStorage.getItem("token");
    setUserToken(jwt_decode(token));
    setmessage("");
    if (message == "" || !message.trim()) {
      return true;
    } else {
      axios
        .post(
          apiConstants.base_url + apiConstants.sendMessages,
          {
            reciever_id: userInfo?.user_id,
            message_body: message,
            message_type: "TEXT",
            is_group_chat: false,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        )
        .then((response) => {
          // console.log("response", response?.data?.data);
          dispatch(addNewMessage(response?.data?.data));
          // getallUsers(dispatch);
        })
        .catch((error) => {
          console.log("Error", error?.response?.data?.error);
        });
    }
  };
  const seen_messages = async () => {
    const token = await AsyncStorage.getItem("token");
    axios
      .post(
        apiConstants.base_url + apiConstants.seen_messages,
        {
          sender_id: userInfo?.user_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then((response) => {
        // console.log('seen msg api', response?.data);
      })
      .catch(function (error) {
        // console.log('error', error?.response?.data);
      });
  };

  const fetch_messages = async (howToSet) => {
    const token = await AsyncStorage.getItem("token");
    setUserToken(jwt_decode(token));
    setLoading(true);
    setPage(page + 1);
    axios
      .post(
        apiConstants.base_url + apiConstants.fetchMyMessages,
        {
          reciever_id: userInfo?.user_id,
          is_group_chat: false,
          page: page,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then((response) => {
        // seen_messages();
        setLoading(false);
        dispatch(howToSet(response?.data?.data));
        // dispatch(Messages(response?.data?.data));
        // console.log("fetch", response?.data?.data);
        // dispatch(howToSet(response?.data?.data));
      })
      .catch((error) => {
        // setGetmessagesloader(false);
        setLoading(false);
        console.log("error fetch messages", error?.response?.data?.error);
      });
  };

  const SendImage = async () => {
    const token = await AsyncStorage.getItem("token");
    setUserToken(jwt_decode(token));
    ImagePicker.openPicker({
      isCamera: true,
      mediaType: "photo",
      openCameraOnStart: true,
      maxSize: 5,
      maxFiles: 5,
      multiple: true,
      showsSelectedCount: true,
      compressQuality: 100,
      returnAfterShot: true,
    })
      .then(async (response) => {
        setMedia(false);
        const currTimeNum = new Date().getTime();
        response?.forEach((element) => {
          const image = element?.path;
          if (element?.size < 15000000) {
            const mediaData = {
              attatchment: image,
              group_id: userInfo?.group_id,
              media_caption: null,
              media_type: "PICTURE",
              message_time: currTimeNum,
              message_type: "MEDIA",
              reciever_id:
                userInfo?.is_group_chat == true ? null : userInfo?.user_id,
              sender_id: tokenUser?._id,
              created_at: currTimeNum,
              updated_at: currTimeNum,
              seen: false,
              user_sender: {
                user_id: tokenUser?._id,
                profile_img: tokenUser?.profile_img,
                oneline_status: true,
                oneline_status_time: currTimeNum,
              },
            };
            dispatch(Media(mediaData));
          } else {
            alert("image less than 15MB");
          }
        });
        const dataaa = new FormData();
        response?.forEach((element) => {
          dataaa.append("media", {
            uri: element?.path,
            type: element?.mime,
            name: element?.path,
          });
        });
        if (userInfo?.is_group_chat == false) {
          console.log("this is one to one");
          dataaa.append("is_group_chat", false);
          dataaa.append("reciever_id", userInfo?.user_id);
        } else {
          dataaa.append("is_group_chat", true);
          console.log("this is group");
          dataaa.append("group_id", userInfo?.group_id);
        }
        dataaa.append("message_type", "MEDIA");
        if (message != "") {
          dataaa.append("message_body", message);
        }
        dataaa.append("media_type", "PICTURE");
        axios
          .post(apiConstants.base_url + apiConstants.sendMessages, dataaa, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          })
          .then(async (response) => {
            console.log("response img", response?.data?.data);
            // dispatch(groupNewmessage(response?.data?.data));
            // dispatch(addNewMessage(response?.data?.data));
            // fetch_messages();
          })
          .catch(async (error) => {
            console.log("error", error?.response?.data);
          });
      })
      .catch(async (error) => {
        setMedia(false);
        console.log("error", error?.response);
      });
  };
  const onRequestClose = (val) => {
    setSwipesImages(val);
  };

  return (
    <>
      <View style={{ backgroundColor: "#1A2434" }}>
        <View style={styles.headerMainView}>
          <TouchableOpacity
            style={styles.headerLeft}
            onPress={() => {
              dispatch(clearChat());
              seen_messages();
              AsyncStorage.removeItem("singlechat");
              navigation.navigate("ChatNavigators");
            }}
          >
            <Image style={styles.LeftIcon} source={images.backNavigate} />
            {/* {/ <Text style={styles.Noyify}>4</Text> /} */}
          </TouchableOpacity>
          <View
            style={{
              alignItems: "center",
              width: "15%",
              marginRight: "2%",
            }}
          >
            {userInfo?.my_gallery_pictures?.length != 0 ? (
              <Imageprogress
                indicator={
                  <ActivityIndicator
                    size={"small"}
                    color="white"
                  ></ActivityIndicator>
                }
                source={{
                  uri: userInfo?.my_gallery_pictures[0]?.picture_url,
                  priority: FastImage.priority.high,
                }}
                imageStyle={{
                  borderRadius: 50,
                }}
                style={styles.profile}
              />
            ) : (
              <View
                style={{
                  borderColor: "#49495366",
                  borderWidth: 1,
                  padding: 2,
                  borderRadius: 50,
                }}
              >
                <Image
                  source={images.noProfile}
                  resizeMode="contain"
                  style={styles.profile}
                />
              </View>
            )}
          </View>

          <View style={{ width: "30%" }}>
            {userInfo?.username ? (
              <Text numberOfLines={1} style={styles.headerTextTittle}>
                {userInfo?.username?.length > 20
                  ? `${userInfo?.username.substr(0, 20)}...`
                  : userInfo?.username}
              </Text>
            ) : (
              <Text numberOfLines={1} style={styles.headerTextTittle}>
                {userInfo?.group_name?.length > 20
                  ? `${userInfo?.group_name.substr(0, 20)}...`
                  : userInfo?.group_name}
              </Text>
            )}
            <Text style={styles.statusText}>Active Now</Text>
          </View>

          <View style={styles.headerIconView}>
            <Image
              source={images.user}
              style={styles.headingIcon}
              resizeMode="contain"
            />
            <Image
              source={images.Calling}
              style={styles.headingIcon}
              resizeMode="contain"
            />
            <Image
              source={images.search}
              style={styles.headingIcon}
              resizeMode="contain"
            />
            <Image
              source={images.userDetail}
              style={styles.headingIcon}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      <View style={styles.container}>
        {loading && (
          <ActivityIndicator size={"large"} color="white"></ActivityIndicator>
        )}
        <FlatList
          data={uniqueArr}
          keyboardShouldPersistTaps={"handled"}
          showsVerticalScrollIndicator={false}
          disableVirtualization={true}
          onEndReachedThreshold={1}
          onEndReached={() => {
            fetch_messages(concateChatMsg);
          }}
          keyExtractor={(item) => item?.id}
          inverted={true}
          renderItem={({ item, index }) => (
            <>
              {item?.sender_id != tokenUser?._id ? (
                <View style={[styles.item, styles.receriverParentView]}>
                  {userInfo?.profile_img ? (
                    <Image
                      style={[styles.image, { borderRadius: 100 }]}
                      source={userInfo?.profile_img}
                      key={index}
                    />
                  ) : (
                    <Image
                      style={styles.image}
                      source={images.noProfile}
                      key={index}
                    />
                  )}
                  <View style={[styles.receriverMsgView]}>
                    <View style={[styles.receriverView, { padding: "1%" }]}>
                      {item?.message_type == "MEDIA" ? (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate(NavRoutes.swipeImage, {
                              uniqueArr,
                              index,
                            })
                          }
                        >
                          <Imageprogress
                            indicator={<ActivityIndicator></ActivityIndicator>}
                            imageStyle={styles.receriverView}
                            source={{
                              uri: item?.attatchment,
                              priority: FastImage.priority.high,
                            }}
                            resizeMode="cover"
                            style={{
                              height: 180,
                              width: 180,
                            }}
                          />
                        </TouchableOpacity>
                      ) : (
                        <Text
                          style={[
                            styles.description,
                            {
                              paddingHorizontal:
                                item?.message_body?.length < 4
                                  ? RFValue(25)
                                  : RFValue(15),
                            },
                          ]}
                        >
                          {item.message_body}
                        </Text>
                      )}
                    </View>
                  </View>

                  <View
                    style={{
                      alignSelf: "center",
                      // width: "20%",
                    }}
                  >
                    <Text style={styles.time}>
                      {moment(item.created_at).format("LT")}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={[styles.item, styles.receiverMainView]}>
                  <View
                    style={{
                      alignSelf: "center",
                      width: "20%",
                    }}
                  >
                    <Text style={styles.time}>
                      {moment(item.created_at).format("LT")}
                    </Text>
                  </View>

                  <LinearGradient
                    colors={["#36C5FA", "#A96CFF"]}
                    start={{ y: 0.0, x: 0.0 }}
                    end={{ y: 0.0, x: 0.8 }}
                    style={[
                      styles.linearGradient,
                      {
                        maxWidth: Math.round((dimensions.width * 12) / 16),
                      },
                    ]}
                  >
                    {item?.message_type == "MEDIA" ? (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate(NavRoutes.swipeImage, {
                            uniqueArr,
                            index,
                          })
                        }
                      >
                        <Imageprogress
                          indicator={<ActivityIndicator></ActivityIndicator>}
                          imageStyle={styles.receiverSideImageprogress}
                          source={{
                            uri: item?.attatchment,
                            priority: FastImage.priority.high,
                          }}
                          resizeMode="cover"
                          style={{
                            height: 200,
                            width: 200,
                          }}
                        />
                      </TouchableOpacity>
                    ) : (
                      <Text
                        style={[
                          styles.description,
                          {
                            paddingHorizontal:
                              item?.message_body?.length < 4
                                ? RFValue(25)
                                : RFValue(15),
                          },
                        ]}
                      >
                        {item.message_body}
                      </Text>
                    )}
                  </LinearGradient>
                </View>
              )}
            </>
          )}
        />

        <View style={styles.bottomView}>
          <View style={styles.bottom}>
            <TouchableOpacity onPress={() => setMedia(!openMedia)}>
              <Image
                style={{ width: 20, height: 20, resizeMode: "contain" }}
                source={openMedia ? images.cancel : images.select}
              />
            </TouchableOpacity>
            <TextInput
              value={message}
              onChangeText={(text) => {
                setmessage(text);
              }}
              multiline
              style={styles.input}
              placeholder="Type your message"
              placeholderTextColor="#BBBCBD"
            />

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: "contain",
                }}
                source={images.recording}
              />
              <TouchableOpacity onPress={() => sendMessage()}>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: "contain",
                    marginLeft: RFValue(15),
                  }}
                  source={images.arrow}
                />
              </TouchableOpacity>
            </View>
          </View>
          {openMedia && (
            <View style={styles.mediaView}>
              <TouchableOpacity onPress={() => SendImage()}>
                <Image
                  source={images.img}
                  style={styles.mediaImg}
                  resizeMode="contain"
                />
                <Text style={styles.mediaText}>Image</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ alignItems: "center" }}>
                <Image
                  source={images.file}
                  style={styles.mediaImg}
                  resizeMode="contain"
                />
                <Text style={styles.mediaText}>File</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <Image
                  source={images.contact}
                  style={styles.mediaImg}
                  resizeMode="contain"
                />
                <Text style={styles.mediaText}>Contact</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <Image
                  source={images.location}
                  style={styles.mediaImg}
                  resizeMode="contain"
                />
                <Text style={styles.mediaText}>Location</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <Image
                  source={images.music}
                  style={styles.mediaImg}
                  resizeMode="contain"
                />
                <Text style={styles.mediaText}>Music</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#01182A",
  },
  item: {
    marginHorizontal: RFValue(5),
    marginVertical: RFValue(8),
    flexDirection: "row",
  },
  receiverMainView: {
    width: "92%",
    justifyContent: "space-between",
    marginLeft: "4%",
  },

  image: {
    height: 30,
    width: 30,
    marginTop: RFValue(4),
    marginRight: 5,
  },
  receriverParentView: {
    width: "94%",
    marginLeft: "3%",
  },
  receriverMsgView: {
    flexDirection: "row",
    width: "74%",
    marginRight: "3%",
  },
  name: {
    fontSize: RFValue(15),
    color: "white",
  },
  description: {
    color: "white",
    padding: "4%",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: Fontfamily.primaryFont,
  },
  linearGradient: {
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: "0.5%",
  },
  bottom: {
    paddingHorizontal: RFValue(20),
    backgroundColor: "#1A2434",
    borderRadius: 24,
    width: "94%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: RFValue(15),
  },
  input: {
    maxHeight: 100,
    marginLeft: RFValue(18),
    color: THEME.COLORS.textColor,
    width: "70%",
  },
  headerTextTittle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: Fontfamily.primaryFont,
  },
  LeftIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  headerLeft: {
    width: "6%",
    justifyContent: "center",
  },
  statusText: {
    color: "#BBBCBD",
    fontSize: 12,
    fontFamily: Fontfamily.primaryFont,
    fontWeight: "400",
  },
  headerMainView: {
    width: "96%",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: "4%",
    flexDirection: "row",
  },
  profile: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  headerIconView: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-evenly",
  },
  headingIcon: {
    height: 20,
    width: 20,
  },
  time: {
    color: "#BBBCBD",
    fontSize: 9,
    fontWeight: "400",
    fontFamily: Fontfamily.primaryFont,
  },
  receriverView: {
    backgroundColor: "#1A2434",
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  bottomView: {
    backgroundColor: "#01182A",
    shadowColor: "#0000004D",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 25,
    shadowRadius: 25,
    elevation: 5,
  },
  mediaView: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: "5%",
  },
  mediaImg: {
    height: 30,
    width: 30,
  },
  mediaText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#54585E",
  },
  receiverSideImageprogress: {
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default ChatMessage;
