import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Fontfamily, images } from "../../constants";
import { THEME } from "../../theme";
import { useSelector } from "react-redux";
import { ColorTheme } from "../../theme/change_theme";

const BackNavigate = ({ text, onpress, skipText, skip }) => {
  const Colors = useSelector((state) => state?.ColorTheme?.Color_theme);

  const theme = ColorTheme(Colors);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onpress} style={styles.back}>
        <Image
          source={images.backNavigate}
          resizeMode="contain"
          style={{
            height: 20,
            width: 20,
            tintColor: theme.color.authtextColor,
          }}
        />
        <Text style={[styles.text, { color: theme.color.authtextColor }]}>
          {text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={skip}>
        <Text style={[styles.skip, { color: theme.color.authtextColor }]}>
          {skipText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default BackNavigate;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "3%",
    marginHorizontal: "3%",
    justifyContent: "space-between",
  },
  back: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    paddingLeft: 8,
    color: THEME.COLORS.textColor,
  },
  skip: {
    fontSize: 14,
    color: THEME.COLORS.textColor,
    fontFamily: Fontfamily.primaryFont,
    fontWeight: "400",
    textAlign: "center",
  },
});
