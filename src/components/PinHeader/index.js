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
import { Fontfamily, images } from "../../constants";
import { THEME } from "../../theme";
import { heightPixel, widthPixel } from "../../theme/responsive";

const PinHeader = ({}) => {
  return (
    <>
      <View
        style={{
          backgroundColor: THEME.COLORS.textInputBgColor,
          height: heightPixel(57),
          flexDirection: "row",
          paddingHorizontal: "10%",
          alignItems: "center",
        }}
      >
        <Image
          source={images.chat}
          style={{
            resizeMode: "contain",
            width: 44,
            height: 44,
            alignSelf: "center",
          }}
        />
        <View style={{ paddingLeft: widthPixel(16), width: widthPixel(265) }}>
          <Text
            style={{
              color: "white",
              fontSize: 12,
              fontWeight: "400",
              lineHeight: 14,
              fontFamily: Fontfamily.primaryFont,
            }}
          >
            Pinned Message #298
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
            Its our senior dev Devesh presenting this,...
          </Text>
        </View>
        <View style={{}}>
          <Image
            source={images.pin}
            style={{ width: 15, height: 15, alignSelf: "center" }}
          />
        </View>
      </View>
    </>
  );
};

export default PinHeader;
