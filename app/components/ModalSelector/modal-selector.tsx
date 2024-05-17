import React, { useEffect, useState } from "react"
import {
  Modal,
  TouchableOpacity,
  View,
  ViewStyle,
  TextInput,
  ImageStyle,
  Image,
  TextStyle,
  FlatList,
} from "react-native"
import { Icon, Button, Text } from "app/components"
import { colors, spacing, typography } from "app/theme"
import { arrEqual } from "app/utils/helpers"
import { translate } from "app/i18n"

const searchIcon = require("../../../assets/icons/search.png")

type ModalSelectortProps = {
  action: any
  options: any
  title: string
  value: any
  visible: boolean
  displaySelector: boolean
  setVisible: any
  closeOnClick?: boolean
  itemKey?: string
  alternativeStyle?: boolean
  searchLabel?: string
  searchAction?: any
  enableSearch?: boolean
  multiple?: boolean
}

export function ModalSelector(props: ModalSelectortProps) {
  const [SelectedValue, setSelectedValue] = useState(null)
  const [SelectedMultipleValue, setSelectedMultipleValue] = useState([])

  const closeOnClick = false || props.closeOnClick
  const [Search, setSearch] = useState("")

  useEffect(() => {
    if (props.value === null) {
      setSelectedValue(null)
      setSelectedMultipleValue([])
    }
  }, [props.value])

  useEffect(() => {
    if (!props.visible) setSearch('')
  }, [props.visible])

  const isChecked = (option) => {
    return props.multiple
      ? Boolean(SelectedMultipleValue.includes(option))
      : SelectedValue === option
  }

  return (
    <Modal
      hardwareAccelerated
      animationType="fade"
      transparent
      visible={props.visible}
      statusBarTranslucent
    >
      <View style={$blurContainer}>
        <View style={$container}>
          <Text style={$title}>{props.title}</Text>
          {props.enableSearch && (
            <View style={$searchBar}>
              <Image source={searchIcon} style={$searchIcon} />
              <TextInput
              style={{ color: colors.palette.neutral900, width: '90%', height: 40}}
                placeholder="Search"
                placeholderTextColor="gray"
                onChangeText={(t) => {
                  setSearch(t)
                  if (props.searchAction) props.searchAction(t)
                }}
                value={Search}
              />
            </View>
          )}
          <FlatList
            style={$optionsContainer}
            data={props.options}
            keyExtractor={(item) => "option-id-" + item.value}
            ListHeaderComponent={() =>
              props.multiple && (
                <View style={$itemContainerMultiple}>
                  <Text text={translate("common.selectAll")} style={$limitSubTitle} />
                  <TouchableOpacity
                    style={[
                      $checkbox,
                      arrEqual(props.options, SelectedMultipleValue) && $checkboxBorderFocus,
                    ]}
                    onPress={() => {
                      if (arrEqual(props.options, SelectedMultipleValue)) {
                        setSelectedMultipleValue([])
                      } else {
                        setSelectedMultipleValue(props.options)
                      }
                    }}
                  >
                    {arrEqual(props.options, SelectedMultipleValue) && (
                      <Icon icon="check" size={20} color="white" />
                    )}
                  </TouchableOpacity>
                </View>
              )
            }
            renderItem={({ item }) => {
              let itemColor: string = colors.palette.neutral900

              if (props?.itemKey === "label") {
                if (isChecked(item)) {
                  itemColor = colors.palette.main
                }
              } else {
                if (SelectedValue && SelectedValue.value === item.value) {
                  itemColor = colors.palette.neutral900
                }
              }

              return (
                <TouchableOpacity
                  key={"option-id-" + item.value}
                  style={props.multiple === true ? $itemContainerMultiple : $itemContainer}
                  onPress={() => {
                    if (props.multiple) {
                      if (isChecked(item)) {
                        setSelectedMultipleValue((prev) => prev.filter((o) => o !== item))
                      } else {
                        setSelectedMultipleValue((prev) => [...prev, item])
                      }
                    } else {
                      if (props.closeOnClick === true) {
                        props.action(item)
                        props.setVisible(false)
                        setSelectedValue(item)
                      } else {
                        setSelectedValue(item)
                      }
                    }
                  }}
                >
                  <View style={{ width: '85%' }}>
                    <Text style={[$label, { color: itemColor }]}>{item.label}</Text>
                    {item.description && !props.multiple && (
                      <Text style={[$description, { color: itemColor }]}>{item.description}</Text>
                    )}
                  </View>
                  <View style={[$checkbox, isChecked(item) && $checkboxBorderFocus]}>
                    {isChecked(item) && <Icon icon="check" size={20} color="white" />}
                  </View>
                </TouchableOpacity>
              )
            }}
          />

          <View style={$buttonsContainer}>
            {!closeOnClick && (
              <Button
                text={'DONE'}
                style={$doneButton}
                disabled={!SelectedValue && !SelectedMultipleValue.length}
                preset={
                  !SelectedValue && !SelectedMultipleValue.length ? "reversed" : 'filled'
                }
                onPress={() => {
                  props.setVisible(false)
                  props.action(props.multiple ? SelectedMultipleValue : SelectedValue)
                }}
              />
            )}
            <Button
              text={translate("common.cancel").toUpperCase()}
              style={$cancelButton}
              preset="reversed"
              onPress={() => props.setVisible(false)}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const $container: ViewStyle = {
  borderTopEndRadius: 20,
  borderTopStartRadius: 20,
  bottom: 0,
  elevation: 5,
  height: "70%",
  padding: 20,
  paddingBottom: 0,
  position: "absolute",
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity: 0.3,
  shadowRadius: 2,
  width: "100%",
  backgroundColor: colors.palette.neutral100,
}

const $itemContainer: ViewStyle = {
  alignItems: "center",
  justifyContent: "space-between",
  borderWidth: 1,
  flexDirection: "row",
  borderColor: "#2F2F2F",
  marginVertical: 5,
  padding: 10,
  borderRadius: 5,
}

const $itemContainerMultiple: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
  borderWidth: 1,
  borderColor: "#2F2F2F",
  marginVertical: 5,
  padding: 10,
  borderRadius: 5,
}

const $cancelButton: ViewStyle = {
  marginTop: 15,
  borderColor: colors.palette.primary600,
  borderWidth: 1,
}

const $blurContainer: ViewStyle = {
  height: '100%',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)'
}

