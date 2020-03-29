import React, { useState, useEffect } from "react";
import ImagePicker from "react-native-image-picker";
import { View, Platform, Image, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { COLORS, ButtonCard } from "../index";
import { mS, mVs, s, screenWidth } from "../../widgets/ResponsiveScreen";
import { shadow } from "../../utils/Shadow";
import { PermissionsAndroid } from "react-native";
import ImagePickerX from "react-native-image-crop-picker";

export const CameraCard = props => {
  const [isLoading, toggleLoader] = useState(false);
  const [imageProps, setImageProps] = useState(
    "https://user-images.githubusercontent.com/2351721/31314483-7611c488-ac0e-11e7-97d1-3cfc1c79610e.png"
  );
  useEffect(() => {
    // ImagePickerX.openPicker({
    //   multiple: true
    // }).then(images => {
    //   console.warn(images);
    // });
    console.warn("Camera selected-->", props.selected);
    props.selected && setImageProps(props.selected);
  }, []);

  const toggleLoaderX = () => {
    toggleLoader(!isLoading);
  };
  const updateImage = imageProps => {
    if (!imageProps) return;
    setImageProps(imageProps);
    props.onSelect(imageProps, "image");
  };

  // useEffect(() => {
  //   console.warn("url-->", imageProps);
  //   props.onSelect(imageProps, "image");
  // }, [imageProps]);

  return (
    <View
      style={[
        {
          backgroundColor: COLORS.white,
          // padding: mS(16),
          borderRadius: mS(5),
          borderColor: COLORS.blue,
          marginTop: mS(16),
          width: "100%"
        }
        // shadow
      ]}
    >
      <View
        style={{
          backgroundColor: COLORS.white,
          // padding: mS(16),
          height: screenWidth * 0.7,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          ...shadow
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.blue} />
        ) : imageProps ? (
          <Image
            source={{ uri: imageProps }}
            style={{ height: "100%", width: "100%" }}
          />
        ) : null}
      </View>
      <ButtonCard
        style={{ justifyContent: "center", alignItems: "center" }}
        item={{
          text: imageProps ? "Update Picture" : "Add Picture"
        }}
        addToSelected={() => {
          requestCameraPermission(updateImage, toggleLoaderX);
        }}
        isSelected={false}
      />
    </View>
  );
};
const requestCameraPermission = async (updateImage, toggleLoaderX) => {
  if (Platform.OS === "ios") {
    await chooseImage(await updateImage, toggleLoaderX);
    return;
  }
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Camera Permission",
        message: "We need your camera access",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.warn("You can use the camera");
      await chooseImage(updateImage, toggleLoaderX);
    } else {
      console.warn("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};
const chooseImage = (updateImage, toggleLoader) => {
  let options = {
    noData: true
  };
  ImagePicker.showImagePicker(options, response => {
    console.warn("Response = ", response);
    if (response.didCancel) {
      console.warn("User cancelled image picker");
    } else if (response.error) {
      console.warn("ImagePicker Error: ", response.error);
    } else {
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      //const source = { uri: response.uri };
      // await toggleLoader();
      updateImage(response.uri);
    }
  });
};

CameraCard.propTypes = {};
