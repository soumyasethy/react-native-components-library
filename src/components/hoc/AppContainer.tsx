import React from "react";
import { SafeAreaView, View } from "react-native";

export const AppContainer = ComponentX => props => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ComponentX> </ComponentX>
    </SafeAreaView>
  );
};
