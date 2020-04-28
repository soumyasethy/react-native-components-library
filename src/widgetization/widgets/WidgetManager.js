import React from "react";
import { Text } from "react-native";
import { widgetMap } from "./WidgetConstants";
import {
  UploadImageWidget,
  TitleWidget1,
  TitleWidget2,
  RadioWidget,
  RadioListWidget,
  CheckListWidget,
  CheckboxWidget,
  InfoWidget,
  InputWidget,
  LocationInputWidget
} from "../components";

class WidgetManager {
  static isValidWidget(data) {
    if (!data.hasOwnProperty("widgetType")) {
      return false;
    }
    let widgetType = data["widgetType"];
    return widgetMap[widgetType] === widgetType;
  }

  static getWidget(data) {
    if (!data.hasOwnProperty("widgetType")) {
      return null;
    }

    let widgetType = data["widgetType"];

    switch (widgetType) {
      case widgetMap.UPLOAD_IMAGE_WIDGET:
        return <UploadImageWidget {...data} />;
      case widgetMap.TITLE_WIDGET1:
        return <TitleWidget1 {...data} />;
      case widgetMap.TITLE_WIDGET2:
        return <TitleWidget2 {...data} />;
      case widgetMap.RADIO_WIDGET:
        return <RadioWidget {...data} />;
      case widgetMap.CHECKLIST_WIDGET:
        return <CheckListWidget {...data} />;
      case widgetMap.CHECKBOX_WIDGET:
        return <CheckboxWidget {...data} />;
      case widgetMap.INFO_WIDGET:
        return <InfoWidget {...data} />;
      case widgetMap.INPUT_WIDGET:
        return <InputWidget {...data} />;
      case widgetMap.RADIO_LIST_WIDGET:
        return <RadioListWidget {...data} />;
      case widgetMap.LOCATION_INPUT_WIDGET:
        return <LocationInputWidget {...data} />;

      default:
        return <Text>Not found</Text>;
    }
  }
}

export default WidgetManager;
