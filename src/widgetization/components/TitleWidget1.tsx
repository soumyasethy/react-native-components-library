import React, { Component } from "react";
import { Text } from "react-native";
import { styles } from "./Styles";

const TitleWidget1 = props => {
  return <Text style={styles.titleWidget1}>{props?.data?.text}</Text>;
};

TitleWidget1.propTypes = {};

export default TitleWidget1;
