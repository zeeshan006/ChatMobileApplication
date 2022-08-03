import AsyncStorage from '@react-native-async-storage/async-storage';
import {markSeenTrue} from '../../../../redux/features/chat';

export default markSeen = async (dispatch, data) => {
  const chatpart = await AsyncStorage.getItem('chatPartner');
  //   console.log(chatpart);
  //   console.log(data?.first_user_id);
  if (chatpart != null) {
    if (data?.group_id == chatpart) {
      dispatch(markSeenTrue(data));
    }
  }
};
