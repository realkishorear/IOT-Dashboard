import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Card from "../../components/Card";
import { useState, useEffect } from "react";
import { database } from "../../firebase";
import { ref, onValue } from "firebase/database";

// Parse string with units to number (e.g., "85.6°C" -> 85.6)
const parseNumber = (value: string | number): number => {
  if (typeof value === "string") {
    const parsed = parseFloat(value.replace(/[^\d.-]/g, ""));
    return isNaN(parsed) ? 0 : parsed;
  }
  return value;
};

// Format seconds to MM:SS
const formatTime = (seconds: number | null): string => {
  if (seconds === null) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

interface DataState {
  batteryHealth: number | string;
  batteryHumidity: number | string;
  batteryPercent: number | string;
  batteryTemperature: number | string;
  carRPM: number | string;
  current: number | string;
  motarHumidity: number | string;
  motorTemperature: number | string;
  rpm: number | string;
  distance: number | string;
  systemVoltage: number | string;
  power: number | string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<DataState>({
    batteryHealth: 0,
    batteryHumidity: 0,
    batteryPercent: 0,
    batteryTemperature: 0,
    carRPM: 0,
    current: 0,
    motarHumidity: 0,
    motorTemperature: 0,
    rpm: 0,
    distance: 0,
    systemVoltage: 0,
    power: 0,
  });

  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const dataRef = ref(database, "parameters");
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    });

    return () => unsubscribe();
  }, []);

  // Trigger countdown when motor temperature goes above 45
  useEffect(() => {
    const motorTemp = parseNumber(data.motorTemperature);
    const batterTemp = parseNumber(data.batteryTemperature);

    if ((motorTemp >= 45 || batterTemp >= 45) && timeLeft === null) {
      setTimeLeft(59); // start timer
    }
  }, [data.motorTemperature]);

  // Countdown logic
  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft === 0) {
      setTimeLeft(null); // reset
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cardWrapper}>
            {/* Distance & Timer */}
            <Card
              data1={data.distance}
              data2={formatTime(timeLeft)}
              unit1="Distance (Cm)"
              unit2="Autoshut down (s)"
              icon1={require("../../assets/images/icon9.png")}
              icon2={require("../../assets/images/icon8.png")}
              isWarning1={parseNumber(data.distance) <= 45}
              isWarning2={parseNumber(data.motorTemperature) > 45}
            />

            {/* Voltage & Current */}
            <Card
              data1={data.systemVoltage}
              data2={data.current}
              unit1="System Voltage"
              unit2="Current (mA)"
              isWarning1={parseNumber(data.systemVoltage) < 6}
              isWarning2={parseNumber(data.current) > 1500}
            />

            {/* Motor Temp & Battery Temp */}
            <Card
              data1={data.motorTemperature}
              data2={data.batteryTemperature}
              unit1="Motor Temperature"
              unit2="Battery Temperature"
              icon1={require("../../assets/images/profile.png")}
              icon2={require("../../assets/images/icon3.png")}
              isWarning1={parseNumber(data.motorTemperature) >= 40}
              isWarning2={parseNumber(data.batteryTemperature) >= 40}
            />

            {/* Battery Percent & Battery Health */}
            <Card
              data1={data.batteryPercent}
              data2={data.batteryHealth}
              unit1="State of Charge (%)"
              unit2="State of Health (%)"
              icon1={require("../../assets/images/icon1.png")}
              icon2={require("../../assets/images/icon4.png")}
              isWarning1={parseNumber(data.batteryPercent) <= 20}
              isWarning2={parseNumber(data.batteryHealth) <= 50}
            />

            {/* RPM & Power */}
            <Card
              data1={data.rpm}
              data2={data.power}
              unit1="Motor Speed (RPM)"
              unit2="Power (mW)"
              icon1={require("../../assets/images/icon5.png")}
              icon2={require("../../assets/images/icon6.png")}
              isWarning1={parseNumber(data.rpm) >= 30000}
              isWarning2={parseNumber(data.power) >= 5000}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    minHeight: "100%",
  },
  cardWrapper: {
    alignItems: "center",
    gap: 0,
  },
});

export default Home;
