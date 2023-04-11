import React, { useState, useEffect, Component, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
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
  const [selectedgen, setSelectedgen] = React.useState("");
  const [selectedes, setSelectedes] = React.useState("");
  const [numeros, setNumeros] = useState([]);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  navigation.setOptions({
    headerTransparent: true, // hace la barra de navegación transparente
    headerTitle: "PALEOVERTEBRADOS",
    headerBackTitle: "Atrás",
    // headerTintColor: "#fff", // cambia el color de la flecha de retroceso a blanco
    headerTitleAlign: "center",
  });
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
              save="value"
              placeholder="GENERO"
              onSelect={filtrarEspecimen(selectedgen, "genero")}
            />
            <SelectList
              setSelected={(val) => setSelectedes(val)}
              data={especies}
              save="value"
              placeholder="ESPECIES"
              onSelect={filtrarEspecimen(selectedes, "especie")}
            />
          </View>

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
                      style={[
                        styles.row,
                        index % 2 && { backgroundColor: "#F7F6E7" },
                      ]}
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
    console.log("entra especimenes");
    if (numeros.length === 0) {
      console.log("entra numeros");
      let num = [];
      especimenes.map((ele) => {
        num.push(ele.especimennumero);
      });
      setNumeros(num);
    }

    //console.log(numeros);
  }

  function handleSearch() {
    let filter = especimenes.filter(
      (e) => e.especimennumero == inputValue.toString() + "000"
    );
    setFiltrado(filter);
  }

  var y = 1;

  const handleSearch2 = async (id) => {
    try {
      const response = await fetch(
        `https://pv.tablinum.host/api/especimen/id?id=${id}`
      );
      const data = await response.json();
      navigation.navigate("Results", { results: data });
    } catch (error) {
      console.error(error);
    }
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
          if (!genero.includes(e.genero)) {
            genero.push({ key: key.toString(), value: e.genero });
            key++;
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
          if (!especie.includes(e.especie)) {
            especie.push({ key: key.toString(), value: e.especie });
            key++;
          }
        })
      : "";
    setIsLoading(false); // Agregar setIsLoading aquí
    setEspecies(especie);
  };

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
    }
  };

  useEffect(() => {
    getEspecimenes();
  }, []);

  if (especimenes.length > 0 && generos.length == 0) {
    getGeneros();
    getEspecies();
  }

  return isLoading ? (
    <Image style={styles.image} source={carganado} resizeMode="contain" />
  ) : especimenes && generos ? (
    <>
      <Image source={fondo} style={styles.backgroundImage} />

      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Ingrese un número"
        keyboardType="numeric"
      />
      <TouchableOpacity
        title="BUSCAR"
        style={styles.boton}
        onPress={() => {
          handleSearch();
        }}
      >
        <Text>hola</Text>
      </TouchableOpacity>

      <ExampleThree></ExampleThree>
    </>
  ) : (
    "toto"
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  header: {
    height: 50,
    backgroundColor: "#537791",
    marginTop: 30,
    color: "#fff",
  },
  text: { textAlign: "center", fontWeight: "400" },
  dataWrapper: { marginTop: -1 },
  row: { height: 80, backgroundColor: "#E7E6E1" },
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
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  boton: {
    backgroundColor: "#456789",
    height: "5%",
    textAlign: "center",
    justifyContent: "center",
    width: "90%",
    marginLeft: "5%",
  },
  selectEsp: {
    backgroundColor: "#123456",
  },
});

export default SearchScreen;
