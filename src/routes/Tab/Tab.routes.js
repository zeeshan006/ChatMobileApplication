import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import { SafeAreaView, View, Image, Text } from "react-native";
import HomeStack from "./Home/Home.routes";
import GraphStack from "./Graph/Graph.routes";
import HashtagStack from "./Hashtag/Hashtag.routes";
import DocumentStack from "./Document/Document.routes";
import WalletStack from "./Wallet/Wallet.routes";
import ChatNavigators from "../../screens/Chat/ChatNavigators";
import ChatStack from "./ChatRoute/index";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
   return (
      <>
         <Tab.Navigator
            initialRouteName={"ChatHome"}
            tabBarOptions={{
               style: {
                  backgroundColor: "white",
               },
               tabStyle: {
                  width: "100%",
               },
               showLabel: false,
            }}
            screenOptions={{
               headerShown: false,
               tabBarStyle: {
                  backgroundColor: "#1A2434",
                  // position: "absolute",
                  // bottom: 5,
                  width: "96%",
                  marginLeft: "2%",
                  borderRadius: 40,
               },
            }}
         >
            <Tab.Screen
               name="Home"
               component={HomeStack}
               forceRenderTabPanel={false}
               listeners={({ navigation, route }) => ({
                  tabPress: (e) => {
                     // dispatch(setBottomHomeStackRoot('Home'));
                  },
               })}
               options={{
                  //   tabBarLabel: 'Home',

            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/icons/home.png")
                    : require("../../assets/icons/home.png")
                }
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Graph"
          component={GraphStack}
          forceRenderTabPanel={true}
          options={{
            //   tabBarLabel: 'heart',
            tabBarIcon: ({ focused }) => (
              <Image
                resizeMode="contain"
                source={
                  focused
                    ? require("../../assets/icons/wallet.png")
                    : require("../../assets/icons/wallet.png")
                }
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatStack}
          forceRenderTabPanel={true}
          options={{
            //   tabBarLabel: 'heart',
            tabBarIcon: ({ focused }) => (
              <View>
                <Image
                  resizeMode="contain"
                  source={
                    focused
                      ? require("../../assets/icons/chat.png")
                      : require("../../assets/icons/chat.png")
                  }
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Document"
          component={DocumentStack}
          forceRenderTabPanel={true}
          options={{
            //   tabBarLabel: 'Profile',
            tabBarIcon: ({ focused }) => (
              <Image
                resizeMode="contain"
                source={
                  focused
                    ? require("../../assets/icons/nft.png")
                    : require("../../assets/icons/nft.png")
                }
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Wallet"
          component={WalletStack}
          forceRenderTabPanel={true}
          options={{
            //   tabBarLabel: 'Profile',
            tabBarIcon: ({ focused }) => (
              <Image
                resizeMode="contain"
                source={
                  focused
                    ? require("../../assets/icons/exchange.png")
                    : require("../../assets/icons/exchange.png")
                }
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabs;
