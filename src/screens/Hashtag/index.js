import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
class Hashtag extends Component {
   render() {
      return (
         <View style={{ flex: 1, backgroundColor: THEME.COLORS.primaryColor }}>
            <Text style={{ fontSize: 14, color: "white" }}>Hashtag Screen</Text>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   Wrapper: {
      backgroundColor: "#FFFFFF",
      padding: 40,
      width: "100%",
      height: Platform.OS === "ios" ? "90%" : "100%",
   },
});

export default Hashtag;
