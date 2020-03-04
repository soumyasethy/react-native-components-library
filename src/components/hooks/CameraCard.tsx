import React, { useState, useEffect } from "react";
import ImagePicker from "react-native-image-picker";
import { View, Text, Image, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { COLORS, ButtonCard } from "../index";
import { mS, mVs, s, screenWidth } from "../../widgets/ResponsiveScreen";
import { shadow } from "../../utils/Shadow";
import { AnswereStatusCard } from "../pureComponents/AnswereStatusCard";
import { PermissionsAndroid } from "react-native";

export const CameraCard = props => {
  // console.warn("Camera props", props);
  const [isLoading, toggleLoader] = useState(false);
  const [imageProps, setImageProps] = useState({ uri: "", path: "" });
  useEffect(() => {
    updateImage(props.selected);
  }, []);

  const toggleLoaderX = () => {
    toggleLoader(!isLoading);
  };
  const updateImage = imageProps => {
    console.warn("Updated Image->", imageProps);
    if (!updateImage) return;
    setImageProps(imageProps);
  };

  // useEffect(() => {
  //   props.onSelect(imageProps);
  // }, [imageProps]);

  console.warn("imageProps?.uri", imageProps?.uri);
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
            height: screenWidth * 0.7,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            ...shadow
            // ...BorderRadiusStyle
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.blue} />
          ) : imageProps?.data ? (
            <Image
              // source={{ uri: "data:image/jpeg;base64," + imageProps.data }}
              source={{ uri: imageProps.uri }}
              style={{ height: screenWidth, width: "100%" }}
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
    </>
  );
};
const requestCameraPermission = async (updateImage, toggleLoaderX) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.warn("You can use the camera");
      chooseImage(updateImage, toggleLoaderX);
    } else {
      console.warn("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};
const chooseImage = async (updateImage, toggleLoader) => {
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
    // console.warn("Response = ", response);
    if (response.didCancel) {
      console.warn("User cancelled image picker");
    } else if (response.error) {
      console.warn("ImagePicker Error: ", response.error);
    } else if (response.customButton) {
      console.warn("User tapped custom button: ", response.customButton);
      alert(response.customButton);
    } else {
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      //const source = { uri: response.uri };
      toggleLoader();
      updateImage({
        data: response.data,
        path: response.path,
        uri: response.uri
      });
    }
  });
};

CameraCard.propTypes = {};

//edit user profile
/*export const editUserProfile = (
  sessionId,
  firstName,
  lastName,
  image,
  countryCode,
  phone
) =>
  new Promise((resolve, reject) => {
    var data = new FormData();
    data.append("session_id", sessionId);
    data.append("firstname", firstName);
    data.append("lastname", lastName);
    data.append("image", {
      uri: image,
      name: "userProfile.jpg",
      type: "image/jpg"
    });
    data.append("country_code", countryCode);
    data.append("phone", phone);
    data.append("locale", "en");

    return axios
      .post(base_url + "edit-profile", data)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });*/
