import { useContext, useState } from "react";
import { Navigate } from "./Routes";
import { Pressable, Text, View, StyleSheet } from "react-native";

export default function FootBar() {
  const { setRoute, route, token, setToken } = useContext(Navigate);
  const [show, setShow] = useState<boolean>(false);

  const handleUser = () => {
    if (!token) {
      setRoute("Login");
    } else {
      setToken("");
      setRoute("Home");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
      alignItems: "flex-start",
      position: "absolute",
      backgroundColor: show ? "#00000088" : "#00000000",
      zIndex: show ? 10 : -1,
    },
    bar: {
      paddingTop: 50,
      paddingEnd: 10,
      left: show ? 0 : "-50%",
      width: "50%",
      height: "100%",
      backgroundColor: "#334155",
      zIndex: 11
    },
    button: {
      padding: 10,
      borderColor: "#334155",
      borderBottomWidth: 3,
    },
    textButton: {
      borderRadius: 10,
      fontSize: 30,
      color: "#f1f5f9",
      padding: 10,
    },
    showButton: {
      position: "absolute",
      zIndex: 0,
      borderRadius: 25,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      right: -40,
      width: 40,
      top: 50,
      backgroundColor: "#334155",
    },
    showButtonText: {
      textAlign: "center",
      borderRadius: 10,
      fontSize: 30,
      color: "#f1f5f9",
      padding: 10,
      transform: [
        {
          scale: show ? -1 : 1,
        },
      ],
    },
    buttonActived: {
      backgroundColor: "#64748b",
    },
    buttonUnactived: {
      backgroundColor: "#475569",
    },
  });

  return (
    <View style={styles.container}>
      <View style={{position: "absolute", zIndex: show ? 10 : -1, width: "100%", height: "100%"}} onTouchStart={() => setShow(false)}/>
      <View style={styles.bar}>
        <Pressable style={styles.showButton} onPress={() => setShow(!show)}>
          <Text style={styles.showButtonText}>{">"}</Text>
        </Pressable>
        <View>
          <Pressable
            style={{
              ...styles.button,
              ...(route === "Home"
                ? styles.buttonActived
                : styles.buttonUnactived),
            }}
            onPress={() => setRoute("Home")}
          >
            <Text style={styles.textButton}>Inicío</Text>
          </Pressable>
          {token && (
            <Pressable
              style={{
                ...styles.button,
                ...(route === "Lista"
                  ? styles.buttonActived
                  : styles.buttonUnactived),
              }}
              onPress={() => setRoute("Lista")}
            >
              <Text style={styles.textButton}>Lista</Text>
            </Pressable>
          )}
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Pressable
            style={{
              ...styles.button,
              ...(route === "Login"
                ? styles.buttonActived
                : styles.buttonUnactived),
              ...(token ? { backgroundColor: "#dc2626" } : {}),
            }}
            onPress={handleUser}
          >
            <Text style={styles.textButton}>{token ? "Sair" : "Logar"}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
