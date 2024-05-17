import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Icon, Text } from "../components"
import { AppStackScreenProps, navigate } from "../navigators"
import { colors } from "../theme"
import { Field, FormikProvider, useFormik } from "formik"
import * as Yup from "yup"
import { FormikInput } from "app/components/FormikInput"
import { Checkbox } from "app/components/checkbox/checkbox"
import { ROUTES } from "app/utils/constants"


interface SignUpScreenProps extends AppStackScreenProps<"Welcome"> {
  onSwitchScreen: () => void;
}

export const SignUpScreen: FC<SignUpScreenProps> = observer(function SignUpScreen(_props) {


  const [loading, setLoading] = useState(false)


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required("You must provide your email address."),
      password: Yup.string().required("You must provide a password."),
      confirm_password: Yup.string().oneOf([Yup.ref("password")], "Password does not match").required("You must confirm your password to proceed."),
      agreedToTerms: Yup.boolean().oneOf([true]),
    }),
    onSubmit: (values) => {
      // setLoading(true)
      // signup(values)
    },
  })

  return (
    <View style={$container}>
      {/* <View style={$bottomContainer}> */}
      <FormikProvider value={formik}>
        <Field
          component={FormikInput}
          name="email"
          type="email"
          label="Email"
          placeholder="Type your email"
          // onSubmitEditing={() => authPasswordInput.current?.focus()}
          LeftAccessory={(props) => (
            <Icon
              containerStyle={props.style}
              icon="mail"
              color={colors.palette.neutral900}
            />
          )}
        />
        <Field
          component={FormikInput}
          name="password"
          type="password"
          label="Enter your password"
          placeholder="Enter your password"
          // onSubmitEditing={() => authPasswordInput.current?.focus()}
          LeftAccessory={(props) => (
            <Icon
              containerStyle={props.style}
              icon="lock"
              color={colors.palette.neutral900}
              style={{ marginTop: 8 }}
            />
          )}
        />
        <Field
          component={FormikInput}
          name="confirm_password"
          type="password"
          label="Confirm your password"
          placeholder="Confirm your password"
          // onSubmitEditing={() => authPasswordInput.current?.focus()}
          LeftAccessory={(props) => (
            <Icon
              containerStyle={props.style}
              icon="lock"
              color={colors.palette.neutral900}
              style={{ marginTop: 8 }}
            />
          )}
        />

        <Button
          preset={"filled"}
          // loading={loading}
          // disabled={loading}
          style={$button}
          onPress={() => formik.handleSubmit()}
          textStyle={{ color: "white" }}
        >
          Registrarse
        </Button>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 25, alignSelf: 'center' }}>
          <Text style={{ fontSize: 14, textAlign: 'center', color: colors.palette.neutral900 }}>
            ¿Tenés una cuenta?  {""}
          </Text>
          <TouchableOpacity onPress={_props.onSwitchScreen}>
            <Text weight={"bold"} style={{ color: colors.palette.primaryT500 }}>Registrate</Text>
          </TouchableOpacity>
        </View>
      </FormikProvider>
      {/* </View> */}


    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
}
const $checkbox: ViewStyle = {
  marginRight: 20,
  justifyContent: "center",
  alignItems: "center",
}

const $checkboxText: TextStyle = {
  color: colors.palette.neutral900,
}

const $forgotPassword: TextStyle = {
  fontSize: 14,
  color: colors.palette.primaryT500,
  textAlign: "right",
  marginTop: 10,
}
const $button: ViewStyle = {
  width: "47%",
  backgroundColor: colors.palette.primaryT500,
  alignSelf: "center",
}
const $newAccount: TextStyle = {
  fontSize: 14,
  textAlign: "center",
  marginTop: 25,
}
