import React from "react";
import { Text, View } from "react-native";
import {
  mS,
  mVs,
  s,
  screenHeight,
  screenWidth
} from "../../widgets/ResponsiveScreen";
import { COLORS } from "../../utils/Colors";
import { shadow } from "../../utils/Shadow";

export const CompletedStatusCard = props => {
  return (
    <View
      style={{
        width: screenWidth,
        marginTop: mS(16),
        justifyContent: "center",
        flexDirection: "column",
        ...shadow
      }}
    >
      <View
        style={{
          height: mVs(8),
          width: screenWidth,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row"
        }}
      >
        <DrawLine total={props.count} selected={props.selected} />
      </View>
      <Text
        style={{
          marginTop: mS(8),
          marginLeft: mS(16),
          fontSize: mS(18),
          fontWeight: "500"
        }}
      >
        {props.selected} / {props.count}
      </Text>
    </View>
  );
};

const DrawLine = props => {
  let lines = [];

  for (i = 0; i < props.total; i++) {
    lines.push(
      i < props.selected ? (
        <View
          key={i}
          style={{
            backgroundColor: COLORS.blue,
            height: mVs(5),
            margin: mS(5),
            width: screenWidth / props.total - mS(16)
          }}
        />
      ) : (
        <View
          key={i}
          style={{
            borderColor: COLORS.blue,
            borderWidth: 1,
            height: mVs(5),
            margin: mS(5),
            width: screenWidth / props.total - mS(16)
          }}
        />
      )
    );
  }
  return lines;
};
