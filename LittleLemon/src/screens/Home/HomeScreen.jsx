import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import HeaderWithProfile from "../../components/HeaderWithProfile";
import { dynamicHeight, dynamicWidth } from "../../constants/metrics";
import { Ionicons } from "@expo/vector-icons";
import { data } from "../../utils/sampleData";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getMenuData, getSelectedData, insertMenuItems, getSelectedSearchedData } from "../../storage/dbUtils";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [menuData, setMenuData] = useState(null);
  const selectedCategory = useRef("default");
  const [search, searchedData] = useState(null);

  const prefImage =
    "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/refs/heads/main/images/";

  useEffect(() => {
    const fetchData = async () => {
      // ✅ Step 1: Try to load from SQLite
      const localData = await getMenuData();
      console.log(JSON.stringify(localData.length));

      if (localData.length > 0) {
        console.log("📦 Loaded from SQLite:", localData);
        setMenuData(localData);
      } else {
        // ✅ Step 2: If empty, fetch from API
        const response = await axios.get(
          "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
        );
        console.log("🌐 Fetched from API:",JSON.stringify(response.data.menu));

        // ✅ Step 3: Save to SQLite
        await insertMenuItems(response.data.menu);

        // ✅ Step 4: Update UI
        setMenuData(response.data.menu);
      }
    };
    fetchData();
  }, []);

  // Show single List of Flatlist
  const Items = ({ title, price, description, image }) => {
    return (
      <View style={{ flexDirection: "column", margin: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column", width: dynamicWidth(0.6) }}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1 }}
            >
              {title}
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 17,
                fontWeight: "500",
                letterSpacing: 1,
                color: "#485E58",
              }}
            >
              {description}
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 17,
                fontWeight: "800",
                letterSpacing: 1,
                color: "#485E58",
              }}
            >
              {"$" + price}
            </Text>
          </View>
          <View
            style={{
              width: dynamicWidth(0.4),
              padding: 10,
              justifyContent: "center",
            }}
          >
            <Image
              style={{ width: 100, height: 100, borderRadius: 20 }}
              source={{ uri: prefImage + image }}
            />
          </View>
        </View>
        <View
          style={{ marginTop: 10, height: 2, backgroundColor: "#CCCCCC" }}
        />
      </View>
    );
  };

  // Function for calling on Click category!
  const onClickCategory = async (categoryName) => {
    selectedCategory.current = categoryName;
    searchedData("");
    const selectedData = await getSelectedData(categoryName);
    console.log("onClickCategory : "+JSON.stringify(selectedData));
    console.log("onClickCategory length : "+JSON.stringify(selectedData.length));
    if(selectedData.length === 0){
      alert("Nothing here yet. We're adding items to this category soon. Try exploring other categories in the meantime!");
      setMenuData([]);
    }else{
      setMenuData(selectedData);
    }
  }

  // Function is called on the textChange of search bar
  const onClickSearchedData = async (value) => {
    searchedData(value);
    console.log("Searched Value : "+ value);
    if(value.length >= 3){
      console.log("Inside if : ", selectedCategory.current);
      const searchedData = await getSelectedSearchedData(selectedCategory.current,value);
      console.log("Searched Value INSIDE if : "+ JSON.stringify(searchedData));
      setMenuData(searchedData);
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderWithProfile />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}
        style={styles.keyboardView}
      >
        <View style={styles.heroContainer}>
          <Text style={styles.headingText}>Little Lemon</Text>
          <View style={styles.subHeroCantainer}>
            <View style={styles.insideHeroCantainer}>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 25,
                  fontWeight: "500",
                  marginTop: 5,
                }}
              >
              Milano
              </Text>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                  fontWeight: "500",
                  letterSpacing: 1,
                  marginTop: 25,
                }}
              >
                We are a family owned Mediterranean restaurant, focused on
                traditional recipies served with a modern twist.
              </Text>
            </View>
            <View style={styles.heroImageView}>
              <Image
                style={styles.heroImage}
                source={require("../../image/banner.png")}
              />
            </View>
          </View>
          <Pressable
            style={[styles.btnOrderTable, { width: dynamicWidth(0.4) }]}
            onPress={() => navigation.navigate("Order")}
          >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#FFFFFF",
              letterSpacing: 1,
            }}
          >
          Order a Table
          </Text>
          </Pressable>
          <View style={styles.searchView}>
            <Ionicons
              name="search"
              size={25}
              color="#000"
              style={{ paddingLeft: 11, marginTop: 7 }}
            />
            <TextInput
              style={{
                flex: 1,
                paddingLeft: 20,
                paddingRight: 20,
                fontSize: 18,
              }}
              placeholder="Search"
              value={search}
              onChangeText={(value)=>{onClickSearchedData(value)}}
            />
          </View> 
        </View>
        <View>
          <View style={{ height: dynamicHeight(0.5), padding: 20 }}>
            <Text style={{ fontSize: 25, fontWeight: "bold", marginTop: 10 }}>
              ORDER FOR DELIVERY!
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 15,
              }}
            >
              <Pressable style={({pressed}) => [{backgroundColor: pressed ? "#ACE1AF" : "#dae3daff" },{ borderRadius: 10 }]} onPress={() => onClickCategory("starters")}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#485E58",
                    padding: 15,
                  }}
                >
                  Starters
                </Text>
              </Pressable>
              <Pressable style={({pressed}) => [{backgroundColor: pressed ? "#ACE1AF" : "#dae3daff" },{ borderRadius: 10 }]} onPress={() => onClickCategory("mains")}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#485E58",
                    padding: 15,
                  }}
                >
                  Mains
                </Text>
              </Pressable>
              <Pressable style={({pressed}) => [{backgroundColor: pressed ? "#ACE1AF" : "#dae3daff" },{ borderRadius: 10 }]} onPress={() => onClickCategory("desserts")}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#485E58",
                    padding: 15,
                  }}
                >
                  Desserts
                </Text>
              </Pressable>
              <Pressable style={({pressed}) => [{backgroundColor: pressed ? "#ACE1AF" : "#dae3daff" },{ borderRadius: 10 }]} onPress={() => onClickCategory("drinks")}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#485E58",
                    padding: 15,
                  }}
                >
                  Drinks
                </Text>
              </Pressable>
            </View>
            <View
              style={{ marginTop: 25, height: 2, backgroundColor: "#CCCCCC" }}
            />
            <View style={{ flex: 1, marginTop: 15 }}>
              <FlatList
                data={menuData}//{data.menu}
                renderItem={({ item }) => (
                  <Items
                    title={item.name}
                    price={item.price}
                    description={item.description}
                    image={item.image}
                  />
                )}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  heroContainer: {
    backgroundColor: "#485E58",
    height: dynamicHeight(0.35),
    padding: 10,
  },
  subHeroCantainer: {
    flex: 1,
    flexDirection: "row",
    width: dynamicWidth(1),
  },
  insideHeroCantainer: {
    flexDirection: "column",
    width: dynamicWidth(0.65),
  },
  headingText: {
    fontSize: 40,
    color: "#F4CE13",
    fontWeight: "700",
    letterSpacing: 1,
  },
  heroImageView: {
    width: dynamicWidth(0.35),
    height: dynamicHeight(0.2),
    justifyContent: "center",
    borderRadius: 10,
  },
  heroImage: {
    height: dynamicHeight(0.15),
    width: dynamicWidth(0.3),
    borderRadius: 10,
  },
  searchView: {
    flexDirection: "row",
    height: 40,
    width: 180,
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    marginLeft: "auto"
  },
  btnOrderTable: {
    position: "absolute",
    bottom: 10,
    left: 10,
    height: 41,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4CE14"
  }
});
