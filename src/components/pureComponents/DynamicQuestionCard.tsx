import React, { PureComponent } from "react";
import { View, ScrollView, Text } from "react-native";
import PropTypes from "prop-types";
import {
  SingleMultipleChoiceCard,
  MapCard,
  questionType,
  CameraCard
} from "../index";
import QuestionComponent from "./QuestionComponent";
import { TextInputCard } from "./TextInputCard";
import { mS } from "../../widgets/ResponsiveScreen";
import { AnswereStatusCard } from "./AnswereStatusCard";
class DynamicQuestionCard extends PureComponent {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <QuestionComponent {...this.props} />
        <AnswereStatusCard
          selected={this.props?.selected}
          type={this.props?.type}
          options={this.props?.options}
          selectLimit={this.props?.selectLimit || this._getCalculatedLimit()}
        />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{ paddingBottom: mS(100) }}
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
      default: {
        return <Text> Oh sorry, We don't support this type question</Text>;
      }
    }
  };
  _getCalculatedLimit = () => {
    //0->unlimited
    //number->fixed to be pick
    switch (this.props.type) {
      case questionType.singleChoice:
        return 1;
      case questionType.multiChoice:
        return 0;
      case questionType.gps:
        return 1;
      case questionType.picture:
        return 1;
      case questionType.inputType:
        return 1;
      default: {
        return 0;
      }
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
