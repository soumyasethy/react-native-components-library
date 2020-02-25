import React, { useState, useEffect } from "react";
import ImagePicker from "react-native-image-picker";
import { View, Text, Image, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { COLORS, ButtonCard } from "../index";
import { mS, mVs, s, screenWidth } from "../../widgets/ResponsiveScreen";
import { shadow } from "../../utils/Shadow";
import { AnswereStatusCard } from "../pureComponents/AnswereStatusCard";

export const CameraCard = props => {
  console.warn("Camera props", props);
  const [isLoading, toggleLoader] = useState(false);
  const [imageProps, setImageProps] = useState("");
  useEffect(() => {
    updateImage(props.selected);
  }, []);

  const toggleLoaderX = () => {
    toggleLoader(!isLoading);
  };
  const updateImage = imageProps => {
    if (!updateImage) return;
    setImageProps(imageProps);
  };

  useEffect(() => {
    props.onSelect(imageProps);
  }, [imageProps]);
  return (
    <>
      <AnswereStatusCard
        selected={["current_location"]}
        options={["current_location"]}
        selectLimit={1}
      />
      <View
        style={[
          {
            backgroundColor: COLORS.white,
            padding: mS(16),
            borderRadius: mS(5),
            borderColor: COLORS.blue,
            marginTop: mS(16),
            width: "100%"
          },
          shadow
        ]}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            // padding: mS(16),
            height: screenWidth,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            ...shadow
            // ...BorderRadiusStyle
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.blue} />
          ) : (
            <Text>{JSON.stringify(imageProps)}</Text>
            /*<Image
              source={{ uri: imageProps }}
              // source={{
              //   uri: "data:image/jpeg;base64," + imageProps.fileData
              // }}
              style={{ height: screenWidth, width: "100%" }}
            />*/
          )}
        </View>
        <ButtonCard
          style={{ justifyContent: "center", alignItems: "center" }}
          item={{
            text: imageProps ? "Update Picture" : "Add Picture"
          }}
          addToSelected={async () => {
            chooseImage(updateImage, toggleLoaderX);
          }}
          isSelected={false}
        />
      </View>
    </>
  );
};

const chooseImage = (callback, toggleLoader) => {
  // if (toggleLoader) runOnNewThread(toggleLoader, 0);
  let options = {
    title: "Choose your option",
    customButtons: [
      // { name: "customOptionKey", title: "Choose Photo from Custom Option" }
    ],
    storageOptions: {
      skipBackup: true,
      path: "images"
    }
  };
  ImagePicker.showImagePicker(options, response => {
    console.warn("Response = ", response);

    if (response.didCancel) {
      console.warn("User cancelled image picker");
    } else if (response.error) {
      console.warn("ImagePicker Error: ", response.error);
    } else if (response.customButton) {
      console.warn("User tapped custom button: ", response.customButton);
      alert(response.customButton);
    } else {
      //const source = { uri: response.uri };
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      // alert(JSON.stringify(response));
      //console.warn("response", JSON.stringify(response));
      toggleLoader();
      callback({
        //filePath: response,
        // fileData: response.data
        fileUri: response.uri
      });
    }
  });
};

/*const launchCamera = callback => {
  let options = {
    storageOptions: {
      skipBackup: true,
      path: "images"
    }
  };
  ImagePicker.launchCamera(options, response => {
    console.warn("Response = ", response);

    if (response.didCancel) {
      console.warn("User cancelled image picker");
    } else if (response.error) {
      console.warn("ImagePicker Error: ", response.error);
    } else if (response.customButton) {
      console.warn("User tapped custom button: ", response.customButton);
      alert(response.customButton);
    } else {
      // const source = { uri: response.uri };
      // console.warn("response", JSON.stringify(response));
      callback({
        filePath: response,
        fileData: response.data,
        fileUri: response.uri
      });
    }
  });
};
const launchImageLibrary = callback => {
  let options = {
    storageOptions: {
      skipBackup: true,
      path: "images"
    }
  };
  ImagePicker.launchImageLibrary(options, response => {
    console.warn("Response = ", response);

    if (response.didCancel) {
      console.warn("User cancelled image picker");
    } else if (response.error) {
      console.warn("ImagePicker Error: ", response.error);
    } else if (response.customButton) {
      console.warn("User tapped custom button: ", response.customButton);
      alert(response.customButton);
    } else {
      // const source = { uri: response.uri };
      // console.warn("response", JSON.stringify(response));
      callback({
        filePath: response,
        fileData: response.data,
        fileUri: response.uri
      });
    }
  });
};*/

CameraCard.propTypes = {};
