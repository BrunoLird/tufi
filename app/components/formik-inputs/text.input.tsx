import { colors, spacing } from "app/theme"
import React, { useMemo, useState } from "react"
import { ViewStyle } from "react-native"
import { useMaskedInputProps } from "react-native-mask-input"
import { Icon } from "../Icon"
import { TextField } from "../TextField"

export function FormikInputText(props: any) {
  const {
    placeholder,
    innerRef,
    field: { name, onBlur, onChange, value },
    form: { errors, setFieldTouched },
    containerStyle,
    ...inputProps
  } = props

  const hasError = errors[name]

  return (
    <TextField
      ref={innerRef}
      placeholder={placeholder}
      onChangeText={(text) => onChange(name)(text)}
      onBlur={() => {
        setFieldTouched(name)
        onBlur(name)
      }}
      autoCorrect={false}
      keyboardType="default"
      value={value}
      autoCapitalize="sentences"
      containerStyle={[hasError ? $textFieldWithError : $textField, containerStyle || {}]}
      helper={hasError ? errors[name] : ""}
      status={hasError ? "error" : undefined}
      {...inputProps}
    />
  )
}
export function FormikInputPassword(props: any) {
  const {
    placeholder,
    innerRef,
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props
  const hasError = errors[name] && touched[name]
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory() {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral500}
            style={{ margin: spacing.sm }}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  return (
    <TextField
      ref={innerRef}
      placeholder={placeholder}
      onChangeText={(text) => onChange(name)(text)}
      onBlur={() => {
        setFieldTouched(name)
        onBlur(name)
      }}
      autoCapitalize="none"
      autoComplete="password"
      autoCorrect={false}
      secureTextEntry={isAuthPasswordHidden}
      value={value}
      style={{ paddingTop: isAuthPasswordHidden ? 6 : 0}}
      containerStyle={hasError ? $textFieldWithError : $textField}
      helper={hasError ? errors[name] : ""}
      status={hasError ? "error" : undefined}
      {...inputProps}
      RightAccessory={PasswordRightAccessory}
    />
  )
}
export function FormikInputEmail(props: any) {
  const {
    placeholder,
    innerRef,
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props
  const hasError = errors[name] && touched[name]

  return (
    <TextField
      ref={innerRef}
      placeholder={placeholder}
      onChangeText={(text) => onChange(name)(text)}
      onBlur={() => {
        setFieldTouched(name)
        onBlur(name)
      }}
      autoComplete="email"
      autoCapitalize="none"
      autoCorrect={false}
      value={value}
      containerStyle={hasError ? $textFieldWithError : $textField}
      helper={hasError ? errors[name] : ""}
      status={hasError ? "error" : undefined}
      {...inputProps}
    />
  )
}
export function FormikMaskedTextInput(props: any) {
  const {
    placeholder,
    innerRef,
    mask,
    field: { name, onBlur, value },
    form: { errors, setFieldTouched, setFieldValue },
    ...inputProps
  } = props
  const hasError = errors[name]
  const [inputVal, setInputVal] = React.useState(value)

  const maskedInputProps = useMaskedInputProps({
    mask,
    onChangeText: (val) => {
      setInputVal(val)
      setFieldValue(name, val)
    },
    value: inputVal,
  })

  return (
    <TextField
      ref={innerRef}
      onBlur={() => {
        setFieldTouched(name)
        onBlur(name)
      }}
      autoCorrect={false}
      keyboardType="default"
      containerStyle={hasError ? $textFieldWithError : $textField}
      helper={hasError ? errors[name] : ""}
      status={hasError ? "error" : undefined}
      {...inputProps}
      {...maskedInputProps}
      placeholder={placeholder}
      value={value}
    />
  )
}
const $textFieldWithError: ViewStyle = {
  marginBottom: 0,
}

const $textField: ViewStyle = {
  marginBottom: 32,
}
