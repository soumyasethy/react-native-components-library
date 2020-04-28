import React, { Component } from "react";
import { TouchableOpacity, Text } from "react-native";
import { Icons } from "../assets";
import { constants } from "../../constants";

const CheckboxWidget = () => {
  const [isChecked, toggleCheck] = React.useState(true);
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: constants.spacing.large
      }}
      onPress={() => toggleCheck(!isChecked)}
    >
      <Text>I am Checkbox Item</Text>
      {isChecked ? (
        <Icons.SquareCheck height={20} width={20} />
      ) : (
        <Icons.Square height={20} width={20} />
      )}
    </TouchableOpacity>
  );
};

CheckboxWidget.propTypes = {};

export default CheckboxWidget;
