import React, { useState, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { COLORS } from "../../utils/Colors";
import { OptionCard } from "../pureComponents/OptionCard";
import { mS, screenHeight, screenWidth } from "../../widgets/ResponsiveScreen";
import { AnswereStatusCard } from "./AnswereStatusCard";

export const OptionPicker = props => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (selected.length === 0 && props.selected && props.selected.length > 0) {
      setSelected(props.selected);
    }
  }, []);

  useEffect(() => {
    //Updated Selected List->
    props.onSelect(selected);
  }, [props.selected, selected, props.options]);

  const addToSelected = item => {
    let limitCheck = checkLimit(selected, props.selectLimit);

    let ifExists = find(selected, item);
    if (limitCheck && !ifExists) {
      setSelected([...selected, item]);
    } else {
      let selectedNew = selected.filter(itemX => itemX != item);
      setSelected(selectedNew);
    }
  };

  if (!!props.options) {
    return (
      <>
        <AnswereStatusCard
          selected={selected}
          options={props.options}
          selectLimit={props.selectLimit}
        />
        <ScrollView
          alwaysBounceVertical={true}
          showsVerticalScrollIndicator={false}
          pagingEnabled={true}
          overScrollMode={"always"}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View
            style={{
              flexGrow: 1,
              flexDirection: "column",
              flexWrap: "wrap",
              alignItems: "flex-start",
              // backgroundColor: "red"
              // justifyContent: "flex-start"
            }}
          >
            {props.options.map((item, index) => {
              let ifExists = find(selected, item);
              return (
                <OptionCard
                  item={item}
                  addToSelected={addToSelected}
                  isSelected={!!ifExists}
                />
              );
            })}
            <View
              style={{
                height: mS(screenHeight * 0.1),
                width: screenWidth
              }}
            ></View>
          </View>
        </ScrollView>
      </>
    );
  }
};
const find = (arr, searchItem) => {
  return arr.find((item, index) => {
    return item === searchItem;
  });
};
const checkLimit = (arr, limit) => {
  if (limit === 0) return true;
  if (!limit) return false;

  return arr && limit && arr.length < limit;
};
