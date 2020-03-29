import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  ActivityIndicator,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Keyboard,
  Platform
} from "react-native";
import ScrollPickLib from "./ScrollPickLib";
import fonts from "../../../constants/fonts";
import { spacing } from "../../../constants/spacing";
import { ButtonCard } from "../ButtonCard";
import { COLORS } from "../../..";
const { height } = Dimensions.get("window");
const heightScrollView = height * 0.2 - 20;

class ScrollPick extends PureComponent {
  state = {
    text: "",
    selected: this.props.arrayData[0],
    selectedIndex: 0,
    showSubmitBtn: true
  };

  resetSearch = () => {
    this.setState({
      text: "",
      selectedIndex: 0,
      selected: this.props.arrayData[0]
    });
    this.props?.onTextChange("");
  };
  updateSearchKeyword = text => {
    // console.warn("updateSearchKeyword", text);
    this.setState({ text });
    this.props?.onTextChange(text);
  };
  updateSelected = ({ selected, selectedIndex }) => {
    this.setState({ selected, selectedIndex });
  };
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow.bind(this)
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide.bind(this)
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    if (this.state.showSubmitBtn) this.setState({ showSubmitBtn: false });
  }

  _keyboardDidHide() {
    if (!this.state.showSubmitBtn) this.setState({ showSubmitBtn: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          {...this.props}
          {...this.state}
          updateSearchKeyword={this.updateSearchKeyword}
          resetSearch={this.resetSearch.bind(this)}
        />

        <Body
          {...this.props}
          arrayData={this.props.arrayData}
          text={this.state.text}
          selectedIndex={this.state.selectedIndex}
          updateSelected={this.updateSelected}
          resetSearch={this.resetSearch.bind(this)}
        />
        {this.state.showSubmitBtn && (
          <Footer
            {...this.props}
            text={this.state.text}
            selectedIndex={this.state.selectedIndex}
            selected={this.state.selected}
            resetSearch={this.resetSearch.bind(this)}
          />
        )}
      </View>
    );
  }
}

const AddToList = props => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 30
      }}
    >
      <Text style={{ fontSize: fonts.size.medium, paddingVertical: 10 }}>
        No Result found for "{props.text}"
      </Text>
      <TouchableOpacity
        onPress={() => {
          props.resetSearch();
          props.onPressAddSource(props.text);
        }}
      >
        <Text
          style={{
            color: COLORS.blue,
            fontSize: fonts.size.medium,
            fontWeight: "700"
          }}
        >
          + Add this {props.text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const Body = props => {
  return (
    <View
      style={[
        styles.body,
        {
          height: !!props.filter ? "70%" : "40%"
        }
      ]}
    >
      {props?.isLoading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={COLORS.blue} />
          <Text>Please wait...</Text>
        </View>
      )}
      {false &&
        props.filter &&
        props.arrayData.filter(data =>
          data.toUpperCase().includes(props.text.toUpperCase())
        ).length === 0 && <AddToList {...props} />}
      {!!props.arrayData && (
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            backgroundColor: "white"
          }}
        >
          <ScrollPickLib
            dataSource={props.arrayData.filter(data =>
              data.toUpperCase().includes(props.text.toUpperCase())
            )}
            selectedIndex={props.selectedIndex}
            onValueChange={(data, selectedIndex) => {
              props.updateSelected({ selected: data, selectedIndex });
            }}
            wrapperHeight={heightScrollView}
            itemHeight={60}
            highlightBorderWidth={1}
            filter={!!props.filter}
            onScrollEndDrag={props?.onScrollEndDrag}
            onMomentumScrollEnd={props?.onMomentumScrollEnd}
          />
        </View>
      )}
    </View>
  );
};
const Header = props => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={props.onRequestClose}
      style={[styles.headerWrapper, { height: !!props.filter ? "30%" : "60%" }]}
    >
      <View style={styles.header}>
        {!!props.title && <Text style={styles.heading}>{props.title}</Text>}
        {!!props.subTitle && (
          <Text style={styles.description}>{props.subTitle}</Text>
        )}
        {!!props.filter && (
          <TextInput
            clearButtonMode="always"
            placeholderTextColor={"#7a7a7a"}
            placeholder={props.placeholder || ""}
            keyboardType={
              Platform.OS === "android" ? "email-address" : "ascii-capable"
            }
            contextMenuHidden={true}
            maxLength={64}
            style={styles.textInput}
            onChangeText={props.updateSearchKeyword}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
const Footer = props => (
  <View style={styles.footerWrapper}>
    <View style={styles.footer}>
      <ButtonCard
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginBottom: 8
        }}
        item={{
          text: "Confirm"
        }}
        addToSelected={() => {
          let selected = {
            selected: props.selected,
            selectedIndex: props.selectedIndex
          };
          !!props.onSubmit && props.onSubmit(selected);
          if (props.text) {
            props.resetSearch();
          }
        }}
        isSelected={true}
      />
    </View>
  </View>
);

ScrollPick.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string
};

export default ScrollPick;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  heading: {
    //fontWeight: fonts.weight.bold,
    fontSize: fonts.size.large,
    color: COLORS.blackdark,
    paddingVertical: spacing.small
  },
  description: {
    fontSize: fonts.size.medium,
    paddingVertical: spacing.small
  },
  footerWrapper: {
    height: 2 * spacing.xxxlarge + spacing.default,
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.xlarge,
    backgroundColor: "white"
  },
  header: {
    flexDirection: "column",
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  headerWrapper: { width: "100%", justifyContent: "flex-end" },
  footer: {
    height: 2 * spacing.xxxlarge,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.large
  },
  textInput: {
    borderRadius: 4,
    backgroundColor: "#eeeeee",
    paddingLeft: spacing.medium,
    paddingRight: 30,
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    height: 44
  },
  body: {
    backgroundColor: "white",
    width: "100%"
  },
  scrollPickerWrapper: {
    flex: 1,
    paddingHorizontal: spacing.default,
    backgroundColor: "white"
  }
});
