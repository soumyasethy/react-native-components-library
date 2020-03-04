import React, { useState, useEffect } from "react";
import { OutlinedTextField } from "./InputComponent";
import { View, Keyboard } from "react-native";
import { mS } from "../../widgets/ResponsiveScreen";
import { shadow } from "../../utils/Shadow";
import { COLORS } from "../../utils/Colors";
import { AnswereStatusCard } from "./AnswereStatusCard";

export const TextInputCard = props => {
  const [text, setText] = useState(props.selected || "");

  const fieldRef = React.createRef();

  const onChangeText = changeText => {
    setText(changeText);
    props.onSelect(changeText);
  };

  // useEffect(() => {
  //   fieldRef.current.focus();
  // }, []);

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
          padding: mS(8),
          backgroundColor: COLORS.white,
          ...shadow
        }}
      >
        <OutlinedTextField
          label={"Answer"}
          value={text.trim()}
          onChangeText={onChangeText}
          multiline={true}
          onSubmitEditing={Keyboard.dismiss}
          fontSize={22}
          ref={fieldRef}
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          title="Write your answer"
          returnKeyType="done"
        />
      </View>
    </View>
  );
};
