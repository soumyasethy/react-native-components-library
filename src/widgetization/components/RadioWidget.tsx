import React from "react";
import { View, Text } from "react-native";
import { Icons } from "../assets";
import { constants } from "../../constants";

const RadioWidget = props => {
  // console.warn("props", props);
  // const [isChecked, toggleCheck] = React.useState(true);
  return (
    <View
      activeOpacity={1}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: constants.spacing.large
      }}
      // onPress={() => toggleCheck(!isChecked)}
    >
      <Text>{props?.data?.text}</Text>
      {props?.isChecked ? (
        <Icons.CircleCheck height={20} width={20} />
      ) : (
        <Icons.Circle height={20} width={20} />
      )}
    </View>
  );
};

RadioWidget.propTypes = {};

export default RadioWidget;
