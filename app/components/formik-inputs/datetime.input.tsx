import RNDateTimePicker from "@react-native-community/datetimepicker"
import { translate } from "app/i18n"
import { colors } from "app/theme"
// import { date_fmt } from "app/utils/helpers"
import React, { useMemo, useState } from "react"
import { Platform, TouchableOpacity, ViewStyle } from "react-native"
import { Masks, useMaskedInputProps } from "react-native-mask-input"
import { Button } from "../Button"
import { Icon } from "../Icon"
// import { ModalCalendar } from "../ModalCalendar/modal-calendar"
import { TextField, TextFieldAccessoryProps } from "../TextField"

export function FormikInputTime(props: any) {
  const {
    placeholder,
    innerRef,
    field: { name, onBlur, onChange, value },
    form: { errors, setFieldTouched, setFieldValue },
    ...inputProps
  } = props
  const hasError = errors[name]
  const [showModalSelector, setShowModalSelector] = useState(false)
  const [selectedTime, setSelectedTime] = useState(new Date())
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
            }}
          />
        )
      },
    [showModalSelector],
  )

  // const onChangeTime = (_, selectedDate) => {
  //   if (Platform.OS === "android") {
  //     setFieldValue(name, `${date_fmt(selectedDate, "hh:mm:ss")}`)
  //     setShowModalSelector(false)
  //   } else {
  //     setSelectedTime(selectedDate)
  //   }
  // }
  //
  // const saveChanges = () => {
  //   setFieldValue(name, `${date_fmt(selectedTime, "hh:mm:ss")}`)
  //   setShowModalSelector(false)
  // }

  return (
    <TouchableOpacity
      onPress={() => {
        setShowModalSelector(true)
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
        value={value}
        containerStyle={hasError ? $textFieldWithError : $textField}
        helper={hasError ? errors[name] : ""}
        status={hasError ? "error" : undefined}
        RightAccessory={SelectRightAccessory}
        {...inputProps}
        editable={false}
      />
      {showModalSelector && (
        <>
          <RNDateTimePicker
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            textColor={colors.palette.neutral900}
            themeVariant="light"
            onChange={onChangeTime}
            value={selectedTime}
            locale="en-US"
          />
          {Platform.OS === "ios" && (
            <>
              <Button preset={"filled"} style={$datePickerButtons} onPress={() => saveChanges()}>
                {inputProps.confirmButton || 'Save'}
              </Button>
              <Button
                preset="reversed"
                style={$datePickerButtons}
                onPress={() => setShowModalSelector(false)}
              >
                {inputProps.cancelButton || translate("common.cancel")}
              </Button>
            </>
          )}
        </>
      )}
    </TouchableOpacity>
  )
}

export function FormikInputDate(props: any) {
  const {
    placeholder,

    placeholderTextColor,
    innerRef,

    closeOnClick,
    isOpen,
    field: { name, onBlur, onChange, value },
    form: { errors, setFieldTouched, setFieldValue },
    ...inputProps
  } = props
  const hasError = errors[name]
  const [showModalSelector, setShowModalSelector] = useState(false)
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
        placeholderTextColor={placeholderTextColor}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name)
          onBlur(name)
        }}
        autoCapitalize="none"
        autoCorrect={false}
        containerStyle={hasError ? $textFieldWithError : $textField}
        helper={hasError ? errors[name] : ""}
        status={hasError ? "error" : undefined}
        RightAccessory={SelectRightAccessory}
        {...inputProps}
        value={value}
        editable={false}
      />
      {/* <ModalCalendar */}
      {/*   closeOnClick={closeOnClick} */}
      {/*   action={(value) => { */}
      {/*     setFieldValue(name, `${date_fmt(value, "YYYY-MM-DD")}`) */}
      {/*   }} */}
      {/*   value={value} */}
      {/*   visible={showModalSelector} */}
      {/*   setVisible={(val) => { */}
      {/*     setShowModalSelector(val) */}
      {/*     isOpen(val) */}
      {/*   }} */}
      {/*   displaySelector={false} */}
      {/*   itemKey="label" */}
      {/* /> */}
    </TouchableOpacity>
  )
}

export function FormikInputDateMask(props: any) {
  const {
    placeholder,
    innerRef,
    field: { name, onBlur, value },
    form: { errors, setFieldTouched, setFieldValue },
    ...inputProps
  } = props
  const hasError = errors[name]
  const [inputVal, setInputVal] = React.useState(value)

  const maskedInputProps = useMaskedInputProps({
    mask: props.mask || Masks.DATE_DDMMYYYY,
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
      keyboardType="number-pad"
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
const $flex: ViewStyle = { flex: 1 }
const $datePickerButtons: ViewStyle = { marginBottom: 10 }
const $inputStyleError: ViewStyle = {
  borderBottomWidth: 0.5,
  borderBottomColor: colors.palette.angry500,

}
const $inputStyle: ViewStyle = {
  borderBottomWidth: 0.5,
  borderBottomColor: colors.palette.purple,
}
