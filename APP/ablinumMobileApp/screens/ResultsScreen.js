import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { subespecimen } from "./functions";
import fondo from "../assets/fondo2.png";
import { useState } from "react";
//import { decode as atob } from "base-64";

const ResultScreen = ({ route, navigation }) => {
  // console.log(route.params.results);
  const especies = [route.params.results];
  const [img, setImg] = useState("");
  // console.log(especies);
  navigation.setOptions({
    headerTransparent: true, // hace la barra de navegación transparente
    headerTitle: () => <Text style={styles.headerTitle}>DETALLES</Text>,
    headerBackTitle: "Atrás",
    headerTintColor: "#fff", // cambia el color de la flecha de retroceso a blanco
    headerTitleAlign: "center",
  });
  function abririmagen(el) {
    Swal.fire({
      imageUrl: `${el}`,
      imageHeight: 300,
      backdrop: `
    rgba(80, 77, 77, 0.70)
    no-repeat
        `,
    });
  }
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
              <Text style={[styles.label, styles.labelSmall]}>Posición</Text>
              <Text style={styles.text}>
                {JSON.stringify(el.posicionfilo).slice(1, -1)}
              </Text>
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
              <Text style={[styles.label, styles.labelSmall].slice(1, -1)}>
                Campaña
              </Text>
              <Text style={styles.text}>
                {JSON.stringify(el.campana).slice(1, -1)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, styles.labelSmall].slice(1, -1)}>
                Nro Campo
              </Text>
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
              <Text style={[styles.label, styles.labelSmall]}>Partes</Text>
              <Text style={styles.text}>
                {JSON.stringify(el.partesesqueletales).slice(1, -1)}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={[styles.label, styles.labelSmall]}>Comentarios</Text>
              <Text style={styles.text}>
                {JSON.stringify(el.comentario).slice(1, -1)}
              </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  scrollView: {
    borderRadius: 10,
    marginTop: "20%",
    padding: 8,
  },
  itemContainer: {
    padding: 0,
    marginBottom: 10,
    flexDirection: "column",
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  row: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 10,
    fontSize: 20,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    borderColor: "#000000",
    borderWidth: 0.3,
  },
  label: {
    borderColor: "#000000",
    borderWidth: 0.3,
    flex: 1,
    fontSize: 21,
    width: "100%",
    justifyContent: "center",
    backgroundColor: "rgba(173, 166, 109, 0.9555)",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  text: {
    margin: 10,
    fontSize: 22,
    fontWeight: "500",
    color: "#000",

    marginBottom: 10,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
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
});

export default ResultScreen;
