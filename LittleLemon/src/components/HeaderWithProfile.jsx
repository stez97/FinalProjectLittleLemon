import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState, useContext } from "react";
import { dynamicWidth } from "../constants/metrics";
import { retrieveData, mergeData } from "../storage/storage";
import { UserContext } from "../context/UserContext";
import { useNavigation, useRoute } from "@react-navigation/native";

// Common component for Header of the app.
const HeaderWithProfile = () => {
  const [userInitials, setuserInitials] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [image, setImage] = useState("");
  const navigation = useNavigation();
  const route = useRoute();

  // This is use to fetch data first time the Header is visited!
  useEffect(() => {
    async function fetchPersonalData() {
      const personalData = await retrieveData("Personal_Detail");
      const parsedPersonalData = JSON.parse(personalData);
      setuserInitials(
        parsedPersonalData.firstName[0] + parsedPersonalData.lastName[0]
      );
      setUser(parsedPersonalData);
      console.log("Personal data:", personalData);

      console.log(JSON.stringify(parsedPersonalData.image));
    }
    fetchPersonalData();
  }, []);
  
  // This is use to be called every time the image changes.
  useEffect(() => {
    console.log("Updated initials:", userInitials);
    console.log("Context Variable:", user);
    setImage(user?.image);
  }, [user]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await mergeData(
        "Personal_Detail",
        JSON.stringify({ image: result.assets[0].uri })
      );

      // This is done to update all the instance of useContext.
      setUser({
        ...user,
        image: result.assets[0].uri,
      });

      alert("Profile Picture Updated!");
    }
  };

  const navigateToProfileScreen = () => {
    if (route.name != "Profile") {
      console.log("Navigation State :: " + JSON.stringify(route.name));
      navigation.navigate("Profile");
    } else if (route.name == "Profile") {
      pickImage();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backView}>
        {route.name !== "Home" && (
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image style={styles.image} source={require("../image/back.png")} />
          </Pressable>
        )}
      </View>
          <Pressable
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Image style={styles.headerImg} source={require("../image/logo.png")} />
          </Pressable>
      <Pressable style={styles.profileView} onPress={navigateToProfileScreen}>
        {image || user?.image ? (
          <Image
            source={{ uri: user.image == null ? image : user.image }}
            style={styles.profileImage}
          />
        ) : (
          <Text style={styles.textInitials}>{userInitials}</Text>
        )}
      </Pressable>
    </View>
  );
};

export default HeaderWithProfile;

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: dynamicWidth(1),
    flexDirection: "row",
    backgroundColor: "#DEE2EB",
  },
  headerImg: {
    height: 70,
    width: dynamicWidth(0.7),
    resizeMode: "contain",
    padding: 10,
    backgroundColor: "#DEE2EB",
  },
  backView: {
    height: 40,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  profileView: {
    height: 50,
    width: 50,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    marginLeft: 15,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
    padding: 5,
    marginLeft: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  textInitials: {
    fontSize: 25,
  },
});
