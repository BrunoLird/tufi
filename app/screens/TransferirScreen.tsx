import React, {FC, useState} from "react";
import {TextInput, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native"
import {Text} from "app/components";
import { AppStackScreenProps } from "../navigators"
import {colors} from "app/theme"

export const TransferirScreen: FC<AppStackScreenProps<"TransferirScreen">> =
    function TransferirScreen(_props) {
        const [transferAmount, setTransferAmount] = useState("");
        const [saldoDisponible, setSaldoDisponible] = useState(297438503); // Saldo inicial

        // Función para formatear el valor ingresado con puntos cada tres dígitos
        const formatNumberWithPoints = (numberString: string) => {
            // Eliminar puntos actuales y cualquier carácter que no sea dígito
            const value = numberString.replace(/\D/g, "");
            // Agregar puntos cada tres dígitos
            return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        };

        const handleTransferAmountChange = (value: string) => {
            // Formateo el valor ingresado y actualizar el estado
            setTransferAmount(formatNumberWithPoints(value));

            // Calculo nuevo saldo disponible
            const amount = parseInt(value.replace(/\D/g, ""), 10);
            const nuevoSaldo = 297438503 - amount;
            setSaldoDisponible(nuevoSaldo < 0 ? 0 : nuevoSaldo);
        };


        return (
            <View style={$container}>
                <View>
                    <Text style={$title}>¿Cuánto vas a transferir?</Text>
                </View>
                <View style={$amountContainer}>
                    <Text style={$gsText}>GS</Text>
                    <TextInput
                        style={$textInput}
                        placeholder="Cantidad"
                        keyboardType="numeric"
                        value={transferAmount}
                        onChangeText={handleTransferAmountChange}
                    />
                </View>
                <View>
                    <Text>Saldo
                        disponible: {transferAmount ? formatNumberWithPoints(saldoDisponible.toString()) : formatNumberWithPoints("297438503")}</Text>
                </View>

                <View style={$continueButtonContainer}>
                    <TouchableOpacity
                        style={$continueButton}
                        onPress={() => console.log("Continuar")}
                    >
                        <Text style={$continueButtonText}>Continuar</Text>
                    </TouchableOpacity>
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
const $amountContainer: ViewStyle = {
    backgroundColor: "#d3dfa1",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 10,
};
const $gsText: TextStyle = {
    fontSize: 18,
    marginRight: 5,
};
const $textInput: ViewStyle = {
    paddingHorizontal: 10,
    flex: 1,
    height: 60,
    marginLeft: 5,
};
const $continueButtonContainer: ViewStyle = {
    alignItems: "center",
    marginTop: 20,
};
const $continueButton: ViewStyle = {
    backgroundColor: colors.palette.primaryT500,
    borderRadius: 10,
    padding: 10,
};
const $continueButtonText: TextStyle = {
    color: "#fff",
    fontSize: 24,
    padding: 7,
    fontWeight: "bold",
};
