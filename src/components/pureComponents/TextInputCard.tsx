import React, { useState, useEffect } from "react";
import {
  TextField,
  FilledTextField,
  OutlinedTextField
} from "./InputComponent";
import {
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  StyleSheet,
  Keyboard
} from "react-native";
import { mS, screenWidth } from "../../widgets/ResponsiveScreen";
import { shadow } from "../../utils/Shadow";
import { COLORS } from "../../utils/Colors";
import { AnswereStatusCard } from "./AnswereStatusCard";
import { DismissKeyboardView } from "../hoc/DismissKeyboardHOC";

export const TextInputCard = props => {
  const [text, setText] = useState(props.selected);

  const fieldRef = React.createRef();

  const onChangeText = changeText => {
    setText(changeText);
    props.onSelect(changeText);
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
          value={text}
          onChangeText={text => onChangeText(text)}
          multiline={false}
          onSubmitEditing={() => {
            console.warn("submitted");
            Keyboard.dismiss();
          }}
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
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: mS(16),
    backgroundColor: COLORS.white,
    ...shadow
  }
});

let styles = {
  scroll: {
    backgroundColor: COLORS.white
  },

  container: {
    margin: 8,
    marginTop: Platform.select({ ios: 8, android: 32 }),
    flex: 1
  },

  contentContainer: {
    padding: 8
  },

  buttonContainer: {
    paddingTop: 8,
    margin: 8
  },

  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.white
  }
};
