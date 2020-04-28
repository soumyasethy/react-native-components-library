import React from "react";
import { View, ScrollView } from "react-native";
import { TagWidgetItem } from "./TagWidgetItem";

const TagWidget = (props: any) => {
  const [selectedTags, setSeletedTags] = React.useState([]);

  const add = (updateTag: string) => {
    const found = selectedTags.some(tag => tag === updateTag);
    if (!found) {
      setSeletedTags([...selectedTags, updateTag]);
    } else {
      let removed = selectedTags.filter(tag => tag !== updateTag);
      setSeletedTags(removed);
    }
  };
  const updateTags = (updateTag: string) => {
    add(updateTag);
  };
  const isSelected = (item: string) => {
    return (
      !!selectedTags &&
      selectedTags.find((hashtag: string) => {
        return hashtag === item;
      })
    );
  };
  React.useEffect(() => {
    props?.data?.onSelectTags(selectedTags);
  }, [selectedTags]);

  return (
    <ScrollView style={{ flexGrow: 1 }}>
      <View
        style={{
          flexGrow: 1,
          paddingVertical: 10,
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "flex-start"
        }}
      >
        {Array.isArray(props?.data?.hashtags) &&
          props?.data?.hashtags.map((hastag, index) => {
            return (
              <TagWidgetItem
                key={index.toString()}
                isSelected={isSelected(hastag)}
                hastag={hastag}
                onPress={updateTags}
              />
            );
          })}
      </View>
    </ScrollView>
  );
};

export default TagWidget;
