import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import LogoMuseo from "../assets/img/museo.png";
import fondo from "../assets/fondo2.png";

const LandingScreen = ({ route, navigation }) => {
  const { usuario } = route.params;

  const setNavi = () => {
    navigation.setOptions({
      headerTransparent: true, // hace la barra de navegación transparente
      headerTitle: "SELECCIONE CATÁLOGO",
      headerBackTitle: "Atrás",
      headerTintColor: "#000000", // cambia el color de la flecha de retroceso a blanco
      headerTitleAlign: "center",
    });
  };
  useEffect(() => {
    setNavi();
  }, []);

  //console.log("usuario --->>> ", usuario);

  const handlePress = (cual) => {
    //   console.log("cual ---ZZZZ", cual);
    cual == "verte"
      ? navigation.navigate("Search", { numeroCatalogo: 1, usuario })
      : navigation.navigate("Search", { numeroCatalogo: 2, usuario });
  };

  return (
    <View style={styles.container}>
      <Image source={fondo} style={styles.backgroundImage} />

      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={() => handlePress("verte")}
          style={styles.touchableOpacity}
        >
          <Image
            source={require("../assets/img/verte.png")}
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handlePress("flora")}
          style={styles.touchableOpacity2}
        >
          <Image
            source={require("../assets/img/ala.png")}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    width: "60%",
    maxHeight: "20%",
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "30%",
    paddingTop: "15%",
  },
  touchableOpacity: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginBottom: 150,
  },
  touchableOpacity2: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    //marginBottom: 70,
  },
  image: {
    width: "35%",

    resizeMode: "contain",
  },
  headerTitle: {
    fontSize: 18,
    // fontWeight: "bold",
    color: "#FFF",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 5,
    width: "100%",
  },
});

export default LandingScreen;
