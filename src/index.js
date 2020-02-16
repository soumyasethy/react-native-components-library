import React from "react";
import { COLORS } from "./utils/Colors.js";
import { shadow } from "./utils/Shadow";
import { noShadow } from "./utils/NoShadow.js";
import { mS, s, mVs } from "./widgets/ResponsiveScreen";
import {
  Questions,
  OptionCard,
  OptionPicker,
  DynamicQuestionCard,
  MapCard
} from "./components";
import { AppContainer } from "./components/hoc/AppContainer";
import { questionType } from "./components/functionalComp/";
import Swiper from "react-native-swiper";

export {
  s,
  mS,
  mVs,
  shadow,
  noShadow,
  COLORS,
  Questions,
  OptionCard,
  OptionPicker,
  DynamicQuestionCard,
  MapCard,
  questionType,
  AppContainer,
  Swiper
};
