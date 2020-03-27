import React from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { mS, screenWidth } from "../../widgets/ResponsiveScreen";
import { BorderRadiusStyle, ButtonCard, COLORS, shadow } from "../index";

export const SurveyCard = props => {
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {!!props &&
          props?.data?.map((item, index) => {
            return (
              <View
                style={{
                  width: "95%",
                  justifyContent: "center",
                  padding: mS(16),
                  margin:mS(8),
                  backgroundColor: COLORS.white,
                  ...shadow,
                  ...BorderRadiusStyle
                }}
              >
                <Text style={{ fontSize: mS(20), fontWeight: "500" }}>
                  {item.topic}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: mS(8),
                    marginBottom: mS(16)
                  }}
                >
                  <Text style={{ color: COLORS.grey777 }}>
                    {item.questions_count} questions
                  </Text>
                  <View
                    style={{
                      width: mS(4),
                      height: mS(4),
                      borderRadius: 150 / 2,
                      backgroundColor: COLORS.grey777,
                      marginHorizontal: mS(8)
                    }}
                  ></View>
                  <Text style={{ color: COLORS.grey777 }}>
                    v{item.question_version}.0
                  </Text>
                </View>

                <Text style={{ color: COLORS.cyan }}>Not Started</Text>
                <ButtonCard
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%"
                  }}
                  item={{ text: props.isUpdate ? "Review" : "Collect" }}
                  addToSelected={() => {
                    props.onCollect(item, index);
                  }}
                  isSelected={true}
                />
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    padding: mS(8)
  },
  text: {
    fontSize: 42
  }
});
