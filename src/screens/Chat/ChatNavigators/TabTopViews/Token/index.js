import React from "react";
import { View, Text } from "react-native";
import { THEME } from "../../../../../theme";

const Token = () => {
   return (
      <View style={{ flex: 1, backgroundColor: THEME.COLORS.primaryColor }}>
         <Text style={{ fontSize: 14, color: "white" }}>My Tokens</Text>
      </View>
   );
};

export default Token;
