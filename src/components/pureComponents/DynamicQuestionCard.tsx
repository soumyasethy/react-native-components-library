import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import {
  OptionPicker,
  CompletedStatusCard,
  MapCard,
  questionType
} from "../index";
import { mS, screenHeight, screenWidth } from "../../widgets/ResponsiveScreen";
import PrevNextComponent from "./PrevNextComponent";
import QuestionComponent from "./QuestionComponent";

class DynamicQuestionCard extends Component {
  render() {
    return (
      <View style={style.container}>
        <CompletedStatusCard selected={2} count={6} />
        <QuestionComponent
          question={this.props.question}
          isMandatory={!!this.props.isMandatory}
        />

        {this.renderOption()}
        <PrevNextComponent />
      </View>
    );
  }
  renderOption = () => {
    switch (this.props.type) {
      case questionType.singleChoice:
        return (
          <OptionPicker
            options={this.props.options}
            selectLimit={this.props.selectLimit}
            onSelect={this.props.onSelect}
            selected={this.props.selected}
          />
        );
      case questionType.multiChoice:
        return (
          <OptionPicker
            options={this.props.options}
            selectLimit={this.props.selectLimit}
            onSelect={this.props.onSelect}
            selected={this.props.selected}
          />
        );
      case questionType.gps:
        return <MapCard />;
      default:
    }
  };
}

DynamicQuestionCard.propTypes = {
  question: PropTypes.string.isRequired,
  isMandatory: PropTypes.boolean,
  selectLimit: PropTypes.number,
  onSelect: PropTypes.functions,
  selected: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired
};

export default DynamicQuestionCard;
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: mS(16)
  }
});
