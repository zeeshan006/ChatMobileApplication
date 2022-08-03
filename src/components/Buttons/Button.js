import React from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Fontfamily from "../../constants/fontFamily";

import { THEME } from "../../theme";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Button = ({ text, onpress, disable, loading }) => {
   return (
      <LinearGradient
         colors={["#36C5FA", "#A96CFF", "#A96CFF"]}
         style={styles.container}
         start={{ y: 0.0, x: 0.0 }}
         end={{ y: 0.0, x: 1.0 }}
      >
         <TouchableOpacity
            style={styles.btn}
            onPress={onpress}
            disabled={disable}
         >
            {loading ? (
               <ActivityIndicator
                  size={"small"}
                  color={"white"}
               ></ActivityIndicator>
            ) : (
               <Text style={styles.logintext}>{text}</Text>
            )}
         </TouchableOpacity>
      </LinearGradient>
   );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    width: "90%",
    marginLeft: "5%",
    marginTop: windowHeight * 0.03,
    height: windowHeight * 0.07,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: "90%",
    height: windowHeight * 0.07,
    justifyContent: "center",
    alignItems: "center",
  },
  logintext: {
    fontFamily: Fontfamily.primaryFont,
    fontSize: 14,
    color: THEME.COLORS.textColor,
    fontWeight: "600",
  },
});
