import AsyncStorage from "@react-native-async-storage/async-storage";
import { alluserdata } from "../../../../../redux/reducer/allUsers";
import axios from "axios";
import apiConstants from "../../../../../constants/apiConstants";

export const getallUsers = async (dispatch) => {
   const token = await AsyncStorage.getItem("token");
   axios
      .get(apiConstants.base_url + apiConstants.get_message_contacts, {
         headers: {
            "Content-Type": "application/json",
            Authorization: token,
         },
      })
      .then((response) => {
         dispatch(alluserdata(response?.data?.data));
         // console.log('response', response?.data?.data);
      })
      .catch((error) => {
         // console.log('error chatlist', error?.response?.data?.error);
      });
};
