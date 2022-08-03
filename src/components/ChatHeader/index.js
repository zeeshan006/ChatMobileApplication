import React, { useState } from "react";
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
} from "react-native";

import GLOBAL_STYLE from "../../theme/global";
import { THEME } from "../../theme";
import { heightPixel, widthPixel } from "../../theme/responsive";
import Fontfamily from "../../constants/fontFamily";
import { images } from "../../constants";

const ChatHeader = ({ navigation }) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          backgroundColor: THEME.COLORS.primaryColor,
          height: heightPixel(87),
          // justifyContent: "space-evenly",
          alignItems: "center",
          paddingHorizontal: widthPixel(14),
        },
      ]}
    >
      <Image
        source={images.back}
        style={{
          height: heightPixel(18),
          width: widthPixel(12),
          resizeMode: "contain",
        }}
      />
      <View style={{ paddingLeft: widthPixel(21) }}>
        <Image
          source={images.story2}
          style={{
            height: heightPixel(50),
            width: widthPixel(50),
            resizeMode: "contain",
          }}
        />
      </View>

      <View
        style={{
          paddingLeft: widthPixel(17),
          width: widthPixel(200),
          // backgroundColor: "red",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 14,
            fontWeight: "400",
            lineHeight: 18,
            fontFamily: Fontfamily.primaryFont,
          }}
        >
          Roburna Blockchain
        </Text>
        <Text
          style={{
            color: THEME.COLORS.placeHolderColor,
            fontSize: 12,
            fontWeight: "400",
            lineHeight: 18,
            fontFamily: Fontfamily.primaryFont,
          }}
        >
          25350 Members, 1220 online
        </Text>
      </View>
      <View style={{ paddingLeft: widthPixel(10), flexDirection: "row" }}>
        <Image
          source={images.search}
          style={{
            resizeMode: "contain",
            width: 20,
            height: 20,
          }}
        />

        <Image
          source={images.menu}
          style={{ width: 20, height: 20, marginLeft: widthPixel(20) }}
        />
      </View>
    </View>
  );
};

export default ChatHeader;
