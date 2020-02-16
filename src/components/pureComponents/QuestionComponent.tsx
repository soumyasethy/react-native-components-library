import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { mS } from "../../widgets/ResponsiveScreen";
import { COLORS, MapCard } from "../index";

class QuestionComponent extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          marginTop: mS(16)
        }}
      >
        <Text style={{ color: COLORS.grey777 }}>Single Choice</Text>
        <Text style={{ fontSize: 25, fontWeight: "500", marginTop: mS(8) }}>
          {this.props.question}
          {this.props.isMandatory ? (
            <Text
              style={{
                fontSize: 25,
                color: COLORS.red,
                fontWeight: "700"
              }}
            >
              {" *"}
            </Text>
          ) : (
            ""
          )}
        </Text>
      </View>
    );
  }
}

QuestionComponent.propTypes = {};

export default QuestionComponent;
