import React, { Component } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Keyboard,
  RefreshControl,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from "react-native";
import { COLORS } from "../../utils/Colors";
import PropTypes from "prop-types";

const HandleKeyboardHoc = props => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <KeyboardAvoidingView style={{ flex: 1 }} enabled>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ flex: 1 }}
        >
          <ScrollView>{props.children}</ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
HandleKeyboardHoc.propTypes = {};

export default HandleKeyboardHoc;
