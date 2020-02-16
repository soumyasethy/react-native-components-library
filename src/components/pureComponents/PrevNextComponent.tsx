import React, { Component } from "react";
import PropTypes from "prop-types";
import { mS, screenHeight, screenWidth } from "../../widgets/ResponsiveScreen";
import { OptionCard } from "./OptionCard";
import { View } from "react-native";

class PrevNextComponent extends Component {
  render() {
    return (
      <View
        style={{
          height: mS(screenHeight * 0.1),
          width: screenWidth,
          position: "absolute",
          bottom: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: mS(16 * 2),
          paddingRight: mS(16 * 2)
        }}
      >
        <OptionCard
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: screenWidth / 2 - 50
          }}
          item={"Prev."}
          addToSelected={() => {
            console.warn("clicked");
          }}
          isSelected={false}
        />
        <OptionCard
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: screenWidth / 2 - 50
          }}
          item={"Next"}
          addToSelected={() => {
            console.warn("clicked");
          }}
          isSelected={true}
        />
      </View>
    );
  }
}

// PrevNextComponent.propTypes = {};

export default PrevNextComponent;
