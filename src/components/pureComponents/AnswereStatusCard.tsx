import React, { Component } from "react";
import { View, Text } from "react-native";

import PropTypes from "prop-types";
import { mS, screenWidth } from "../../widgets/ResponsiveScreen";
import { COLORS } from "../index";

export const AnswereStatusCard = props => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: mS(16),
        width: "100%"
      }}
    >
      <Text
        style={{
          color: props.selected.length > 0 ? COLORS.green : COLORS.grey777
        }}
      >
        {props.selected.length > 0 ? "Answered" : "Unanswered"}
      </Text>
      <Text
        style={{
          color: props.selected.length > 0 ? COLORS.green : COLORS.grey777
        }}
      >
        Selected: {props.selected.length}/
        {props.selectLimit || props.options.length}
      </Text>
    </View>
  );
};

AnswereStatusCard.propTypes = {
  selected: PropTypes.array.isRequired,
  selectLimit: PropTypes.number,
  options: PropTypes.array.isRequired
};
