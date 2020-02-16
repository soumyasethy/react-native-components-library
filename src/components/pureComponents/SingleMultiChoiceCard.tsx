import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import PropTypes from "prop-types";
import { COLORS, OptionPicker, Questions } from "../index";
import { mS } from "../../widgets/ResponsiveScreen";

class SingleMultiChoiceCard extends Component {
  render() {
    return (
      <View style={style.container}>
        <Questions selected={2} count={6} />
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
          </Text>

          <OptionPicker
            options={this.props.options}
            selectLimit={this.props.selectLimit}
            onSelect={this.props.onSelect}
            selected={this.props.selected}
          />
        </View>
      </View>
    );
  }
}

// SingleMultiChoiceCard.propTypes = {};

export default SingleMultiChoiceCard;
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: mS(16)
    //justifyContent: 'center',
    // backgroundColor: COLORS.red,
  }
});
