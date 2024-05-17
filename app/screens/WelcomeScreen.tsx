import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import {
  Text,
} from "app/components"
import { isRTL } from "../i18n"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { LoginScreen } from "app/screens/LoginScreen"
import { SignUpScreen } from "app/screens/SignUpScreen"
// eslint-disable-next-line import/no-duplicates
import { ScrollView } from 'react-native';



const logoTuFinanciera = require("../../assets/images/logoTuFinanciera.jpg")
const welcomeFace = require("assets/images/welcomeFace.png")
const welcomeFace2 = require("assets/images/welcomeFace2.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {
}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const [currentScreen, setCurrentScreen] = useState(1);


  // @ts-ignore
  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Image style={getWelcomeLogo(currentScreen)} source={logoTuFinanciera} resizeMode="contain" />
        <Text style={{...$welcomeHeading,...shadowText }} preset="heading">
          {currentScreen === 1? "El dinero que necesitas" :
            <>
              <View style={{flexDirection: "column"}}>
              <Text style={{...$welcomeHeading,...shadowText}} preset="heading">Préstamo</Text>
              <Text style={{...$welcomeHeading,...shadowText}} preset="heading">aprobado</Text>
              </View>
            </>
          }
        </Text>
        <Text style={{...shadowText, marginBottom: currentScreen === 2? spacing.xl : 0 }} preset="subheading">Rápido y fácil</Text>
        <Image style={$welcomeFace} source={currentScreen === 2? welcomeFace2 : welcomeFace} resizeMode="contain" />
      </View>

      <View style={[getBottomContainerStyle(currentScreen), $bottomContainerInsets]}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {currentScreen === 1? <LoginScreen onSwitchScreen={() => setCurrentScreen(2)} /> : <SignUpScreen onSwitchScreen={() => setCurrentScreen(1)} />}
        </ScrollView>
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.primaryT100,
}
const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "37%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}
const getBottomContainerStyle = (currentScreen: any) => ({
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: currentScreen === 2 ? "55%" : "50%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.xl,
  justifyContent: "space-between",
});

const getWelcomeLogo =  (currentScreen: any) => ({
  height: 220,
  width: "100%",
  marginBottom: currentScreen === 2 ? -spacing.xl : spacing.xl,
})

const $welcomeFace: ImageStyle = {
  height: 269,
  width: 330,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
  shadowColor: colors.palette.neutral700,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.35,
  shadowRadius: 3.84,
}
const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
}
const shadowText: TextStyle = {
  color: colors.palette.neutral200,
  textShadowColor: colors.palette.neutral500,
  textShadowOffset: {
    width: 0,
    height: 1,
  },
  textShadowRadius: 1,
}