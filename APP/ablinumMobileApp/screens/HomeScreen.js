import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet,
  Text,
} from "react-native";
import fondo from "../assets/fondo2.png";

const LandingScreen = ({ navigation }) => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");

  const validarDatos = () => {
    if (usuario === "Museo" && clave === "1234") {
      navigation.navigate("Landing", { usuario: 1 });
    } else {
      Alert.alert("", "USUARIO-CONTASEÑA INEXISTENTE", [
        { text: "REINTENTAR", onPress: () => console.log("OK Pressed") },
      ]);
      setUsuario("");
      setClave("");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={fondo} style={styles.backgroundImage} />
      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/img/tablinumBlanco.png")}
          style={styles.logo}
        />

        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={usuario}
          onChangeText={(text) => setUsuario(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="PIN"
          secureTextEntry={true}
          value={clave}
          onChangeText={(text) => setClave(text)}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={validarDatos}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 230,
    height: 200,
    marginBottom: 40,
  },
  inputContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 20,
    borderRadius: 5,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#dcdcdc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LandingScreen;
