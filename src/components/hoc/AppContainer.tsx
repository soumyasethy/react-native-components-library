import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { CompletedStatusCard } from "../pureComponents";
import PrevNextComponent from "../pureComponents/PrevNextComponent";
import { mS } from "../../widgets/ResponsiveScreen";
const AppContainer = () => {
  return ({ children, ...props }) => {
    const onNext = () => {
      if (props.currentIndex < props.totalCount) {
        props.setCurrentIndex(props.currentIndex + 1);
      }
    };
    const onPrev = () => {
      if (props.currentIndex >= 0) {
        props.setCurrentIndex(props.currentIndex - 1);
      }
    };
    const onExit = () => {
      props.onExit();
    };
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <CompletedStatusCard
          selected={props.currentIndex + 1}
          count={props.totalCount}
        />
        <View style={{ flex: 1, paddingHorizontal: mS(16) }}>{children}</View>

        <PrevNextComponent
          onNext={onNext}
          onPrev={onPrev}
          onSubmit={props.onSubmit}
          showSubmit={props.currentIndex + 1 === props.totalCount}
          onExit={onExit}
          showExit={props.currentIndex + 1 === 1}
        />
      </SafeAreaView>
    );
  };
};
export default AppContainer();
