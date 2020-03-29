import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { ButtonCard } from "./ButtonCard";
import { mS, screenHeight } from "../../widgets/ResponsiveScreen";
import { AnswereStatusCard } from "./AnswereStatusCard";
import { TextInputCard } from "./TextInputCard";

export const SingleMultipleChoiceCard = props => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (selected.length === 0 && props.selected && props.selected.length > 0) {
      setSelected(props.selected);
    }
  }, []);

  useEffect(() => {
    props.onSelect(selected);
  }, [selected, props.options]);

  const addToSelected = item => {
    if (item?.text !== item?.value) {
      setSelected([item]);
      return;
    }
    let limitCheck = checkLimit(selected, props.selectLimit);
    let ifExists = find(selected, item);
    if (props.selectLimit === 1 && !limitCheck && !ifExists) {
      setSelected([item]);
      return;
    }
    if (props.selectLimit === 1 && !limitCheck && !!ifExists) {
      setSelected([]);
      return;
    }
    if (limitCheck && !ifExists) {
      setSelected([...selected, item]);
    } else {
      let selectedNew = selected.filter(itemX => itemX != item);
      setSelected(selectedNew);
    }
  };

  if (!!props.options) {
    return (
      <View
        style={{
          flexGrow: 1,
          padding: 10,
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "flex-start"
        }}
      >
        {props.options.map((item, index) => {
          let ifExists = find(selected, item);
          return (
            <ButtonCard
              item={item}
              addToSelected={addToSelected}
              isSelected={!!ifExists}
              selected={props.selected}
            />
          );
        })}
        <View
          style={{
            height: mS(screenHeight * 0.1)
          }}
        ></View>
      </View>
    );
  }
};
const find = (arr, searchItem) => {
  try {
    return arr.find((item, index) => {
      return item?.text === searchItem?.text;
    });
  } catch (e) {
    console.warn("Error", searchItem, arr, e.message);
    return false;
  }
};
const checkLimit = (arr, limit) => {
  if (limit === 0) return true;
  if (!limit) return false;

  return arr && limit && arr.length < limit;
};
