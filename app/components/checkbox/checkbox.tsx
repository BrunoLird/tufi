import * as React from "react"
import { Image, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../Text"
import { CheckboxProps } from "./checkbox.props"
import { colors } from "app/theme"
import { iconRegistry } from "../Icon"

const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingVertical: 10,
  alignSelf: "flex-start",
}

const DIMENSIONS = { width: 20, height: 20 }

const OUTLINE: ViewStyle = {
  ...DIMENSIONS,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: 'transparent',
  marginRight: 10,
  borderWidth: 1,
  borderColor: colors.palette.neutral300,
  borderRadius: 4
}

const FILL: ViewStyle = {
  width: DIMENSIONS.width - 1,
  height: DIMENSIONS.height - 1,
  backgroundColor: colors.palette.primary600,
  borderRadius: 4
}

const LABEL: TextStyle = { paddingLeft: 10 }

export function Checkbox(props: CheckboxProps) {
  const numberOfLines = props.multiline ? 0 : 1
  const textLabel = props.textLabel || false

  const rootStyle = [ROOT, props.style]
  const outlineStyle = [OUTLINE, props.outlineStyle]
  const fillStyle = [FILL, props.fillStyle, {justifyContent: 'center', alignItems: 'center'}]

  const onPress = props.onToggle ? () => props.onToggle && props.onToggle(!props.value) : null

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={!props.onToggle}
      onPress={onPress}
      style={rootStyle}
    >
      <View style={outlineStyle}>{props.value && <View style={fillStyle} >
        <Image
          source={iconRegistry.check}
          style={{ tintColor: colors.palette.neutral100, width: 18, height: 18 }}
        />
      </View>}</View>
      {textLabel === true && (
        <Text text={props.text} tx={props.tx} numberOfLines={numberOfLines} style={LABEL} />
      )}
      {textLabel === false && props.text}
    </TouchableOpacity>
  )
}
