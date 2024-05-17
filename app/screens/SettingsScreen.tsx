import React, {FC} from "react";
import {Button, FlatList, TextStyle, View, ViewStyle} from "react-native";
import {Text} from "app/components";
import { AppStackScreenProps } from "../navigators"
import {MaterialIcons} from "@expo/vector-icons";

// Dummy data para las opciones de configuración
const settingsData = [
    {label: "Feedback", description: "Envíanos tus comentarios", iconName: "feedback"},
    {
        label: "Notificaciones",
        description: "Mantente al tanto de todo lo que sucede en Title Clique",
        iconName: "notifications"
    },
    {label: "Cambiar Contraseña", description: "Actualiza la contraseña de tu cuenta para acceder", iconName: "lock"},
    {
        label: "Términos y Condiciones",
        description: "Aprende sobre los términos y condiciones para usar Title Clique",
        iconName: "description"
    },
];

export const SettingsScreen: FC<AppStackScreenProps<"SettingsScreen">> = (_props) => {

    // Renderización de cada elemento de la lista
    const renderItem = ({item}) => (
        <>
            <View style={$item}>
                <MaterialIcons name={item.iconName} size={24} color="#9cb72b"/>
                <View style={$textContainer}>
                    <Text style={$label}>{item.label}</Text>
                    <Text style={$description}>{item.description}</Text>
                </View>
            </View>
            <View style={$divider}/>
        </>
    );

    return (
        <View style={$container}>
            <FlatList
                data={settingsData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
            <Button
                title="Haz clic en Configuración"
                onPress={() => alert("Esta es la pantalla de configuración")}
            />
        </View>
    );
};

const $container: ViewStyle = {
    flex: 1,
    padding: 30,
};

const $item: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
};

const $textContainer: ViewStyle = {
    marginLeft: 10,
};

const $label: TextStyle = {
    fontSize: 18,
    fontWeight: "bold",
};

const $description: TextStyle = {
    fontSize: 14,
    color: "gray",
};

const $divider: ViewStyle = {
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    marginBottom: 20,
};
