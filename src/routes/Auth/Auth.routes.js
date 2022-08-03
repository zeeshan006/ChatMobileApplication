import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import NavRoutes from "../navRoutes";
import Profile from "../../screens/Auth/Profile/index";
import Bio from "../../screens/Auth/Bio";
import JoinGroup from "../../screens/Auth/JoinGroup/index";
import ForgotPassword from "../../screens/Auth/Forgot/ForgotPassword/index";
import ForgotNewPassword from "../../screens/Auth/Forgot/ForgotNewPassword/index";
import ForgotPasswordOtp from "../../screens/Auth/Forgot/ForgotPasswordOtp/index";
import CreateAccount from "../../screens/Auth/SignUp/CreateAccount/index";
import CreateAccountPassword from "../../screens/Auth/SignUp/CreateAccountPassword/index";
import CreateAccountOtp from "../../screens/Auth/SignUp/CreateAccountOtp";
import ChatNavigators from "../../screens/Chat/ChatNavigators/index";
import Login from "../../screens/Auth/Login/index";
import DrawerNavigator from "../../screens/Drawer/DrawerNavigator/index";

const Stack = createStackNavigator();

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

const AuthStack = () => {
  return (
    <Stack.Navigator
      cardStyle={{
        backgroundColor: "transparent",
        flex: 1,
      }}
      // initialRouteName={"Demo"}
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
        animationTypeForReplace: "pop",
        gestureEnabled: false,
        cardOverlayEnabled: false,
        cardShadowEnabled: false,
        transitionSpec: {
          open: config,
          close: config,
        },
      }}
    >
      <Stack.Screen name={"login"} component={Login} />
      <Stack.Screen name={NavRoutes.Profile} component={Profile} />
      <Stack.Screen name={NavRoutes.Bio} component={Bio} />
      <Stack.Screen name={NavRoutes.JoinGroup} component={JoinGroup} />

      <Stack.Screen
        name={NavRoutes.FORGOT_PASSWORD}
        component={ForgotPassword}
      />
      <Stack.Screen
        name={NavRoutes.FORGOT_PASSWORD_OTP}
        component={ForgotPasswordOtp}
      />
      <Stack.Screen
        name={NavRoutes.FORGOT_NEW_PASSWORD}
        component={ForgotNewPassword}
      />
      <Stack.Screen name={NavRoutes.CREATE_ACCOUNT} component={CreateAccount} />
      <Stack.Screen
        name={NavRoutes.CREATE_ACCOUNT_OTP}
        component={CreateAccountOtp}
      />
      <Stack.Screen
        name={NavRoutes.CREATE_ACCOUNT_PASSWORD}
        component={CreateAccountPassword}
      />
      <Stack.Screen name="tabTop" component={ChatNavigators} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default AuthStack;
