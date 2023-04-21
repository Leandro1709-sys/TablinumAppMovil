import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import { subespecimen, decimalAGrado } from "./functions";
import fondo from "../assets/fondo2.png";
import { useEffect, useState } from "react";
//import { decode as atob } from "base-64";

const ResultScreen = ({ route, navigation }) => {
  // console.log(route.params.results);
  const especies = [route.params.results];
  const numero = [route.params.n];

  const [img, setImg] = useState("");
  console.log(especies);

  console.log(numero[0]);
  const setNavi = () => {
    navigation.setOptions({
      headerTransparent: true, // hace la barra de navegación transparente
      headerTitle: numero == 1 ? "PALEOVERTEBRADOS" : "PALEOFLORA",
      headerBackTitle: "Atrás",
      headerTintColor: "#000000", // cambia el color de la flecha de retroceso a blanco
      headerTitleAlign: "center",
    });
  };

  const handlePress = () => {
    Linking.openURL(
      "https://www.google.com/maps/place/" +
        especies[0].coordlat +
        "," +
        especies[0]?.coordlong
    );
  };

  useEffect(() => {
    setNavi();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
    },
    scrollView: {
      borderRadius: 10,
      marginTop: "20%",
      padding: 5,
    },
    itemContainer: {
      padding: 0,
      marginBottom: 0,
      flexDirection: "column",
      borderRadius: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      //   marginBottom: 20,
    },
    row: {
      flex: 1,
      flexDirection: "column",
      // marginBottom: 10,
      fontSize: 20,
      width: "100%",
      alignItems: "center",
      //  marginBottom: 10,
      backgroundColor: numero
        ? numero === 1
          ? "rgba(255, 255, 255, 0.9)"
          : "rgba(255, 255, 255, 0.9)"
        : "",
      borderBottomEndRadius: 5,
      borderBottomStartRadius: 5,
      borderTopRightRadius: 6,
      borderTopLeftRadius: 6,
    },
    label: {
      flex: 1,
      fontSize: 19,
      width: "100%",
      fontWeight: 500,
      justifyContent: "center",
      backgroundColor: numero
        ? numero == 1
          ? "rgba(173, 166, 109, 0.9)"
          : "rgba(60, 118, 230, 0.95)"
        : "",
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
    },
    text: {
      margin: 20,
      fontSize: 20,
      fontWeight: "400",
      color: "#000",

      //  marginBottom: 10,
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
      borderBottomEndRadius: 5,
      borderBottomStartRadius: 5,
    },
    textArr: {
      fontSize: 20,
      margin: 5,
    },
    textCoor: {
      fontSize: 20,
      marginBottom: 15,
    },
    backgroundImage: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
    headerTitle: {
      fontSize: 25,
      // fontWeight: "bold",
      color: "#000000",
      fontWeight: "bold",
      borderRadius: 5,
      width: "100%",
    },
    textMap: {
      backgroundColor: numero
        ? numero == 1
          ? "rgba(173, 166, 109, 0.9)"
          : "rgba(60, 118, 230, 0.95)"
        : "",
      width: 200,
      height: 36,
      margin: 15,
      borderRadius: 5,
      textAlign: "center",
      verticalAlign: "middle",
      fontSize: 17,
      fontWeight: 500,
    },
  });

  // const imagenCodificada = especies[0].imagen[0]; // Obtener la cadena de texto codificada en base64
  // const rutaImagen = `data:image/jpeg;base64,${atob(imagenCodificada)}`;

  return (
    <View style={styles.container}>
      <Image source={fondo} style={styles.backgroundImage} />

      <ScrollView style={styles.scrollView}>
        {especies.map((el, index) => (
          <View
            key={index}
            style={[
              styles.itemContainer,
              index % 2 === 0
                ? { backgroundColor: "rgba(255, 255, 255, 0.0)" }
                : { backgroundColor: "rgba(0, 0, 0, 0.0)" },
            ]}
          >
            <View style={styles.row}>
              <Text style={[styles.label, styles.labelSmall]}>Especimen</Text>
              <Text style={styles.text}>
                {JSON.stringify(subespecimen(el.especimennumero)).slice(1, -1)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, styles.labelSmall]}>Género</Text>
              <Text style={styles.text}>
                {JSON.stringify(el.genero).slice(1, -1)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, styles.labelSmall]}>Especie</Text>
              <Text style={styles.text}>
                {JSON.stringify(el.especie).slice(1, -1)}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={[styles.label, styles.labelSmall]}>
                Posición Filogenética
              </Text>

              {el.posicionfilo.map((ele) => {
                return (
                  <Text style={styles.textArr}>
                    {"- " + JSON.stringify(ele).slice(1, -1)}
                  </Text>
                );
              })}
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, styles.labelSmall]}>
                Partes Esqueletales
              </Text>

              {el.partesesqueletales.map((ele) => {
                return (
                  <Text style={styles.textArr}>
                    {"- " + JSON.stringify(ele).slice(1, -1)}
                  </Text>
                );
              })}
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, styles.labelSmall]}>Periodo</Text>
              <Text style={styles.text}>
                {JSON.stringify(el.periodo).slice(1, -1)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, styles.labelSmall]}>Época</Text>
              <Text style={styles.text}>
                {JSON.stringify(el.epoca).slice(1, -1)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, styles.labelSmall]}>Piso</Text>
              <Text style={styles.text}>
                {JSON.stringify(el.piso).slice(1, -1)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, styles.labelSmall]}>Cuenca</Text>
              <Text style={styles.text}>
                {JSON.stringify(el.cuenca).slice(1, -1)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, styles.labelSmall]}>Formacion</Text>
              <Text style={styles.text}>
                {JSON.stringify(el.formacion).slice(1, -1)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, styles.labelSmall]}>Miembro</Text>
              <Text style={styles.text}>
                {JSON.stringify(el.miembro).slice(1, -1)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, styles.labelSmall]}>Localidad</Text>
              <Text style={styles.text}>
                {JSON.stringify(el.localidad).slice(1, -1)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, styles.labelSmall]}>Campaña</Text>
              <Text style={styles.text}>
                {JSON.stringify(el.campana).slice(1, -1)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, styles.labelSmall]}>Nro Campo</Text>
              <Text style={styles.text}>
                {JSON.stringify(el.nrocampo).slice(1, -1)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, styles.labelSmall]}>Descubridor</Text>
              <Text style={styles.text}>
                {JSON.stringify(el.descubridor).slice(1, -1)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, styles.labelSmall]}>Preparador</Text>
              <Text style={styles.text}>
                {JSON.stringify(el.preparador).slice(1, -1)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, styles.labelSmall]}>Fecha Prep.</Text>
              <Text style={styles.text}>
                {JSON.stringify(el.preparacionfecha).slice(1, -1)}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={[styles.label, styles.labelSmall]}>Comentarios</Text>
              <Text style={styles.text}>
                {JSON.stringify(el.comentario).slice(1, -1)}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={[styles.label, styles.labelSmall]}>Ubicacion</Text>
              <Text style={styles.textArr}>
                {decimalAGrado(el.coordlat, el.coordlong).latitud.completa}
              </Text>
              <Text style={styles.textCoor}>
                {decimalAGrado(el.coordlat, el.coordlong).longitud.completa}
              </Text>
              <TouchableOpacity onPress={handlePress}>
                <Text style={styles.textMap}>ver en maps!</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.row}>
              <Text style={[styles.label, styles.labelSmall]}>IMAGENES</Text>
              <Image
                style={styles.logo}
                source={{
                  uri: rutaImagen,
                }}
              />
            </View> */}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ResultScreen;
