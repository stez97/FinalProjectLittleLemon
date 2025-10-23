import { StyleSheet, Text, View, TextInput } from "react-native";
import { dynamicWidth } from "../../../constants/metrics";

const OnboardingPage3 = ({value,onChangeText}) => {
  return (
    <View style={styles.subContainer}>
      <Text style={styles.textFirstName}>Email</Text>
      <TextInput
        style={styles.textInputStyle}
        placeholder="Enter your Email ID"
        value={value} 
        onChangeText={(text) => onChangeText(text)}
      />
    </View>
  );
};

export default OnboardingPage3;

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    alignContent: "center",
    height: 100,
  },
  textFirstName: {
    color: "#495F57",
    fontSize: 20,
    fontWeight: "900",
    alignSelf: "center",
  },
  textInputStyle: {
    marginTop: 25,
    marginHorizontal: 20,
    height: 60,
    alignSelf: "center",
    fontSize: 20,
    backgroundColor: "#EEEEEE",
    width: dynamicWidth(0.9),
    borderRadius: 10,
    paddingLeft: 15,
  },
});
