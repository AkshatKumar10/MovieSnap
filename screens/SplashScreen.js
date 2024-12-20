import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  useAnimatedValue,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useAnimatedValue(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/Images/logo.png")}
        style={[styles.image, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  image: {
    width: "100%",
    marginBottom: 50,
  },
});

export default SplashScreen;
