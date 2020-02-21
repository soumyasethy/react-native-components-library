import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import {
  SingleMultipleChoiceCard,
  MapCard,
  questionType,
  CameraCard,
  AppContainer
} from "../index";
import { mS } from "../../widgets/ResponsiveScreen";
import QuestionComponent from "./QuestionComponent";
import { TextInputCard } from "./TextInputCard";
class DynamicQuestionCard extends PureComponent {
  render() {
    return (
      <>
        <QuestionComponent {...this.props} />
        {this.renderOption()}
      </>
    );
  }
  renderOption = () => {
    switch (this.props.type) {
      case questionType.singleChoice:
        return <SingleMultipleChoiceCard {...this.props} />;
      case questionType.multiChoice:
        return <SingleMultipleChoiceCard {...this.props} />;
      case questionType.gps:
        return <MapCard />;
      case questionType.picture:
        return <CameraCard />;
      case questionType.inputType:
        return <TextInputCard />;
      default:
    }
  };
}

DynamicQuestionCard.propTypes = {
  question: PropTypes.string.isRequired,
  isMandatory: PropTypes.bool,
  selectLimit: PropTypes.number,
  onSelect: PropTypes.func,
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
