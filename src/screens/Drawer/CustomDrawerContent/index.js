import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  ImageBackground,
} from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { images } from "../../../constants";
import { heightPixel, widthPixel } from "../../../theme/responsive";
import Fontfamily from "../../../constants/fontFamily";

const CustomSidebarMenu = (props) => {
  const BASE_PATH =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/";
  const proileImage = "react_logo.png";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#01182A" }}>
      <DrawerContentScrollView {...props}>
        <View style={{ marginTop: 40, flexDirection: "row" }}>
          <View style={{ flexDirection: "row" }}>
            <ImageBackground
              source={images.galleryBorder}
              resizeMode="contain"
              style={style.bgImg}
            >
              <Image source={images.story1} style={style.userimg} />
            </ImageBackground>
            <View style={{ paddingHorizontal: 15, paddingTop: 5 }}>
              <Text style={style.text}>Kugisaki Nobara</Text>
              <Text style={style.text2}>@kuginobara</Text>
            </View>
            <View style={{ paddingTop: 5 }}>
              <Image source={images.goodSign} style={[style.goodSign, {}]} />
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  bgImg: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: widthPixel(5),
    marginBottom: heightPixel(3),
  },
  userimg: {
    width: 55,
    height: 55,
    borderWidth: 2,
    resizeMode: "contain",
    zIndex: -1,
  },
  goodSign: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    // marginTop: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",

    fontFamily: Fontfamily.primaryFont,
    lineHeight: 17,
    // marginLeft: 5,
  },
  text2: {
    fontSize: 12,
    fontWeight: "500",
    color: "white",

    fontFamily: Fontfamily.primaryFont,
    lineHeight: 24,
    // marginLeft: 5,
  },
});

export default CustomSidebarMenu;
