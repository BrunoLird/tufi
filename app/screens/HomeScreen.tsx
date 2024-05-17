import React, { FC } from "react"
import { Button, ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "app/components"
import { AppStackScreenProps } from "../navigators"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { MiniCarrousel } from "app/components/MiniCarrousel"


export const HomeScreen: FC<AppStackScreenProps<"HomeScreen">> =
  function DemoCommunityScreen(_props) {
    const CustomSeparator = () => (
      <View style={{ width: 1, height: "100%", backgroundColor: "#C4C4C4", marginHorizontal: 10 }} />
    )

    return (
      <ScrollView>
        <View style={$container}>
          <View>
            <Text style={$title} weight={"bold"}>Cuentas</Text>
          </View>
          <View style={$accountCard}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text weight={"bold"}>Cuenta Corriente</Text>
                <Text weight={"bold"}>6638465901</Text>
                <Text size={"xs"}>BRUNO LIRD</Text>
              </View>
              <View>
                <MaterialCommunityIcons name="bank" size={30} color={"#748c94"} />
              </View>
            </View>
          </View>
          <View style={{
            alignItems: "flex-end",
            backgroundColor: "#d3dfa1",
            top: -15,
            padding: 5,
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
          }}>
            <Text>Saldo disponible</Text>
            <Text weight={"bold"}>297.438.503 GS</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <View>
              <Text style={$title} weight={"bold"}>Novedades</Text>
            </View>
            <MiniCarrousel />
          </View>

          <View>
            <Text style={$title} weight={"bold"}>Desembolso</Text>
          </View>
          <View style={$accountCard}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text weight={"bold"}>Prestamo pre-aprobado</Text>
                <Text weight={"bold"}>5.000.000 GS</Text>
                <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "space-evenly" }}>
                  <Button
                    title="Aceptar
                " onPress={() => alert("Aceptar")} />
                  <CustomSeparator />
                  <Button
                    title="Gracias"
                    onPress={() => alert("Rechazar")} />
                </View>
              </View>
              <View>

                <MaterialCommunityIcons name="gift" size={30} color={"#748c94"} />
              </View>
            </View>
          </View>
          <Button
            title="Click in home"
            onPress={() => alert("This is home screen")}
          />
        </View>
      </ScrollView>
    )
  }

const $container: ViewStyle = {
  flex: 1,
  padding: 20,
}
const $title: TextStyle = {
  fontSize: 20,
}
const $accountCard: ViewStyle = {
  padding: 20,
  marginVertical: 10,
  backgroundColor: "#e9efd0",
  borderRadius: 10,
}

