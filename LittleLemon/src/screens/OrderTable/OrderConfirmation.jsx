import { SafeAreaView, KeyboardAvoidingView, Text, ImageBackground, Platform, StyleSheet} from "react-native";
import HeaderWithProfile from "../../components/HeaderWithProfile";

// Common component for Header of the app.
const OrderConfirmation = () => {
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderWithProfile />

      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}
        style={{ flex: 1, flexDirection: "column" }}
      >
        <ImageBackground
            source={require("../../image/lemon-background.jpg")}
            resizeMode="cover"
            style={styles.bg}
            imageStyle={{ opacity: 0.95 }}
        >
        <Text style={styles.title}>Your reservaition has been confirmed!</Text>
        </ImageBackground>
        
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OrderConfirmation;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    paddingTop: 200,
    paddingBottom: 100
  },
  title: {
    position: "absolute",
    top: 70,         // ↑ alza/abbassa qui (puoi usare anche '12%')
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 35,
    fontWeight: "800",
    color: "#F4CE14",
    letterSpacing: 0.5,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowRadius: 6,
  }
});
