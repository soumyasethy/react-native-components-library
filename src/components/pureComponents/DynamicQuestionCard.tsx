import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  SingleMultipleChoiceCard,
  MapCard,
  questionType,
  CameraCard
} from "../index";
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
        return <MapCard {...this.props} />;
      case questionType.picture:
        return <CameraCard {...this.props} />;
      case questionType.inputType:
        return <TextInputCard {...this.props} />;
      default:
    }
  };
}

DynamicQuestionCard.propTypes = {
  question: PropTypes.string.isRequired,
  isMandatory: PropTypes.bool,
  selectLimit: PropTypes.number,
  onSelect: PropTypes.func,
  // selected: PropTypes.array,
  options: PropTypes.array.isRequired
};

export default DynamicQuestionCard;
