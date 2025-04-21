import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{
          uri: "https://predictive-maintenance-of-electric-vehicles.streamlit.app/",
        }}
        javaScriptEnabled={true} // Ensure JavaScript is enabled
        style={styles.webview}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : "black"
  },
  webview: {
    flex: 1,
  },
});

export default App;
