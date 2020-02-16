import React, { useState, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { COLORS } from "../../utils/Colors";
import { OptionCard } from "../pureComponents/OptionCard";
import { mS } from "../../widgets/ResponsiveScreen";

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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: mS(16 * 2)
          }}
        >
          <Text style={{ color: COLORS.grey777 }}>
            {selected.length > 0 ? "Answered" : "Unanswered"}
          </Text>
          <Text style={{ color: COLORS.grey777 }}>
            Selected: {selected.length}/{props.options.length}
          </Text>
        </View>
        <ScrollView
          alwaysBounceVertical={true}
          showsVerticalScrollIndicator={true}
          pagingEnabled={false}
          overScrollMode={"always"}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View
            style={{
              flexGrow: 1,
              flexDirection: "column",
              flexWrap: "wrap",
              alignItems: "flex-start"
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
