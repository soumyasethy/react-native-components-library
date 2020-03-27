import React from "react";
import styled from "styled-components";
import { View, Text, ScrollView, Dimensions, Platform } from "react-native";
import PropTypes from "prop-types";
import { spacing } from "../../../constants/spacing";
import { COLORS } from "../../..";

export const HighLightView = styled.View`
  position: absolute;
  height: ${props => props.itemHeight};
  width: ${props => props.highlightWidth};
  border-top-color: ${props => props.highlightColor};
  border-bottom-color: ${props => props.highlightColor};
  border-top-width: ${props => props.highlightBorderWidth}px;
  border-bottom-width: ${props => props.highlightBorderWidth}px;
`;
export const SelectedItem = styled.View`
  width: 100%;
  height: 30px;
  justify-content: center;
  align-items: center;
  height: ${props => props.itemHeight};
`;
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const wrapperHeight = deviceHeight * 0.5;

export default class ScrollPickLib extends React.Component {
  constructor() {
    super();
    this.onMomentumScrollBegin = this.onMomentumScrollBegin.bind(this);
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
    this.onScrollBeginDrag = this.onScrollBeginDrag.bind(this);
    this.onScrollEndDrag = this.onScrollEndDrag.bind(this);
    this.state = {
      selectedIndex: 0
    };
  }

  componentDidMount() {
    if (this.props.selectedIndex) {
      this.scrollToIndex(this.props.selectedIndex);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    let toIndex = this.props.dataSource.length - 1;
    if (
      prevState.selectedIndex !== this.state.selectedIndex &&
      this.state.selectedIndex >= this.props.dataSource.length
    ) {
      if (this.props.onValueChange) {
        const selectedValue = this.props.dataSource[toIndex];
        this.props.onValueChange(selectedValue, toIndex);
        this.scrollToIndex(toIndex);
      }
    }
    if (
      this.props.dataSource.length > 0 &&
      this.props.dataSource.length !== prevProps.dataSource.length
    ) {
      const selectedValue = this.props.dataSource[0];

      this.props.onValueChange(selectedValue, 0);
      this.scrollToIndex(0);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const { header, footer } = this.renderPlaceHolder(!!this.props.filter);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          width: "100%"
        }}
      >
        {this.props.dataSource.length !== 0 && (
          <HighLightView
            highlightColor={COLORS.blue}
            highlightWidth={this.props.highlightWidth}
            wrapperHeight={wrapperHeight}
            itemHeight={this.props.itemHeight}
            highlightBorderWidth={this.props.highlightBorderWidth}
            style={{
              top: !!this.props.filter
                ? wrapperHeight / 2
                : wrapperHeight / 4 - spacing.medium
            }}
          />
        )}
        <ScrollView
          ref={sview => {
            this.sview = sview;
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}
          onTouchStart={this.props.onTouchStart}
          onMomentumScrollBegin={this.onMomentumScrollBegin}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          onScrollBeginDrag={this.onScrollBeginDrag}
          onScrollEndDrag={this.onScrollEndDrag}
        >
          {header}
          {this.props.dataSource.map(this.renderItem.bind(this))}
          <View style={{ height: wrapperHeight }}></View>
        </ScrollView>
      </View>
    );
  }

  renderPlaceHolder(isFilterReq) {
    const height = isFilterReq
      ? wrapperHeight / 2
      : wrapperHeight / 4 - spacing.medium;
    const header = <View style={{ height, flex: 1 }}></View>;
    const footer = <View style={{ height, flex: 1 }}></View>;
    return { header, footer };
  }

  renderItem(data, index) {
    if (!data) return;
    const isSelected = index === this.state.selectedIndex;
    const item = (
      <Text
        onPress={() => {
          this.scrollToIndex(index);
          // onValueChange
          if (this.props.onValueChange) {
            const selectedValue = this.props.dataSource[index];
            this.props.onValueChange(selectedValue, index);
          }
        }}
        style={
          isSelected ? this.props.activeItemTextStyle : this.props.itemTextStyle
        }
      >
        {data}
      </Text>
    );

    return (
      <SelectedItem key={index} itemHeight={this.props.itemHeight}>
        {item}
      </SelectedItem>
    );
  }

  scrollFix(e) {
    let verticalY = 0;
    const h = this.props.itemHeight;
    if (e.nativeEvent.contentOffset) {
      verticalY = e.nativeEvent.contentOffset.y;
    }
    const selectedIndex = Math.round(verticalY / h);
    const verticalElem = selectedIndex * h;
    if (verticalElem !== verticalY) {
      // using scrollTo in ios, onMomentumScrollEnd will be invoked
      if (Platform.OS === "ios") {
        this.isScrollTo = true;
      }
      if (this.sview) {
        this.sview.scrollTo({ y: verticalElem });
      }
    }
    if (this.state.selectedIndex === selectedIndex) {
      return;
    }
    this.setState({
      selectedIndex
    });
    // onValueChange
    if (this.props.onValueChange) {
      const selectedValue = this.props.dataSource[selectedIndex];
      this.props.onValueChange(selectedValue, selectedIndex);
    }
  }

  onScrollBeginDrag() {
    this.dragStarted = true;
    if (Platform.OS === "ios") {
      this.isScrollTo = false;
    }
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  onScrollEndDrag(e) {
    this.props.onScrollEndDrag();
    this.dragStarted = false;
    // if not used, event will be garbaged
    const element = {
      nativeEvent: {
        contentOffset: {
          y: e.nativeEvent.contentOffset.y
        }
      }
    };
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      if (!this.momentumStarted && !this.dragStarted) {
        this.scrollFix(element, "timeout");
      }
    }, 10);
  }

  onMomentumScrollBegin() {
    this.momentumStarted = true;
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  onMomentumScrollEnd(e) {
    this.props.onMomentumScrollEnd();
    this.momentumStarted = false;
    if (!this.isScrollTo && !this.momentumStarted && !this.dragStarted) {
      this.scrollFix(e);
    }
  }

  scrollToIndex(ind) {
    this.setState({
      selectedIndex: ind
    });
    const y = this.props.itemHeight * ind;
    setTimeout(() => {
      if (this.sview) {
        this.sview.scrollTo({ y });
      }
    }, 0);
  }
}
ScrollPickLib.propTypes = {
  style: PropTypes.object,
  dataSource: PropTypes.array,
  selectedIndex: PropTypes.number,
  onValueChange: PropTypes.func,
  renderItem: PropTypes.func,
  highlightColor: PropTypes.string,
  itemHeight: PropTypes.number,
  wrapperBackground: PropTypes.string,
  wrapperWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  wrapperHeight: PropTypes.number,
  highlightWidth: PropTypes.number,
  highlightBorderWidth: PropTypes.number,
  itemTextStyle: PropTypes.object,
  activeItemTextStyle: PropTypes.object,
  onMomentumScrollEnd: PropTypes.func,
  onScrollEndDrag: PropTypes.func
};
ScrollPickLib.defaultProps = {
  dataSource: [],
  itemHeight: 5 * spacing.medium,
  wrapperBackground: "#FFFFFF",
  wrapperHeight: wrapperHeight / 2,
  wrapperWidth: "100%",
  highlightWidth: deviceWidth - spacing.medium * 3,
  highlightBorderWidth: 2,
  highlightColor: "#333",
  onMomentumScrollEnd: () => {},
  onScrollEndDrag: () => {},
  itemTextStyle: {
    fontSize: 15,
    textAlign: "center",
    color: "#B4B4B4"
  },
  activeItemTextStyle: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    color: COLORS.blue
  }
};
