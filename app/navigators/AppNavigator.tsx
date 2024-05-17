import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
} from "@react-navigation/native"
import {createNativeStackNavigator, NativeStackScreenProps} from "@react-navigation/native-stack"
import {observer} from "mobx-react-lite"
import React from "react"
import {useColorScheme} from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import {navigationRef, useBackButtonHandler} from "./navigationUtilities"
import {ROUTES} from "app/utils/constants"
import {colors} from "../theme"
import {DrawerNavigator} from "./DrawerNavigator"

export type AppStackParamList = {
    Welcome: undefined
    Feed: undefined
    Settings: undefined
    Login: undefined
    HomeScreen: undefined
    PagarScreen: undefined
    SettingsScreen: undefined
    TransferirScreen: undefined
    QrScreen: undefined
}

const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
    AppStackParamList,
    T
>
const Stack = createNativeStackNavigator<AppStackParamList>()


const AppStack = observer(function AppStack() {

    return (
        <Stack.Navigator
            screenOptions={{headerShown: false, navigationBarColor: colors.background, animation: 'none'}}
            initialRouteName={ROUTES.WELCOME}
        >
            <Stack.Screen name={ROUTES.WELCOME} component={Screens.WelcomeScreen}/>
            <Stack.Screen name={ROUTES.FEED} component={DrawerNavigator}/>

        </Stack.Navigator>
    )
})

export interface NavigationProps
    extends Partial<React.ComponentProps<typeof NavigationContainer>> {
}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
    const colorScheme = useColorScheme()

    useBackButtonHandler((routeName) => exitRoutes.includes(routeName as keyof AppStackParamList))

    return (
        <NavigationContainer
            ref={navigationRef}
            theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            {...props}
        >
            <AppStack/>
        </NavigationContainer>
    )
})
