import { View, Text, Image, StyleSheet, ImageSourcePropType } from "react-native";
import React from "react";

interface CardProps {
  data1: number | string;
  data2: number | string;
  unit1?: string;
  unit2?: string;
  icon1?: ImageSourcePropType;
  icon2?: ImageSourcePropType;
  isWarning1?: boolean;
  isWarning2?: boolean;
}


const Card: React.FC<CardProps> = ({
  data1,
  data2,
  unit1 = "Voltage (V)",
  unit2 = "Current (mA)",
  icon1 = require("../assets/images/voltage.png"),
  icon2 = require("../assets/images/current.png"),
  isWarning1 = false,
  isWarning2 = false,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={[styles.dataBox, isWarning1 && styles.warningBox]}>
        <Text style={styles.unitText}>{unit1}</Text>
        <Image source={icon1} style={styles.image} resizeMode="contain" />
        <Text style={styles.dataText}>{data1}</Text>
      </View>

      <View style={[styles.dataBox, isWarning2 && styles.warningBox]}>
        <Text style={styles.unitText}>{unit2}</Text>
        <Image source={icon2} style={styles.image} resizeMode="contain" />
        <Text style={styles.dataText}>{data2}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    margin: 16,
    padding: 8,
    borderRadius: 16,
    width: "100%",
    maxWidth: 400,
    height: 130,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  warningBox: {
    backgroundColor: "#E83F25",
  },
  dataBox: {
    backgroundColor: "rgba(229, 231, 235, 0.5)",
    width: "45%",
    height: "98%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  image: {
    width: 36,
    height: 36,
  },
  dataText: {
    fontSize: 16,
    fontWeight: "500",
  },
  unitText: {
    fontSize: 12,
    fontWeight: "300",
  },
});

export default Card;
