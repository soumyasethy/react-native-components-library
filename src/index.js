import React from "react";
import { COLORS } from "./utils/Colors.js";
import { shadow } from "./utils/Shadow";
import { noShadow } from "./utils/NoShadow.js";
import { mS, s, mVs } from "./widgets/ResponsiveScreen";
import {
  Questions,
  ButtonCard,
  SingleMultipleChoiceCard,
  DynamicQuestionCard,
  MapCard,
  CameraCard,
  FullScreenSpinnerHOC,
  TakeSurveyCard,
  SurveyCard,
  InputComponent,
  DismissKeyboardView,
  ScrollPick
} from "./components";
import { AppContainer } from "./components/hoc";
import { questionType } from "./components/functionalComp/";
import Swiper from "react-native-swiper";
import { _storeData, _retrieveData, _logout } from "./storage";
import { BasePage, BaseWidget } from "./widgetization";

export {
  s,
  mS,
  mVs,
  shadow,
  noShadow,
  COLORS,
  Questions,
  ButtonCard,
  SingleMultipleChoiceCard,
  DynamicQuestionCard,
  MapCard,
  questionType,
  AppContainer,
  Swiper,
  CameraCard,
  FullScreenSpinnerHOC,
  TakeSurveyCard,
  SurveyCard,
  InputComponent,
  _storeData,
  _retrieveData,
  _logout,
  DismissKeyboardView,
  ScrollPick,
  BaseWidget,
  BasePage
};
