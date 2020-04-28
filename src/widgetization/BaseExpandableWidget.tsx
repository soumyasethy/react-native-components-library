import React, { Component } from "react";
import { View } from "react-native";
import BaseWidget from "./BaseWidget";
import { createWidgetWithProps } from "./widgets";

class BaseExpandableWidget extends Component {
  constructor(props) {
    super(props);
  }
  renderWidget(widgetData: any, props: any) {
    if (widgetData) {
      let res = createWidgetWithProps(widgetData, props);
      return res;
    }
    return null;
  }

  renderPrimarySection() {
    return <View></View>;
  }

  renderSecondarySection() {
    return <View></View>;
  }

  shouldRenderSecondary() {
    return false;
  }

  render() {
    return (
      <View style={{ flexDirection: "column" }}>
        {this.renderPrimarySection().map((primaryComponent, index) => {
          return (
            <View style={{ flexDirection: "column" }}>
              {primaryComponent}
              {this.shouldRenderSecondary() &&
              index === this.state.activeIndex ? (
                <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
                  {this.renderSecondarySection()}
                </View>
              ) : null}
            </View>
          );
        })}
      </View>
    );
  }
}

export default BaseExpandableWidget;
//{isChecked && this.renderSecondarySection()}
