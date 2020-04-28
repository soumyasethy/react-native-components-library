import React, { Component } from "react";
import { Text } from "react-native";
import { styles } from "./Styles";

const TitleWidget2 = props => {
  return <Text style={styles.titleWidget2}>{props?.data?.text}</Text>;
};

TitleWidget2.propTypes = {};

export default TitleWidget2;
