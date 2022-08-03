import React, { useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import All from "./All";
import Important from "./Impotant";
import Personal from "./Personal";
import Token from "./Token";
import Fontfamily from "../../../../constants/fontFamily";
import { heightPixel, widthPixel } from "../../../../theme/responsive";
import { THEME } from "../../../../theme/index";
import GLOBAL_STYLE from "../../../../theme/global";

export default function TopTabViews() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          indicatorStyle: {
            backgroundColor: "white",
            width: 100,
            justifyContent: "center",
            alignItems: "center",
          },

          tabStyle: {
            width: 110,
          },
          style: {
            backgroundColor: THEME.COLORS.primaryColor,
            borderBottomWidth: 1,
            borderBottomColor: "#D9D9D933",
          },
        }}
        screenOptions={{
          tabBarScrollEnabled: true,
        }}
      >
        <Tab.Screen
          name="All"
          component={All}
          options={{
            tabBarLabel: ({ focused, color }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={style.Text}>All</Text>
                <View style={[GLOBAL_STYLE.CENTER, style.counterView]}>
                  <Text style={style.count}>1</Text>
                </View>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Important"
          component={Important}
          options={{
            tabBarLabel: ({ focused, color }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={style.Text}>Important</Text>
                <View style={[GLOBAL_STYLE.CENTER, style.counterView]}>
                  <Text style={style.count}>6</Text>
                </View>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Personal"
          component={Personal}
          options={{
            tabBarLabel: ({ focused, color }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={style.Text}>Personal</Text>
                <View style={[GLOBAL_STYLE.CENTER, style.counterView]}>
                  <Text style={style.count}>1</Text>
                </View>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Token"
          component={Token}
          options={{
            tabBarLabel: ({ focused, color }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={style.Text}>My Tokens</Text>
                <View style={[GLOBAL_STYLE.CENTER, style.counterView]}>
                  <Text style={style.count}>1</Text>
                </View>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

const style = StyleSheet.create({
  Text: {
    color: "white",
    fontSize: 14,
    fontFamily: Fontfamily.primaryFont,
    fontWeight: "400",
  },
  counterView: {
    marginLeft: widthPixel(5),
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: "#D1D1D1",
  },
  count: {
    fontSize: 12,
    textAlign: "center",
    color: "#01182A",
  },
});
