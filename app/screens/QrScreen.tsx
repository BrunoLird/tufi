import React, {FC} from "react"
import {Button, View, ViewStyle} from "react-native"
import {Text} from "app/components"
import {AppStackScreenProps} from "../navigators"


export const QrScreen: FC<AppStackScreenProps<"QrScreen">> =
    function DemoCommunityScreen(_props) {


        return (
            <View style={$container}>
                <Text>Hola es the QR screen</Text>
                <Button
                    title="Click in QR"
                    onPress={() => alert("This is QR screen")}
                />
            </View>
        )
    }

const $container: ViewStyle = {
    flex: 1,
}
