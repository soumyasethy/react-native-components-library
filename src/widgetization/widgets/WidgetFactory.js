import React from "react";
import { View } from "react-native";
import WidgetManager from "./WidgetManager";

const widgetCreatorMap = {};

export const registerWidget = (widgetType, Widget) => {
  console.log(widgetType + " registered");
  widgetCreatorMap[widgetType] = widgetData => {
    return <Widget {...widgetData} />;
  };
  return Widget;
};

export const createWidget = widgetData => {
  const registeredWidgetCreator = widgetCreatorMap[widgetData.widgetType];
  if (registeredWidgetCreator === undefined) {
    console.log(widgetData.widgetType + " not registered");
    return WidgetManager.isValidWidget(widgetData) ? (
      WidgetManager.getWidget(widgetData)
    ) : (
      <View />
    );
  } else return registeredWidgetCreator(widgetData);
};

export const createWidgetWithProps = (widgetData, props) => {
  widgetData = { ...widgetData, ...props };
  return createWidget(widgetData);
};

export const isRegisteredWidget = widgetData => {
  return widgetCreatorMap[widgetData.widgetType] !== undefined;
};
