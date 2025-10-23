import { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { UserContext } from "../../context/UserContext";
import { retrieveData } from "../../storage/storage";

export default function Animation() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const checkUserAndNavigate = async () => {
      // Load Data
      const asyncData = await retrieveData("Personal_Detail");
      const parsedAsyncData = JSON.parse(asyncData);

      // Update Context
      setUser(parsedAsyncData);

      // Navigate after splash Delay
      setTimeout(()=>{
        if(parsedAsyncData){
          console.log("User exists → navigating to Home");
          navigation.replace("Home");
        }else{
          console.log("No user → navigating to Onboarding");
          navigation.replace("Onboarding");
        }
      },2500)      
    };
    checkUserAndNavigate();
  },[]);

  const navigation = useNavigation();

  return (
    <LottieView
      source={require("../../animations/animation.json")}
      style={{ width: "100%", height: "100%" }}
      autoPlay
      loop={false}
    />
  );
}
