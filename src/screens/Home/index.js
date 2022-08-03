import React from "react";
import { View, Text } from "react-native";
import { THEME } from "../../theme";
import GLOBAL_STYLE from "./../../theme/global";

const Home = () => {
   return (
      <View style={{ flex: 1, backgroundColor: THEME.COLORS.primaryColor }}>
         <Text style={{ fontSize: 14, color: "white" }}>Home Screen</Text>
      </View>
   );
};

export default Home;
