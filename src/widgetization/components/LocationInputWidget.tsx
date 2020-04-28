import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import TagWidget from "./TagWidget";
import { COLORS } from "../../components";
import { mS } from "../../widgets/ResponsiveScreen";
import { constants } from "../../constants";
import InputWidget from "./InputWidget";
import { Icons } from "../assets";
const boxHeight = 60;

const LocationInputWidget = props => {
  const [locationName, setLocation] = React.useState(
    "Bellandur, Bangalore, India"
  );
  const data = {
    hashtags: ["Current Location", "Add Other Location"],
    onSelectTags: () => {}
  };
  return (
    <View style={{ flexDirection: "column", width: "100%" }}>
      <View style={{ width: "100%", flexDirection: "row" }}>
        <TagWidget data={data} />
      </View>
      <View
        style={{
          height: boxHeight,
          width: "100%",
          borderColor: COLORS.grey,
          borderWidth: mS(1),
          paddingHorizontal: 8,
          marginBottom: constants.spacing.large,
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Icons.Marker height={30} widht={30} />
        <Text
          style={{ color: COLORS.blue, fontSize: mS(15), marginLeft: mS(8) }}
        >
          {locationName}
        </Text>
      </View>
      <InputWidget data={{ placeholder: "Land mark" }} />
    </View>
  );
};

LocationInputWidget.propTypes = {};

export default LocationInputWidget;
