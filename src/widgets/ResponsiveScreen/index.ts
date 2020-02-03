// packages
import { Dimensions, PixelRatio } from "react-native";

// Retrieve initial screen's width
let screenWidth = Dimensions.get("window").width;

// Retrieve initial screen's height
let screenHeight = Dimensions.get("window").height;

/**
 * Converts provided width percentage to independent pixel (dp).
 * @param  {string} widthPercent The percentage of screen's width that UI element should cover
 *                               along with the percentage symbol (%).
 * @return {number}              The calculated dp depending on current device's screen width.
 */
const widthPercentageToDP = (widthPercent: string) => {
  // Parse string percentage input and convert it to number.
  const elemWidth =
    typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

/**
 * Converts provided height percentage to independent pixel (dp).
 * @param  {string} heightPercent The percentage of screen's height that UI element should cover
 *                                along with the percentage symbol (%).
 * @return {number}               The calculated dp depending on current device's screen height.
 */
const heightPercentageToDP = (heightPercent: string) => {
  // Parse string percentage input and convert it to number.
  const elemHeight =
    typeof heightPercent === "number"
      ? heightPercent
      : parseFloat(heightPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

/**
 * Event listener function that detects orientation change (every time it occurs) and triggers
 * screen rerendering. It does that, by changing the state of the screen where the function is
 * called. State changing occurs for a new state variable with the name 'orientation' that will
 * always hold the current value of the orientation after the 1st orientation change.
 * Invoke it inside the screen's constructor or in componentDidMount lifecycle method.
 * @param {object} that Screen's class component this variable. The function needs it to
 *                      invoke setState method and trigger screen rerender (this.setState()).
 */
interface Iobj {
  [keyname: string]: any;
}
interface IlistenOrientationChange {
  setState: (obj: Iobj) => {};
  [keyname: string]: any;
}
const listenOrientationChange = (that: IlistenOrientationChange) => {
  Dimensions.addEventListener("change", newDimensions => {
    // Retrieve and save new dimensions
    screenWidth = newDimensions.window.width;
    screenHeight = newDimensions.window.height;

    // Trigger screen's rerender with a state update of the orientation variable
    that.setState({
      orientation: screenWidth < screenHeight ? "portrait" : "landscape"
    });
  });
};

/**
 * Wrapper function that removes orientation change listener and should be invoked in
 * componentWillUnmount lifecycle method of every class component (UI screen) that
 * listenOrientationChange function has been invoked. This should be done in order to
 * avoid adding new listeners every time the same component is re-mounted.
 */
const removeOrientationListener = () => {
  Dimensions.removeEventListener("change", () => {});
};
// for font sizes.
// util to convert height width according to screen size.
// for margin padding border image height width values
type ArgumentfromDpToPx = string;
// const guideLineBaseWidth = 375
// const guideLineBaseHeight = 667
const fromDpToPx = (dp: ArgumentfromDpToPx): number => {
  if (!dp) return 0;
  const num = parseFloat(dp);
  return PixelRatio.getPixelSizeForLayoutSize(num);
};

const { width, height } = Dimensions.get("window");
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375; // base design screen width
const guidelineBaseHeight = 667; // base design screen height
/**
 * Used for horizontal scaling
 */
const scale = (size: number) => {
  return PixelRatio.roundToNearestPixel(
    (shortDimension / guidelineBaseWidth) * size
  );
};
/**
 * Used for vertical scaling
 */
const verticalScale = (size: number) =>
  PixelRatio.roundToNearestPixel((longDimension / guidelineBaseHeight) * size);

const moderateVerticalScale = (size: number, factor = 0.5) =>
  PixelRatio.roundToNearestPixel(size + (verticalScale(size) - size) * factor);

/**
 * Used for moderate scaling, dont know when to use this
 */
const moderateScale = (size: number, factor = 0.5) =>
  PixelRatio.roundToNearestPixel(size + (scale(size) - size) * factor);

/*
 *   mS-marginal Scale, used for radius.
 *   mVs-marginal Vertical scale, Used for verticals(height).
 *   s-scale, used for horizontal(width)
 */
export {
  widthPercentageToDP as wP,
  heightPercentageToDP as hP,
  listenOrientationChange as loc,
  removeOrientationListener as rol,
  fromDpToPx as fTp,
  scale as s,
  verticalScale as vS,
  moderateScale as mS,
  moderateVerticalScale as mVs,
  screenWidth,
  screenHeight
};
