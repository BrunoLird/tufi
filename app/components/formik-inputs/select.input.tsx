import { TextField, TextFieldAccessoryProps } from "../TextField"
import React, { useMemo, useState } from "react"
import { TouchableOpacity, ViewStyle } from "react-native"
import { Icon } from "../Icon"
import { colors } from "app/theme"
import { ModalSelector } from "../ModalSelector/modal-selector"
import { translate } from "app/i18n"

export function FormikInputSelect(props: any) {
  const {
    placeholder,
    innerRef,
    options = [],
    closeOnClick,
    setValueId,
    isOpen = () => {},

    labelFieldName = "label",
    valueFieldName = "value",
    field: { name, onBlur, onChange, value },
    form: { errors, setFieldTouched, setFieldValue },
    ...inputProps
  } = props
  const hasError = errors[name]
  const [showModalSelector, setShowModalSelector] = useState(false)

  const getValue = () => {
    if (Array.isArray(options)) {
      if (options.length === 0) {
        return value?.[labelFieldName]
      } else {
        return options.find((val) => val?.[valueFieldName] === value)?.[labelFieldName]  || props?.field?.value?.[labelFieldName]
      }
    } else {
      return props?.field?.value?.[labelFieldName] || null
    }
  }

  const SelectRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon="caretDown"
            color={colors.palette.neutral500}
            containerStyle={props.style}
            onPress={() => {
              setShowModalSelector(!showModalSelector)
              isOpen(!showModalSelector)
            }}
          />
        )
      },
    [showModalSelector],
  )

  return (
    <TouchableOpacity
      onPress={() => {
        setShowModalSelector(!showModalSelector)
        isOpen(!showModalSelector)
      }}
      style={$flex}
    >
      <TextField
        ref={innerRef}
        placeholder={placeholder}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name)
          onBlur(name)
        }}
        autoCapitalize="none"
        autoCorrect={false}
        value={getValue()}
        containerStyle={hasError ? $textFieldWithError : $textField}
        helper={hasError ? errors[name] : ""}
        status={hasError ? "error" : undefined}
        RightAccessory={SelectRightAccessory}
        {...inputProps}
        editable={false}
        onPressIn={() => {
          setShowModalSelector(true)
          isOpen(true)
        }}
      />

      <ModalSelector
        {...inputProps}
        closeOnClick={closeOnClick}
        options={options}
        action={(value) => {
          setFieldValue(name, value.value)
          setValueId?.(value.value)
        }}
        title={placeholder || translate("common.selectOption")}
        value={value}
        visible={showModalSelector}
        setVisible={(val) => {
          setShowModalSelector(val)
          isOpen(val)
        }}
        displaySelector={false}
        itemKey="label"
      />
    </TouchableOpacity>
  )
}
const $flex: ViewStyle = { flex: 1 }
const $textFieldWithError: ViewStyle = {
  marginBottom: 0,
}

const $textField: ViewStyle = {
  marginBottom: 32,
}
