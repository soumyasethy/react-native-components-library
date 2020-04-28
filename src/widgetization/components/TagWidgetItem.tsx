import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { constants } from "../../constants";
import { COLORS } from "../../utils/Colors";

export const TagWidgetItem = props => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        props.onPress(props.hastag);
      }}
      style={props.isSelected ? selected : notSelected}
    >
      <Text
        style={{
          color: props.isSelected ? COLORS.blue : COLORS.black,
          fontWeight: props.isSelected
            ? constants.fonts.weight.medium
            : constants.fonts.weight.normal,
          fontSize: constants.fonts.size.small
        }}
      >
        {props.hastag}
      </Text>
    </TouchableOpacity>
  );
};
const selected = {
  backgroundColor: COLORS.blue_light,
  borderRadius: 30,
  borderColor: COLORS.blue,
  borderWidth: 2,
  padding: 12,
  margin: 5
};
const notSelected = {
  padding: 12,
  margin: 5,
  borderRadius: 30,
  borderColor: COLORS.grey,
  borderWidth: 1
};
