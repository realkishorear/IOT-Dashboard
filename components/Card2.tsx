import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Ensure this package is installed

// Define the props interface
interface Card2Props {
  data1: number;
  data2: number;
  data3: number;
  data4: number;
}

const Card2: React.FC<Card2Props> = ({ data1, data2, data3, data4 }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.column}>
        {/* State of Charge */}
        <View style={styles.dataBox}>
          <Icon name="battery-charging-50" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.label}>State of charge</Text>
          <Text style={styles.dataText}>
            {data1} <Text style={styles.unitText}>%</Text>
          </Text>
        </View>
        {/* Temp of Motor */}
        <View style={styles.dataBox}>
          <Icon name="thermometer" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.label}>Temp of Motor</Text>
          <Text style={styles.dataText}>{data2}</Text>
          <Text style={styles.unitText}>°C</Text>
        </View>
      </View>

      <View style={styles.column}>
        {/* State of Health */}
        <View style={styles.dataBox}>
          <Icon name="heart" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.label}>State of health</Text>
          <Text style={styles.dataText}>
            {data3} <Text style={styles.unitText}>%</Text>
          </Text>
        </View>
        {/* Speed of Motor */}
        <View style={styles.dataBox}>
          <Icon name="speedometer" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.label}>Speed of Motor</Text>
          <Text style={styles.dataText}>{data4}</Text>
          <Text style={styles.unitText}>RPM</Text>
        </View>
      </View>
    </View>
  );
};

// Define styles using StyleSheet
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.75)", // Equivalent to bg-white/75
    width: "100%",
    height: "50%",
    borderRadius: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 8,
  },
  column: {
    width: "45%",
    height: "100%",
    justifyContent: "space-around",
  },
  dataBox: {
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Equivalent to bg-black/30
    borderRadius: 12,
    width: "100%",
    height: "45%",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  icon: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "normal",
    marginBottom: 4,
    color: "#fff",
  },
  dataText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  unitText: {
    fontSize: 12,
    fontWeight: "300",
    color: "#fff",
  },
});

export default Card2;
