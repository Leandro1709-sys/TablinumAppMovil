import React, { useState, useEffect, Component, useRef } from "react";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Alert,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import axios from "axios";
import { SelectList } from "react-native-dropdown-select-list";
import { Table, TableWrapper, Row } from "react-native-table-component";
import carganado from "../assets/dinoGif.gif";
import fondo from "../assets/fondo2.png";

const SearchScreen = ({ route, navigation }) => {
  const { numeroCatalogo, usuario } = route.params;
  //  console.log("search usuario", usuario);
  // console.log("search catalogo", numeroCatalogo);

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [especimenes, setEspecimenes] = useState([]);
  const [filtrado, setFiltrado] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [especies, setEspecies] = useState([]);
  const [formacion, setFormacion] = useState([]);
  const [selectedgen, setSelectedgen] = React.useState("");
  const [selectedes, setSelectedes] = React.useState("");
  const [selectedfor, setSelectedfor] = React.useState("");
  const [numeros, setNumeros] = useState([]);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  // const [numeroCata, setNumeroCata] = useState("");

  const handleInputChange = (text) => {
    setInputValue(text);
  };
  // const catalogoN = (n) => {
  //   setNumeroCata(n);
  // };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
    },
    header: {
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
      height: 50,

      backgroundColor: numeroCatalogo
        ? numeroCatalogo === 1
          ? "rgba(173, 166, 109, 0.9)"
          : "rgba(60, 118, 230, 0.95)"
        : "",
      marginTop: 30,
      color: "#fff",
    },
    text: { textAlign: "center", fontWeight: "400" },
    dataWrapper: { marginTop: -1 },
    row: { height: 80, backgroundColor: "#E7E6E1" },
    rowBackground: {
      backgroundColor: "rgba(247, 246, 231, 0.95)",
    },
    selected: {
      marginTop: 15,
    },
    image: {
      width: 200,
      height: 200,
      position: "absolute",
      top: "50%",
      left: "50%",
      marginLeft: -100,
      marginTop: -100,
    },
    buscar: {
      maxWidth: "80%",
    },
    input: {
      marginLeft: "5%",
      backgroundColor: "#fff",
      color: "#000000",
      marginTop: "20%",
      height: "5%",
      textAlign: "center",
      width: "90%",
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
      borderColor: "#000000",
      borderWidth: 1,
    },
    backgroundImage: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
    boton: {
      backgroundColor: numeroCatalogo
        ? numeroCatalogo === 1
          ? "rgba(173, 166, 109, 0.9)"
          : "rgba(60, 118, 230, 0.9)"
        : "",
      height: "5%",
      textAlign: "center",
      justifyContent: "center",
      borderColor: "#000000",
      borderWidth: 0.5,
      width: "90%",
      marginLeft: "5%",
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6,
      alignItems: "center",
    },
    boton2: {
      backgroundColor: numeroCatalogo
        ? numeroCatalogo === 1
          ? "rgba(173, 166, 109, 0.95)"
          : "rgba(60, 118, 230, 0.95)"
        : "",
      height: "5%",
      textAlign: "center",
      justifyContent: "center",
      // borderColor: "#000000",
      borderWidth: 0.5,
      width: "90%",
      marginLeft: "5%",
      borderRadius: 6,
      alignItems: "center",
      color: "#fff",
      borderColor: "#fff",
    },
    drop: {
      width: "90%",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      marginLeft: "5%",
    },
    selected: {},
    selecto: {
      width: "90%",
      backgroundColor: numeroCatalogo
        ? numeroCatalogo === 1
          ? "rgba(173, 166, 109, 0.9)"
          : "rgba(60, 118, 230, 0.9)"
        : "",
      marginBottom: 15,
      marginTop: 15,
      marginLeft: "5%",
      borderColor: "#000000",
      borderWidth: 0.5,
    },
    headerTitle: {
      fontSize: 25,
      // fontWeight: "bold",
      color: "#000000",
      fontWeight: "bold",
      borderRadius: 5,
      width: "100%",
    },
    textoBot: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "500",
    },
  });
  const setNavi = () => {
    navigation.setOptions({
      headerTransparent: true, // hace la barra de navegación transparente
      headerTitle: numeroCatalogo === 1 ? "PALEOVERTEBRADOS" : "PALEOFLORA",
      headerBackTitle: "Atrás",
      headerTintColor: "#000000", // cambia el color de la flecha de retroceso a blanco
      headerTitleAlign: "center",
    });
  };
  useEffect(() => {
    setNavi();
    // catalogoN(numeroCatalogo);
  }, []);

  const filtrarEspecimen = (val, que) => {
    if (que === "especie" && val != "") {
      let especie = [];
      especimenes.map((e) => {
        if (e.especie == val) {
          especie.push(e);
        }
      });

      if (especie.length > 0) {
        setFiltrado(especie);
      }
      setSelectedes("");
    } else if (que === "genero" && val != "") {
      let genero = [];
      especimenes.map((e) => {
        if (e.genero == val) {
          genero.push(e);
        }
      });

      if (genero.length > 0) {
        setFiltrado(genero);
      }
      setSelectedgen("");
    } else if (que === "forma" && val != "") {
      let forma = [];
      especimenes.map((e) => {
        if (e.formacion == val) {
          forma.push(e);
        }
      });

      if (genero.length > 0) {
        setFiltrado(forma);
      }
      setSelectedgen("");
    }
  };

  //TABLA  DE  DATOS
  class ExampleThree extends Component {
    constructor(props) {
      super(props);
      this.state = {
        tableHead: [
          "Nro.",
          "Género",
          "Especie",
          "Pos. Filo",
          "Partes",
          "Descubridor",
          "Formacion",
          "Campaña",
          "Nro. Campo",
        ],
        widthArr: [80, 130, 130, 130, 130, 130, 130, 130, 130],
      };
    }

    render() {
      const state = this.state;
      const tableData = [];

      if (filtrado && filtrado.length < 1) {
        for (let i = 0; i < especimenes.length; i += 1) {
          const rowData = [];
          rowData.push(especimenes[i].especimennumero);
          rowData.push(especimenes[i].genero);
          rowData.push(especimenes[i].especie);
          rowData.push(especimenes[i].posicionfilo);
          rowData.push(especimenes[i].partesesqueletales);
          rowData.push(especimenes[i].descubridor);
          rowData.push(especimenes[i].formacion);
          rowData.push(especimenes[i].campana);
          rowData.push(especimenes[i].nrocampo);

          tableData.push(rowData);
        }
      } else {
        for (let j = 0; j < filtrado.length; j += 1) {
          //    console.log("subjota---->>>>>", filtrado[j].especimennumero);
          const rowData = [];
          rowData.push(filtrado[j].especimennumero);
          rowData.push(filtrado[j].genero);
          rowData.push(filtrado[j].especie);
          rowData.push(filtrado[j].posicionfilo);
          rowData.push(filtrado[j].partesesqueletales);
          rowData.push(filtrado[j].descubridor);
          rowData.push(filtrado[j].formacion);
          rowData.push(filtrado[j].campana);
          rowData.push(filtrado[j].nrocampo);

          tableData.push(rowData);
        }
      }

      return (
        <View style={styles.container}>
          <View style={styles.selected}>
            <SelectList
              setSelected={(val) => setSelectedgen(val)}
              data={generos}
              dropdownStyles={styles.drop}
              save="value"
              placeholder="GENERO"
              boxStyles={styles.selecto}
              onSelect={filtrarEspecimen(selectedgen, "genero")}
            />
            <SelectList
              setSelected={(val) => setSelectedes(val)}
              data={especies}
              save="value"
              dropdownStyles={styles.drop}
              placeholder="ESPECIES"
              boxStyles={styles.selecto}
              onSelect={filtrarEspecimen(selectedes, "especie")}
            />

            <SelectList
              setSelected={(val) => setSelectedfor(val)}
              data={formacion}
              save="value"
              dropdownStyles={styles.drop}
              placeholder="FORMACION"
              boxStyles={styles.selecto}
              onSelect={filtrarEspecimen(selectedes, "formacion")}
            />
          </View>
          {filtrado.length > 0 ? (
            <TouchableOpacity
              title="LIMPIAR FILTROS"
              style={styles.boton2}
              onPress={() => {
                handleSearchLimpia();
              }}
            >
              <Text style={styles.textoBot}>LIMPIAR FILTROS</Text>
            </TouchableOpacity>
          ) : (
            ""
          )}
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
                <Row
                  data={state.tableHead}
                  widthArr={state.widthArr}
                  style={styles.header}
                  textStyle={styles.text}
                />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
                  {tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index % 2 && styles.rowBackground]}
                      textStyle={styles.text}
                      onPress={() => handleSearch2(rowData[0])}
                    />
                  ))}
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      );
    }
  }

  if (especimenes.length > 0) {
    // console.log("entra especimenes");
    if (numeros.length === 0) {
      // console.log("entra numeros");
      let num = [];
      especimenes.map((ele) => {
        num.push(ele.especimennumero);
      });
      setNumeros(num);
    }

    //console.log(numeros);
  }

  function handleSearch() {
    if (numeroCatalogo == 1) {
      let filter = especimenes.filter(
        (e) => e.especimennumero == inputValue.toString() + "000"
      );
      filter.length > 0
        ? setFiltrado(filter)
        : Alert.alert("", "No se encontró el especimen", [
            {
              text: "ACEPTAR",
              onPress: () => {
                console.log("ok");
              },
            },
          ]);
    } else {
      let filter = especimenes.filter(
        (e) => e.especimennumero == inputValue.toString() + "00"
      );
      filter.length > 0
        ? setFiltrado(filter)
        : Alert.alert("", "No se encontró el especimen", [
            {
              text: "ACEPTAR",
              onPress: () => {
                console.log("ok");
              },
            },
          ]);
    }
  }

  var y = 1;

  const handleSearch2 = async (id) => {
    try {
      if (numeroCatalogo === 1) {
        const response = await fetch(
          `https://pv.tablinum.host/api/especimen/id?id=${id}`
        );
        const data = await response.json();
        navigation.navigate("Results", { results: data, n: numeroCatalogo });
      } else {
        const response = await fetch(
          `https://pf.tablinum.host/api/especimen/id?id=${id}`
        );
        const data = await response.json();
        navigation.navigate("Results", { results: data, n: numeroCatalogo });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSearchLimpia = () => {
    setFiltrado([]);
  };
  const getEspecimenes = async () => {
    if (usuario == 1 && numeroCatalogo == 1) {
      //catalogo palevertebrados Museo Ciencias Naturales
      try {
        const response = await axios.get(
          "https://pv.tablinum.host/api/especimenHome"
        );
        const data = response.data[0].slice(0, 20); // Obtener solo los primeros 20 elementos
        setEspecimenes(data);
      } catch (error) {
        console.error(error);
      }
    } else if (usuario == 1 && numeroCatalogo == 2) {
      //catalogo palevertebrados Museo Ciencias Naturales
      try {
        const response = await axios.get(
          "https://pf.tablinum.host/api/especimenHome"
        );
        const data = response.data[0].slice(0, 20); // Obtener solo los primeros 20 elementos
        setEspecimenes(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getGeneros = () => {
    let genero = [];
    let key = 1;

    especimenes && filtrado
      ? especimenes.map((e) => {
          if (genero.length == 0) {
            //console.log("entra primero");
            genero.push({ key: key.toString(), value: e.genero });
            key++;
          } else {
            //console.log("entra segundo");
            let count = 0;
            for (var i = 0; i < genero.length; i++) {
              //  console.log(forma[i].value);
              if (genero[i].value == e.genero) {
                count++;
              }
            }
            if (count == 0) {
              genero.push({ key: key.toString(), value: e.genero });
              key++;
            }
          }
        })
      : "";

    setIsLoading(false); // Agregar setIsLoading aquí
    setGeneros(genero);
  };

  const getEspecies = () => {
    let especie = [];
    let key = 1;

    especimenes
      ? especimenes.map((e) => {
          if (especie.length == 0) {
            //console.log("entra primero");
            especie.push({ key: key.toString(), value: e.especie });
            key++;
          } else {
            //console.log("entra segundo");
            let count = 0;
            for (var i = 0; i < especie.length; i++) {
              //  console.log(forma[i].value);
              if (especie[i].value == e.especie) {
                count++;
              }
            }
            if (count == 0) {
              especie.push({ key: key.toString(), value: e.especie });
              key++;
            }
          }

          // if (!especie.includes(e.especie)) {
          //   especie.push({ key: key.toString(), value: e.especie });
          //   key++;
          // }
        })
      : "";
    setIsLoading(false); // Agregar setIsLoading aquí
    setEspecies(especie);
  };

  const getFormacion = () => {
    var forma = [];
    var key = 1;

    especimenes
      ? especimenes.map((e) => {
          //  console.log(forma);
          if (forma.length == 0) {
            //console.log("entra primero");
            forma.push({ key: key.toString(), value: e.formacion });
            key++;
          } else {
            //console.log("entra segundo");
            let count = 0;
            for (var i = 0; i < forma.length; i++) {
              //  console.log(forma[i].value);
              if (forma[i].value == e.formacion) {
                count++;
              }
            }
            if (count == 0) {
              forma.push({ key: key.toString(), value: e.formacion });
              key++;
            }
          }
        })
      : "";
    setIsLoading(false); // Agregar setIsLoading aquí
    setFormacion(forma);
  };

  useEffect(() => {
    getEspecimenes();
  }, []);

  if (especimenes.length > 0 && generos.length == 0) {
    getGeneros();
    getEspecies();
    getFormacion();
  }

  return isLoading ? (
    <>
      <Image source={fondo} style={styles.backgroundImage} />
      <ActivityIndicator size={85} color="#FFF" marginTop="100%" />

      {/* <Image style={styles.image} source={carganado} resizeMode="contain" /> */}
    </>
  ) : especimenes && generos ? (
    <>
      <Image source={fondo} style={styles.backgroundImage} />

      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="BUSQUEDA POR ID"
        keyboardType="numeric"
      />
      <TouchableOpacity
        title="BUSCAR"
        style={styles.boton}
        onPress={() => {
          handleSearch();
        }}
      >
        <Text>BUSCAR</Text>
      </TouchableOpacity>

      <ExampleThree></ExampleThree>
    </>
  ) : (
    "toto"
  );
};

export default SearchScreen;
