import AsyncStorage from "@react-native-async-storage/async-storage";
import {
   addNewMessage,
   groupNewmessage,
} from "../../../../../redux/reducer/chat";

export default addMsg = async (dispatch, data) => {
   const chatpart = await AsyncStorage.getItem("chatPartner");
   const singleChat = await AsyncStorage.getItem("singlechat");
   if (chatpart != null) {
      if (data?.group_id == chatpart) {
         dispatch(addNewMessage(data));
         // dispatch(groupNewmessage(data));
      }
   } else {
      if (data?.sender_id === singleChat) {
         dispatch(addNewMessage(data));
      }
   }
};
