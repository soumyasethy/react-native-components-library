import React from "react";
import { View, TouchableOpacity } from "react-native";
import BaseExpandableWidget from "../BaseExpandableWidget";

class RadioListWidget extends BaseExpandableWidget {
  constructor(props) {
    super(props);
  }
  state = { activeIndex: null };

  renderPrimarySection() {
    return this.props.data.map((item, index) => {
      let isChecked = this.state.activeIndex === index;
      return (
        <View style={{ flexDirection: "column" }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.setState({
                activeIndex: isChecked ? null : index
              });
            }}
          >
            {super.renderWidget(item.widgetType, {
              ...item,
              isChecked
            })}
          </TouchableOpacity>
        </View>
      );
    });
  }

  shouldRenderSecondary() {
    let filteredArray = this.props.data[this.state.activeIndex];
    let data = filteredArray?.data?.data;
    return !!data;
  }
  renderSecondarySection() {
    let filteredArray = this.props.data[this.state.activeIndex];
    let data = filteredArray?.data?.data;

    if (data.length > 0)
      return data.map((item, index) => {
        return (
          <TouchableOpacity
            activeOpacity={1}
            style={{ height: 50, marginBottom: 16 }}
            onPress={() => {
              console.warn("item****", item);
            }}
          >
            {super.renderWidget(item.widgetType, item)}
          </TouchableOpacity>
        );
      });
  }
}

RadioListWidget.propTypes = {};

export default RadioListWidget;
