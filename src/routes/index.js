import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./Main";
import NavRoutes from "./navRoutes";
import AuthStack from "./Auth/Auth.routes";
import BottomTabs from "./Tab/Tab.routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Socket from "../socket/socket";
import { useDispatch } from "react-redux";
import addMsg from "../screens/Chat/ChatScreens/ChatMessage/helper/addMsg";
import { getallUsers } from "../screens/Chat/ChatScreens/ChatMessage/helper/getallUser";
import All from "../screens/Chat/ChatNavigators/TabTopViews/All";
import TopTabViews from "../screens/Chat/ChatNavigators/TabTopViews";
import ChatNavigators from "../screens/Chat/ChatNavigators";
import GoForNewChat from "../screens/Chat/ChatScreens/SearchNewUser";
import SearchUser from "../screens/Chat/ChatScreens/SearchNewUser/searchUser";
import ChatMessage from "../screens/Chat/ChatScreens/ChatMessage/index";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { THEME } from "../theme/index";
import Swipeimages from "../components/ImageSwipe/imagesSwipe";
import DrawerNavigator from "../screens/Drawer/DrawerNavigator/index";

const Routes = () => {
  const Stack = createStackNavigator();
  const [initialRoute, setInitialRoute] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token !== "" && token !== null) {
      setInitialRoute("ChatNavigators");
      Socket.setupSocket((data) => {
        console.log(data, "data");
        Socket.messageReciver((data) => {
          addMsg(dispatch, data);
          getallUsers(dispatch);
        });
      });
      Socket.sendMediaMessage((data) => {
        data?.media?.forEach((element) => {
          addMsg(dispatch, element);
          getallUsers(dispatch);
        });
      });
    } else {
      setInitialRoute("ChatNavigators");
    }
  };

  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  return (
    <>
      <NavigationContainer>
        {initialRoute !== "" && (
          <Stack.Navigator
            cardStyle={{
              backgroundColor: "transparent",
              flex: 1,
            }}
            screenOptions={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              headerShown: false,
              animationTypeForReplace: "pop",
              gestureEnabled: false,
              cardOverlayEnabled: true,
              cardShadowEnabled: true,
              transitionSpec: {
                open: config,
                close: config,
              },
            }}
            initialRouteName={"Drawer"}
          >
            <Stack.Screen name={"authStack"} component={AuthStack} />
            <Stack.Screen name={"ChatNavigators"} component={ChatNavigators} />
            <Stack.Screen name={NavRoutes.newChat} component={GoForNewChat} />
            <Stack.Screen name={NavRoutes.SearchUser} component={SearchUser} />
            <Stack.Screen name={NavRoutes.Chat} component={ChatMessage} />
            <Stack.Screen name={NavRoutes.swipeImage} component={Swipeimages} />
            <Stack.Screen name="Drawer" component={DrawerNavigator} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
};

export default Routes;
