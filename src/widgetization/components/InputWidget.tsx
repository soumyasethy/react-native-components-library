import React, { Component } from "react";
import { View, TextInput } from "react-native";
import PropTypes from "prop-types";
import { COLORS } from "../../components";

const InputWidget = props => {
  return (
    <View
      style={{
        width: "100%",
        height: 60,
        alignItems: "center",
        borderColor: COLORS.grey,
        borderWidth: 1
      }}
    >
      <TextInput
        style={{ height: 60, width: "100%" }}
        value={props?.data?.text}
        placeholder={props.data.placeholder}
        //inlineImageLeft='search_icon'
      />
    </View>
  );
};

InputWidget.propTypes = {};

export default InputWidget;
