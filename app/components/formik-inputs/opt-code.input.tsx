import React, { useEffect, useState } from "react"
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field"
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { colors } from "app/theme"
import { Text as StyledText } from "app/components"
import moment, { Duration, Moment } from "moment"
interface CodeInputProps {
  field: { [k: string]: any }
  form: { [k: string]: any }
  cellCount: number
  onSubmitEditing?: () => void
  containerStyle: ViewStyle
  cellStyles?: TextStyle
  errorCellStyle?: TextStyle
  focusCellStyle?: TextStyle
  placeholderStyle?: TextStyle
  placeholder?: string
  resendCodeAfterMinutes?: number
  resendCode?: () => void
  resendCodeButtonText?: string
  until?: moment.Moment
  hideValue: boolean
}

interface CountdownProps {
  until: Moment
  onCountdownDone: () => void
}

const Countdown: React.FC<CountdownProps> = ({ until, onCountdownDone }) => {
  const [remainingTime, setRemainingTime] = useState<Duration | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment()
      const duration: Duration = moment.duration(until.diff(now))

      if (duration.asMilliseconds() <= 0) {
        clearInterval(interval)
        setRemainingTime(null)
        onCountdownDone()
      } else {
        setRemainingTime(duration)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [until])

  const formatTime = (time: number): string => {
    return `${time}`.padStart(2, "0")
  }

  return (
    remainingTime && (
      <StyledText preset="subheading" style={$countdown}>
        {`${formatTime(remainingTime.minutes())}:${formatTime(remainingTime.seconds())}`}
      </StyledText>
    )
  )
}
const $countdown: TextStyle = { textAlign: "center", marginBottom: 16 }
export default Countdown
export function FormikInputCode(props: CodeInputProps) {
  const {
    placeholder,
    hideValue,
    // innerRef,
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props
  const [until, setUntil] = useState<moment.Moment>(
    inputProps.resendCodeAfterMinutes && moment().add(inputProps.resendCodeAfterMinutes, "minutes"),
  )
  const [countdownDone, setCountdownDone] = useState(false)
  const hasError = touched[name] && errors[name]
  const ref = useBlurOnFulfill({ value, cellCount: inputProps.cellCount })
  const [layoutProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: onChange(name),
  })
  return (
    <>
      {placeholder && <StyledText style={inputProps.placeholderStyle}>{placeholder}</StyledText>}
      <CodeField
        ref={ref}
        {...layoutProps}
        value={value}
        onChangeText={onChange(name)}
        onBlur={() => {
          setFieldTouched(name)
          onBlur(name)
        }}
        onEndEditing={inputProps.onSubmitEditing}
        cellCount={inputProps.cellCount}
        rootStyle={[$codeFieldRoot, inputProps.containerStyle]}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        textAlignVertical="center"
        renderCell={({ index, symbol, isFocused }) => (
          <View key={index} style={$cellContainer}>
            <Text
              style={[
                $cell,
                inputProps.cellStyles,
                hasError && (inputProps.errorCellStyle || $errorCell),
                isFocused && (inputProps.focusCellStyle || $focusCell),
              ]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {(hideValue && symbol ? "*" : symbol) || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      {until && <Countdown until={until} onCountdownDone={() => setCountdownDone(true)} />}
      {inputProps.resendCode && (
        <TouchableOpacity
          disabled={!countdownDone}
          onPress={() => {
            inputProps.resendCode()
            setUntil(moment().add(inputProps.resendCodeAfterMinutes, "minutes"))
            setCountdownDone(false)
          }}
        >
          <StyledText
            preset="heading"
            style={[
              $resendButton,
              {
                color: countdownDone ? colors.palette.primary600 : colors.palette.primary100,
              },
            ]}
          >
            {inputProps.resendCodeButtonText || "RESEND"}
          </StyledText>
        </TouchableOpacity>
      )}
    </>
  )
}
const $codeFieldRoot: ViewStyle = { marginTop: 20, marginBottom: 20 }
const $cellContainer: ViewStyle = {
  width: 58,
  height: 70,
  borderWidth: 1,
  borderColor: colors.palette.main,
  borderRadius: 4,
  paddingVertical: 16,
}
const $cell: TextStyle = {
  color: colors.palette.neutral900,
  lineHeight: 35,
  fontSize: 32,
  textAlign: "center",
  // backgroundColor: colors.palette.neutra00,
}
const $focusCell: ViewStyle = {
  borderColor: colors.palette.primary600,
}
const $errorCell: ViewStyle = {
  borderColor: colors.palette.angry500,
}
const $resendButton: TextStyle = { fontSize: 16, textAlign: "center" }
