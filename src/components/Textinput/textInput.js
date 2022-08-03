import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { images } from "../../constants";
import { THEME } from "../../theme/index";
import { heightPixel } from "../../theme/responsive";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { ColorTheme } from "../../theme/change_theme";

const Textinput = ({
  placeholder,
  iconhide,
  value,
  iconshow,
  onChange,
  handleChange,
  secureTextEntry,
}) => {
  const Colors = useSelector((state) => state?.ColorTheme?.Color_theme);
  const theme = ColorTheme(Colors);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.color.textInputBgColor },
      ]}
    >
      <TextInput
        value={value}
        maxLength={30}
        secureTextEntry={secureTextEntry}
        onChangeText={(text) => onChange(text)}
        placeholder={placeholder}
        style={[styles.Input, { color: theme.color.textColor }]}
        placeholderTextColor={THEME.COLORS.placeHolderColor}
      />
      <TouchableOpacity style={styles.IconView} onPress={() => handleChange()}>
        {secureTextEntry ? (
          <Image source={iconhide} style={styles.Icon} />
        ) : (
          <Image source={iconshow} style={styles.Icon} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Textinput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLORS.textInputBgColor,
    width: "90%",
    borderRadius: 30,
    paddingVertical: 5,
    height: windowHeight * 0.07,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "5%",
    marginTop: windowHeight * 0.01,
  },
  Input: {
    width: "82%",
    marginLeft: "5%",
    height: heightPixel(48),
  },
  IconView: {
    width: "10%",
    marginRight: "3%",
  },
  Icon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
});
