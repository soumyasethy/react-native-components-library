// @flow
import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

export default (Comp: any) => {
  return ({ spinner, children, ...props }: Object) => (
    <View style={{ flex: 1 }}>
      <Comp {...props}>{children}</Comp>
    </View>
  );
};
