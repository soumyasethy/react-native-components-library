import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import { createWidgetWithProps } from "./widgets/WidgetFactory";

const { width, height } = Dimensions.get("window");

class BaseWidget extends Component {
  /*protected*/
  constructor(props) {
    super(props);
  }

  getDimensions() {
    return { width, height };
  }

  renderWidget(widgetData: any, props: any) {
    if (widgetData) {
      let res = createWidgetWithProps(widgetData, props);
      return res;
    }
    return null;
  }
  render() {
    return (
      <View>
        <Text>Base Calls</Text>
      </View>
    );
  }
}

export default BaseWidget;
