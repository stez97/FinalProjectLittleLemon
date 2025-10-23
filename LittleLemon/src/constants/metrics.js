import { Dimensions } from "react-native"
 
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// Common function to set the width of Screen depending on device width.
export const dynamicWidth = (percentage) => {
    return screenWidth * percentage;
}

export const dynamicHeight = (percentage) => {
    return screenHeight * percentage;
}