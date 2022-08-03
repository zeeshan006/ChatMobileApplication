import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { THEME } from "../../theme/index";
import { images } from "../../constants";
import { ColorTheme } from "../../theme/change_theme";
import { useSelector } from "react-redux";
const windowHeight = Dimensions.get("window").height;

const Countrypicker = ({
  country,
  placeholder,
  image,
  value,
  onchange,
  hanldeCountryPicker,
  placeholderTextColor,
}) => {
  const Colors = useSelector((state) => state?.ColorTheme?.Color_theme);

  const theme = ColorTheme(Colors);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.countryView,
          { backgroundColor: theme.color.textInputBgColor },
        ]}
      >
        <CountryPicker
          placeholder={
            <Text style={{ color: theme.color.placeHolderColor }}>
              {country}
            </Text>
          }
          translation="eng"
          withFilter={true}
          withFlagButton={true}
          onSelect={(val) => {
            // setCountry("+" + val?.callingCode),
            hanldeCountryPicker("+" + val?.callingCode);
          }}
        />
      </View>
      <View
        style={[
          styles.TextinputView,
          { backgroundColor: theme.color.textInputBgColor },
        ]}
      >
        <TextInput
          value={value}
          maxLength={25}
          onChangeText={(text) => {
            onchange(text);
          }}
          keyboardType="number-pad"
          placeholder={placeholder}
          style={[styles.Input, { color: theme.color.textColor }]}
          placeholderTextColor={THEME.COLORS.placeHolderColor}
        />
        <TouchableOpacity style={styles.IconView}>
          <Image source={image} style={styles.Icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Countrypicker;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    flexDirection: "row",
    height: windowHeight * 0.07,
    marginLeft: "5%",
  },
  countryView: {
    width: "23%",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  Input: {
    width: "80%",
    marginLeft: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "2%",
    backgroundColor: THEME.COLORS.textColor,
  },
  TextinputView: {
    width: "74%",
    // paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    flexDirection: "row",
    marginLeft: "2%",
  },
  Input: {
    width: "80%",
    borderRadius: 30,
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
