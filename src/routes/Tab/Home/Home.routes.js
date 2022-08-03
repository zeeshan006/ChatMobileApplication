import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../../../screens/Home";
import GoForNewChat from "../../../screens/Chat/ChatScreens/SearchNewUser/index";
import SearchUser from "../../../screens/Chat/ChatScreens/SearchNewUser/searchUser";
import NavRoutes from "../../navRoutes";
const Stack = createNativeStackNavigator();

const HomeStack = () => {
   return (
      <Stack.Navigator
         screenOptions={{
            headerShown: false,
         }}
         initialRouteName={NavRoutes.HOME}
      >
         <Stack.Screen name={NavRoutes.HOME} component={Home} />
      </Stack.Navigator>
   );
};

export default HomeStack;
