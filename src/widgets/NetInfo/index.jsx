import { useNetInfo } from "@react-native-community/netinfo";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";
import { COLORS } from "../../utils/Colors";
import CustomText from "../../components/pureComponents/Text";
export const isNetworkConnected = () => {
  const netInfo = useNetInfo();
  let connected = netInfo.isConnected.toString() === "true";
  console.warn("Changed-->" + netInfo.isConnected.toString());
  return connected;
};

export const NetworkStatus = () => {
  const [isShowing, _toggle] = useState(true);
  const netInfo = useNetInfo();
  if (netInfo.isConnected.toString() === "true") {
    // return dismiss;
    setTimeout(() => {
      _toggle(false);
    }, 0);
    if (isShowing) {
      return connected();
    } else return dismiss;
  }
  return disConnected();
};
const dismiss = () => <View> </View>;
const connected = () => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.green,
      padding: 5
    }}
  >
    <CustomText style={{ color: COLORS.white, fontSize: 15 }}>
      Connected to Internet
    </CustomText>
  </View>
);
const disConnected = () => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.red,
      padding: 5
    }}
  >
    <CustomText style={{ color: COLORS.white, fontSize: 15 }}>
      Unable to connect Internet
    </CustomText>
  </View>
);