const $searchBar: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 8,
  height: 54,
  borderWidth: 1,
  borderColor: "#393433",
  borderRadius: 8,
  marginVertical: 8,
}

const $searchIcon: ImageStyle = {
  width: 16,
  height: 16,
  marginRight: 8,
  tintColor: "#000",
}

const $checkbox: ViewStyle = {
  width: 20,
  height: 20,
  borderRadius: 4,
  borderWidth: 2,
  borderColor: colors.palette.main,

  justifyContent: "center",
  alignItems: "center",
  marginRight: spacing.sm,
}

const $checkboxBorderFocus: ViewStyle = {
  backgroundColor: colors.palette.main,
}

const $limitSubTitle: TextStyle = {
  textAlign: "left",
  fontSize: 15,
  color: colors.palette.primary600,
  fontFamily: typography.primary.semiBold,
  marginVertical: 10,
}
const $title: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 20,
  marginBottom: 10,
  textAlign: "center",
}
const $optionsContainer: ViewStyle = { flexGrow: 1, height: "100%" }
const $label: TextStyle = { fontSize: 18, }
const $description: TextStyle = { fontSize: 15, width: '85%' }
const $buttonsContainer: ViewStyle = { flexDirection: "column", marginBottom: 20 }
const $doneButton: ViewStyle = { marginTop: 15 }
