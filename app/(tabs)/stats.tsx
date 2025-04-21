import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.webviewContainer}>
        <WebView 
          source={{ uri: 'https://predictive-maintenance-of-electric-vehicles-reg.streamlit.app/' }} 
          javaScriptEnabled={true} 
          style={styles.webview}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Ensures safe area is visible
  },
  webviewContainer: {
    flex: 1,
    marginTop: 10, // Pushes WebView down slightly if needed
  },
  webview: {
    flex: 1,
  },
});

export default App;
