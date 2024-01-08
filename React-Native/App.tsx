import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Route from "./src/Components/Routes";

export default function App() {
  return (
    <View style={styles.container}>
      <Route/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#cbd5e1",
    alignItems: "center",
    justifyContent: "center",
    zIndex: -10
  },
});
