import { colors } from "app/theme"
import React from "react"
import { Switch } from "react-native-gesture-handler"
import { Toggle } from "../Toggle"

export function FormikInputBoolean(props: any) {
  const {
    placeholder,
    // innerRef,
    field: { name, value },
    form: { setFieldValue },
    ...inputProps
  } = props

  const [val, setValue] = React.useState(value)
  return (
    <Toggle
      label={placeholder}
      value={val}
      onPress={() => {
        setValue(!val)
        setFieldValue(name, !val)
      }}
      {...inputProps}
    />
  )
}

export function FormikInputSwitch(props: any) {
  const {
    field: { name, value },
    form: { setFieldValue },
    onValueChange,
  } = props

  return (
    <Switch
      trackColor={{ false: colors.palette.neutral500, true: colors.palette.primary600 }}
      thumbColor={"#fff"}
      ios_backgroundColor={colors.palette.neutral500}
      onValueChange={(value) => {
        setFieldValue(name, value)
      }}
      value={value}
    />
  )
}
