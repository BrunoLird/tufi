import React, { FC, useState } from "react";
import { FlatList, Image, TextInput, TextStyle, View, ViewStyle } from "react-native";
import { Text } from "app/components";
import { AppStackScreenProps } from "../navigators"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "app/theme";

// Dummy data para los botones
const buttonsData = [
  { label: "Escanear QR", iconName: "qrcode-scan" },
  { label: "Prestamos", iconName: "bank-check" },
  { label: "Tarjetas", iconName: "credit-card-check" },
  { label: "Bienes", iconName: "hand-coin" },
];

const dataList = [
  { title: "Ande", image: require("../../assets/images/ande.png") },
  { title: "Essap", image: require("../../assets/images/essap.png") },
  { title: "Tigo", image: require("../../assets/images/tigo.png") },
  { title: "Claro", image: require("../../assets/images/claro.png") },
  { title: "Club Olimpia", image: require("../../assets/images/olimpia.png") },
  { title: "Club Cerro Porteño", image: require("../../assets/images/cerro.png") },
];

export const PagarScreen: FC<AppStackScreenProps<"PagarScreen">> = (_props) => {
  const [searchText, setSearchText] = useState("");

  // Función para filtrar los elementos de la lista
  const filteredData = dataList.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // Renderización de cada elemento de la lista
  const renderItem = ({ item }) => (
    <View style={$item}>
      <Image source={item.image} style={styles.image} />
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View style={$container}>
      <View>
        <Text style={$title} weight={"bold"}>¿Qué querés pagar hoy?</Text>
      </View>

      {/* Mapeo de los botones */}
      <View style={$buttonContainer}>
        {buttonsData.map((button, index) => (
          <View key={index} style={$buttonItem}>
            <View style={$buttonIconContainer}>
              <MaterialCommunityIcons name={button.iconName} size={30} color="white" />
            </View>
            <Text>{button.label}</Text>
          </View>
        ))}
      </View>

      <View style={{ marginTop: 40 }}>
        <TextInput
          style={$searchInput}
          onChangeText={setSearchText}
          value={searchText}
          placeholder="Buscar..."
        />

        {/* FlatList de elementos */}
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const $container: ViewStyle = {
  flex: 1,
  padding: 20,
};

const $title: TextStyle = {
  fontSize: 20,
};

const $buttonContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 20,
};

const $buttonItem: ViewStyle = {
  alignItems: "center",
};

const $buttonIconContainer: ViewStyle = {
  backgroundColor: colors.palette.primaryT200,
  borderRadius: 50,
  width: 60,
  height: 60,
  padding: 10,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 5,
};

const $searchInput: TextStyle = {
  height: 40,
  borderColor: "gray",
  borderWidth: 1,
  borderRadius: 10,
  padding: 10,
  marginBottom: 20,
};

const $item: ViewStyle = {
  flexDirection: "row",
  // justifyContent: "space-between",
  gap: 20,
  alignItems: "center",
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.primaryT100,
};

const styles = {
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    padding: 10,
    resizeMode: "contain",
  },
};
