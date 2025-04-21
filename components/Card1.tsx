import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

// Define the props interface
interface Card1Props {
  data: number;
}

const Card1: React.FC<Card1Props> = ({ data }) => {
  return (
    <View style={styles.cardContainer}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/profile.png")} // Ensure correct image path
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Text Section */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Battery Temperature</Text>
        <Text style={styles.temperature}>{data} °C</Text>
      </View>
    </View>
  );
};

// Define styles using StyleSheet
const styles = StyleSheet.create({
  cardContainer: {
    margin: 16,
    padding: 8,
    borderRadius: 16,
    width: "100%",
    height: "16%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  imageContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 96,
    height: 96,
  },
  textContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    gap: 8, // Adjust spacing if needed
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  temperature: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Card1;
