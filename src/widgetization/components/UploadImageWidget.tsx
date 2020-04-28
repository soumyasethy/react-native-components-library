import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import { registerWidget, widgetMap } from "../widgets";
import { mS, mVs, s } from "../../widgets/ResponsiveScreen";
import { Icons } from "../assets";
import { COLORS } from "../../components";
import ImagePicker from "react-native-image-crop-picker";
import { constants } from "../../constants";

const imageIconHeight = 80;

const UploadImageWidget = props => {
  const [imageArray, addImageToArray] = React.useState([]);
  React.useEffect(() => {
    // console.warn("Image Added...");
    !!props.onSelect && props.onSelect(imageArray, "image");
  }, [imageArray]);

  const openGallery = () => {
    ImagePicker.openPicker({
      multiple: true
      //includeBase64: true
    }).then(images => {
      addImageToArray([...imageArray, ...images]);
    });
  };
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true
      //includeBase64: true
    }).then(image => {
      addImageToArray([...imageArray, image]);
    });
  };
  const confimationWindow = () => {
    Alert.alert(
      "Add Pictures using Camera or Gallery",
      "Please choose",
      [
        {
          text: "Camera",
          onPress: openCamera
        },
        {
          text: "Gallery",
          onPress: openGallery
        },
        {
          text: "Cancel",
          onPress: () => console.log("OK Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };
  const removeImage = removeIndex => {
    let removedImageArray = imageArray.filter(
      (image, index) => index !== removeIndex
    );
    addImageToArray(removedImageArray);
  };
  const UploadButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flexDirection: "row",
          width: "100%",
          height: 60,
          alignItems: "center",
          borderColor: COLORS.grey,
          borderWidth: mS(1),
          paddingHorizontal: mS(16)
        }}
        onPress={confimationWindow}
      >
        <UploadIcon />
        <Text
          style={{ color: COLORS.blue, fontSize: mS(15), marginLeft: mS(8) }}
        >
          Upload Picture
        </Text>
      </TouchableOpacity>
    );
  };
  const UploadIcon = () => {
    return <Icons.Camera height={40} width={40} onPress={confimationWindow} />;
  };
  return (
    <View style={{ flexDirection: "row", marginTop: constants.spacing.large }}>
      {imageArray.map((image, index) => {
        return (
          <View style={{ marginRight: mS(16 * 2) }}>
            <Image
              key={"image" + index.toString()}
              source={{ uri: image.path }}
              style={{
                height: imageIconHeight,
                width: imageIconHeight
              }}
            />
            <Icons.Delete
              height={30}
              width={30}
              style={{
                position: "absolute",
                left: imageIconHeight - 10,
                top: -10
              }}
              onPress={() => removeImage(index)}
            />
          </View>
        );
      })}
      {imageArray.length === 0 && <UploadButton />}
      {imageArray.length > 0 && (
        <View
          style={{
            height: imageIconHeight,
            width: imageIconHeight,
            alignItems: "center",
            borderColor: COLORS.grey,
            borderWidth: mS(1),
            justifyContent: "center"
          }}
        >
          <UploadIcon />
        </View>
      )}
    </View>
  );
};

export default UploadImageWidget; //registerWidget(widgetMap.UPLOAD_IMAGE_WIDGET, ImagePicker);
