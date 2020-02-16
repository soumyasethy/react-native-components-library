import Snackbar from 'react-native-snackbar';
import {COLORS} from './Colors';

export const ShowMessage = (message, success) => {
  Snackbar.show({
    title: message,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: success ? COLORS.green : COLORS.black,
  });
};
