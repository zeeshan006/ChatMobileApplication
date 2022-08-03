import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../../../screens/Home";
import GoForNewChat from "../../../screens/Chat/ChatScreens/SearchNewUser/index";
import NavRoutes from "../../navRoutes";
import ChatNavigators from "../../../screens/Chat/ChatNavigators/index";
import SearchUser from "../../../screens/Chat/ChatScreens/SearchNewUser/searchUser";
import ChatMessage from "../../../screens/Chat/ChatScreens/ChatMessage/index";
const Stack = createNativeStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"ChatHome"}
    >
      <Stack.Screen name={"ChatHome"} component={ChatNavigators} />
      <Stack.Screen name={NavRoutes.newChat} component={GoForNewChat} />
      <Stack.Screen name={NavRoutes.SearchUser} component={SearchUser} />
      <Stack.Screen name={NavRoutes.Chat} component={ChatMessage} />
    </Stack.Navigator>
  );
};

export default ChatStack;
