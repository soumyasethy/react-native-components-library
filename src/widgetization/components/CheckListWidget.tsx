import React from "react";
import { View, TouchableOpacity } from "react-native";
import BaseExpandableWidget from "../BaseExpandableWidget";

class CheckListWidget extends BaseExpandableWidget {
  constructor(props) {
    super(props);
  }
  state = { activeIndexs: [] };
  updateIndex = (isChecked, index) => {

  };

  renderPrimarySection() {
    return this.props.data.map((item, index) => {
      let isChecked =
        this.state.activeIndexs.filter(item => item === index).length > 0;
      return (
        <View style={{ flexDirection: "column" }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.setState({
                activeIndexs: isChecked ? null : index
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

CheckListWidget.propTypes = {};

export default CheckListWidget;
