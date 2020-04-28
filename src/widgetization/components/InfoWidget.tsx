import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { COLORS } from "../../components";

const InfoWidget = () => {
  return (
    <View style={{ width: "100%", backgroundColor: COLORS.orange }}>
      <Text> This is info Widget</Text>
    </View>
  );
};

InfoWidget.propTypes = {};

export default InfoWidget;
