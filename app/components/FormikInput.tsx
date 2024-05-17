import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { colors } from "../theme"

import { Text } from "app/components"
import PhoneInput from "react-native-phone-number-input"
import {
  FormikInputBoolean,
  FormikInputCode,
  FormikInputDate,
  FormikInputDateMask,
  FormikInputEmail,
  FormikInputPassword,
  FormikInputSelect,
  FormikInputSwitch,
  FormikInputText,
  FormikInputTime,
  FormikMaskedTextInput,
} from "./formik-inputs"

export const FieldTypes = {
  phone: "phone_input",
  password: "password",
  number: "number",
  checkbox: "checkbox",
  select: "select",
  autocomplete: "autocomplete",
  date: "date",
  file: "file",
  textarea: "textarea",
  text: "text",
  email: "email",
  datetime: "datetime",
  boolean: "boolean",
  date_mask: "date_mask",
  switch: "switch",
  masked_text: "masked_text",
  otp_code: "otp_code",
}

function FormikInputPhone(props: any) {
  const $innerContainerStyle: TextStyle = {
    backgroundColor: colors.palette.neutral100,
    width: "100%",
    color: colors.palette.neutral100,
    height: 65,
    borderRadius: 10,
  }

  const $containerStyleError: TextStyle = {
    borderWidth: 1,
    padding: 1.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: colors.palette.primary600,
  }

  const $containerStyle: ViewStyle = {
    borderColor: colors.palette.primary600,
    borderWidth: 1,
    backgroundColor: colors.palette.neutral200,
    padding: 1.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 32
  }

  const $textInputStyle: TextStyle = {
    color: colors.palette.neutral700,
    height: 40,
  }

  const $codeTextStyle: TextStyle = {
    color: colors.palette.neutral700,
  }

  const $errorText: TextStyle = {
    color: colors.palette.angry500,
    marginTop: 8,
  }

  const {
    placeholder,
    innerRef,
    label,
    countryCode = 'US',
    field: { name, onChange, value },
    form: { errors },
    ...inputProps
  } = props

  const hasError = errors[name]

  return (
    <View>
      <Text style={$datePickerButtons}>{label}</Text>
      <View style={[hasError ? $containerStyleError : $containerStyle, inputProps.containerStyle]}>
        <PhoneInput
          ref={innerRef}
          defaultValue={value}
          defaultCode={countryCode}
          layout="first"
          onChangeText={() => null}
          onChangeFormattedText={(text) => {
            onChange(name)(text)
          }}
          placeholder={' '}
          withDarkTheme
          withShadow={false}
          autoFocus={false}
          textContainerStyle={{
            backgroundColor: colors.palette.blackOverlay(0),
            borderColor: colors.palette.neutral700,
            color: colors.palette.neutral100,
          }}
          textInputProps={{ placeholderTextColor: colors.palette.neutral500 }}
          textInputStyle={$textInputStyle}
          codeTextStyle={$codeTextStyle}
          {...inputProps}
          containerStyle={$innerContainerStyle}
        />
      </View>
      {hasError && <Text style={$errorText}>{errors[name]}</Text>}
    </View>
  )
}

export const FormikInput = (props: any) => {
  let component = null

  switch (props.type) {
    case FieldTypes.phone:
      component = <FormikInputPhone {...props} />
      break
    case FieldTypes.textarea:
      component = <FormikInputText multiline numberOfLines={6} {...props} />
      break
    case FieldTypes.select:
      component = <FormikInputSelect {...props} />
      break
    case FieldTypes.autocomplete:
      // component = <AutocompleteFK {...props} />
      break
    case FieldTypes.date:
      component = <FormikInputDate {...props} />
      break
    case FieldTypes.datetime:
      component = <FormikInputTime {...props} />
      break
    case FieldTypes.email:
      component = <FormikInputEmail {...props} />
      break
    case FieldTypes.password:
      component = <FormikInputPassword {...props} />
      break
    case FieldTypes.boolean:
      component = <FormikInputBoolean {...props} />
      break
    case FieldTypes.date_mask:
      component = <FormikInputDateMask {...props} />
      break
    case FieldTypes.file:
      // component = <FormikFileInput {...props} />
      break
    case FieldTypes.switch:
      component = <FormikInputSwitch {...props} />
      break
    case FieldTypes.number:
      component = <FormikInputText keyboardType="phone-pad" {...props} />
      break
    case FieldTypes.masked_text:
      component = <FormikMaskedTextInput {...props} />
      break
    case FieldTypes.otp_code:
      component = <FormikInputCode {...props} />
      break
    default:
      component = <FormikInputText {...props} />
  }
  return component
}

const $datePickerButtons: ViewStyle = { marginBottom: 10 }
