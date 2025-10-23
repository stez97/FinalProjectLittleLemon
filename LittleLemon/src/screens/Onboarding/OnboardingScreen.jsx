import {
  StyleSheet,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import Header from "../../components/Header";
import OnboardingPage1 from "./Components/OnboardingPage1";
import OnboardingPage2 from "./Components/OnboardingPage2";
import OnboardingPage3 from "./Components/OnboardingPage3";
import { useState } from "react";
import { isEmpty } from "../../utils/validation";
import { saveData } from "../../storage/storage";
import { useNavigation } from "@react-navigation/native";
import { dynamicWidth } from "../../constants/metrics";

const OnboardingScreen = () => {
  const [currentComp, setCurrentComp] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const showNextComponent = () => {
    if (isEmpty(firstName) && currentComp === 1) {
      alert("Please enter a valid First Name");
    } else if (isEmpty(lastName) && currentComp === 2) {
      alert("Please enter a valid Last Name");
    } else if (isEmpty(email) && currentComp === 3) {
      alert("Please enter a valid Email");
    } else {
      if (currentComp !== 3) {
        setCurrentComp(currentComp + 1);
      } else if (currentComp === 3) {
        saveData(
          "Personal_Detail",
          JSON.stringify({ firstName, lastName, email })
        );
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      }
    }
  };

  const showPreviousComp = () => {
    if (currentComp !== 1) {
      setCurrentComp(currentComp - 1);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        style={styles.container}
      >
        <Header />
        <Text style={styles.textHeading}>Lets us get to know you</Text>
        {currentComp === 1 && (
          <OnboardingPage1 value={firstName} onChangeText={setFirstName} />
        )}
        {currentComp === 2 && (
          <OnboardingPage2 value={lastName} onChangeText={setLastName} />
        )}
        {currentComp === 3 && (
          <OnboardingPage3 value={email} onChangeText={setEmail} />
        )}
        <View style={styles.circleContainer}>
          <View
            style={[
              styles.circleBg,
              { backgroundColor: currentComp === 1 ? "#F3CE13" : "#67778B" },
            ]}
          ></View>
          <View
            style={[
              styles.circleBg,
              { backgroundColor: currentComp === 2 ? "#F3CE13" : "#67778B" },
            ]}
          ></View>
          <View
            style={[
              styles.circleBg,
              { backgroundColor: currentComp === 3 ? "#F3CE13" : "#67778B" },
            ]}
          ></View>
        </View>
        <View style={styles.btnView}>
          {currentComp !== 1 && (
            <Pressable
              style={[styles.button, { width: dynamicWidth(0.43) }]}
              onPress={showPreviousComp}
            >
              <Text style={styles.btnText}>Back</Text>
            </Pressable>
          )}
          <Pressable
            style={[
              styles.button,
              {
                width:
                  currentComp === 1 ? dynamicWidth(0.9) : dynamicWidth(0.43),
              },
            ]}
            onPress={showNextComponent}
          >
            <Text style={styles.btnText}>
              {currentComp !== 3 ? "Next" : "Submit"}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  textHeading: {
    marginTop: 40,
    color: "#495F57",
    fontSize: 20,
    fontWeight: "700",
    alignSelf: "center",
  },
  centerWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circleContainer: {
    alignSelf: "center",
    flexDirection: "row",
  },
  circleBg: {
    height: 25,
    width: 25,
    borderRadius: 25,
    margin: 10,
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    height: 55,
  },
  button: {
    backgroundColor: "#F4CD14",
    justifyContent: "center",
    margin: 5,
    borderRadius: 10,
  },
  btnText: {
    color: "#000000",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default OnboardingScreen;
