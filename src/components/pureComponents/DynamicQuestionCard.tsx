import React, { PureComponent } from "react";
import { View, ScrollView } from "react-native";
import PropTypes from "prop-types";
import {
  SingleMultipleChoiceCard,
  MapCard,
  questionType,
  CameraCard,
  COLORS
} from "../index";
import QuestionComponent from "./QuestionComponent";
import { TextInputCard } from "./TextInputCard";
import { mS } from "../../widgets/ResponsiveScreen";
class DynamicQuestionCard extends PureComponent {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <QuestionComponent {...this.props} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{
            paddingBottom: mS(100)
          }}
        >
          {this.renderOption()}
        </ScrollView>
      </View>
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
