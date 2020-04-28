import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import BaseWidget from "./BaseWidget";
import HandleKeyboardHoc from "./components/HandleKeyboardHoc";

class BasePage extends BaseWidget {
  state = { isLoading: true };
  getDimensions() {
    return { width, height };
  }
  renderPage() {}
  render() {
    return (
      <HandleKeyboardHoc>
        <View style={{ padding: 16 }}>{this.renderPage()}</View>
      </HandleKeyboardHoc>
    );
  }
}

BasePage.propTypes = {};

export default BasePage;
