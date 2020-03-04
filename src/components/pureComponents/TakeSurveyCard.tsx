import React, { useState } from "react";
import PropTypes from "prop-types";
import DynamicQuestionCard from "./DynamicQuestionCard";
import { AppContainer, questionType } from "../index";

const TakeSurveyCard = props => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const updateIndex = index => setCurrentIndex(index);

  let question = props.data.questions[currentIndex];
  const updateAnswer = payload => {
    if (payload && payload.length > 0) {
      props.updateAnswer({
        ...question,
        answer: payload
      });
    }
  };
  return (
    <AppContainer
      currentIndex={currentIndex}
      totalCount={props.data.questions.length}
      setCurrentIndex={updateIndex}
      onExit={props.onExit}
      onSubmit={props.onSubmit}
      editingDisabled={props.editingDisabled}
    >
      <DynamicQuestionCard
        index={currentIndex}
        type={question.type}
        isMandatory={question.isMandatory}
        question={question.question}
        options={question.options}
        onSelect={updateAnswer}
        selectLimit={question.type === questionType.singleChoice ? 1 : 0}
        selected={!question.answer ? null : question.answer}
      />
    </AppContainer>
  );
};

TakeSurveyCard.propTypes = {
  data: PropTypes.object.isRequired
};

export default TakeSurveyCard;
