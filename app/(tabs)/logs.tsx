import { View, ScrollView, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { database } from "../../firebase";
import { ref, onValue } from "firebase/database";

interface DataState {
  batteryHealth: number;
  batteryHumidity: number;
  batteryPercent: number;
  batteryTemperature: number;
  carRPM: number;
  current: number;
  motarHumidity: number;
  motorTemperature: number;
  rpm: number;
  speed: number;
  systemVoltage: number;
  power: number;
  distance: number;
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
    speed: 0,
    systemVoltage: 0,
    power: 0,
    distance: 0,
  });

  const [logs, setLogs] = useState<string[]>([]); // Log state to store the logs

  // Check conditions and add log entries
  const checkConditionsAndLog = () => {
    const newLogs: string[] = [];

    // Check distance condition
    if (data.distance <= 45) {
      newLogs.push(`${new Date().toLocaleTimeString()} - Distance is below 45 km. Please check.`);
    }

    // Check voltage condition
    if (data.systemVoltage < 6) {
      newLogs.push(`${new Date().toLocaleTimeString()} - Voltage is below 6V. Battery service recommended.`);
    }

    // Check motor temperature conditions
    if (data.motorTemperature >= 40 && data.motorTemperature < 45) {
      newLogs.push(`${new Date().toLocaleTimeString()} - Motor temperature >= 40°C, check cooling fan.`);
    }
    if (data.motorTemperature >= 45) {
      newLogs.push(`${new Date().toLocaleTimeString()} - Motor temperature >= 45°C, shutdown timer set for 1 min.`);
    }

    // Prepend new logs to the top of the list (recent logs on top)
    setLogs((prevLogs) => [...newLogs, ...prevLogs]);
  };

  // Fetch data from Firebase
  useEffect(() => {
    const dataRef = ref(database, "parameters");
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        console.log("No data available");
      }
    });

    return () => unsubscribe();
  }, []);

  // Set up interval to log every minute (60 seconds)
  useEffect(() => {
    const intervalId = setInterval(() => {
      checkConditionsAndLog(); // Check and log every minute
    }, 5000); // 60000 milliseconds = 1 minute

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [data]); // The interval will start when `data` changes

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardWrapper}>
          {/* Logs Section */}
          <Text style={styles.title}>System Logs</Text>
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <View key={index} style={styles.logItem}>
                <Text style={styles.logText}>{log}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noLogs}>No logs yet</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622", // Dark background
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    alignItems: "center",
  },
  cardWrapper: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333", // Dark text for the title
  },
  logItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f9f9f9", // Light background for each log
    borderRadius: 6,
  },
  logText: {
    fontSize: 14,
    color: "#333", // Dark text for readability
  },
  noLogs: {
    fontSize: 14,
    color: "#888",
  },
});

export default Home;
