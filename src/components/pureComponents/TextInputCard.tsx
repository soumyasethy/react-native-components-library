import React, { useState, useEffect } from "react";
import {
  TextField,
  FilledTextField,
  OutlinedTextField
} from "./InputComponent";
import { View } from "react-native";
import { mS, screenWidth } from "../../widgets/ResponsiveScreen";
import { shadow } from "../../utils/Shadow";
import { COLORS } from "../index";
import { AnswereStatusCard } from "./AnswereStatusCard";

export const TextInputCard = props => {
  const [text, setText] = useState("");

  const fieldRef = React.createRef();

  const onChangeText = changeText => {
    setText(changeText ? text + changeText : changeText);
  };

  useEffect(() => {
    fieldRef.current.focus();
  }, []);

  return (
    <View style={{ width: "100%" }}>
      <AnswereStatusCard
        selected={!!text ? ["text"] : []}
        options={["text"]}
        selectLimit={0}
      />
      <View
        style={{
          marginTop: mS(16),
          padding: mS(16),
          backgroundColor: COLORS.white,
          ...shadow
        }}
      >
        <OutlinedTextField
          label={"Answer"}
          onChangeText={text => onChangeText(text)}
          multiline={true}
          onSubmitEditing={() => {
            console.warn("submitted");
          }}
          fontSize={22}
          ref={fieldRef}
          returnKeyType="done"
        />
      </View>
    </View>
  );
};
