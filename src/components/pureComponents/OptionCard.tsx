import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../utils/Colors";
import { shadow } from "../../utils/Shadow";
import { mS } from "../../widgets/ResponsiveScreen";

export const OptionCard = props => {
  return props.isSelected ? (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => props.addToSelected(props.item)}
      style={{
        padding: mS(10),
        backgroundColor: COLORS.blue,
        marginTop: mS(16),
        borderRadius: mS(5),
        borderColor: COLORS.blue,
        borderWidth: mS(0.5),
        ...shadow,
        ...(props.style ? props.style : null)
      }}
    >
      {
        <View
          style={{
            margin: mS(5)
          }}
        >
          <Text
            style={{ color: COLORS.white, fontSize: mS(18), fontWeight: "500" }}
          >
            {props.item}
          </Text>
        </View>
      }
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => props.addToSelected(props.item)}
      style={{
        padding: mS(10),
        backgroundColor: COLORS.white,
        marginTop: mS(16),
        borderRadius: mS(5),
        borderColor: COLORS.blue,
        borderWidth: mS(0.5),
        ...shadow,
        ...(props.style ? props.style : null)
      }}
    >
      {
        <View
          style={{
            margin: mS(5)
          }}
        >
          <Text
            style={{ color: COLORS.blue, fontSize: mS(18), fontWeight: "500" }}
          >
            {props.item}
          </Text>
        </View>
      }
    </TouchableOpacity>
  );
};
