// import moment from "moment";
// import numeral from "numeral";
//
// import Toast from "react-native-toast-message"
// import { Platform } from "react-native"
// import { checkMultiple, PERMISSIONS, requestMultiple } from "react-native-permissions"
// import { useStores } from "app/models/helpers/useStores";
//
//
// export const useLoginStore = () => {
//   const rootStore = useStores()
//   return rootStore.loginStore
// }
//
//
// export const showMessage = (error = 'An error occurred while communicating with the server, please try again in a few moments', type = 'error', title = '') => {
//   let titleShow = title
//   if (title === '') {
//     if (type === 'success') {
//       titleShow = 'Success'
//     } else {
//       titleShow = 'Error'
//     }
//   }
//
//   Toast.show({
//     type,
//     text1: titleShow,
//     text2: error
//   });
// }
//
// export const capitalize = (str) => {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }
//
//
// export const money_fmt = (monto) => {
//   return numeral(monto).format('$0,0.00')
// }
//
// export const count_fmt = (monto) => {
//   return numeral(monto).format('0,0')
// }
//
// export const date_fmt = (fecha, formato_opcional) => {
//   const mm = moment(fecha);
//   return mm.format(formato_opcional ? formato_opcional : 'MM/DD/YYYY - hh:mm A')
// }
//
// export function convertUnixFormat(timestamp: number) {
//   return moment.unix(timestamp).format('MM/DD/YYYY');
// }
//
// export const truncate = (input, size) => input && input.length > size ? `${input.substring(0, size)}...` : input;
//
// export const loadDictForm = (objBase, objData) => {
//   let newObject = {}
//   Object.keys(objBase).forEach(function (key, index) {
//     newObject[key] = objData[key] ? objData[key] : objBase[key]
//   });
//
//   return newObject
// }
//
// export const transformObjectsToId = (object, list_of_keys_to_convert) => {
//   const newObj = {}
//   Object.keys(object).forEach(function (key) {
//     if (list_of_keys_to_convert.includes(key)) {
//       if (object[key] !== null && object[key].id !== undefined) {
//         newObj[key] = object[key].id
//       } else {
//         newObj[key] = null
//       }
//     } else {
//       newObj[key] = object[key]
//     }
//   });
//   return newObj
// }
//
// export const convertStringToList = (text) => {
//   if (text) {
//     return text.replace(/\n/g, '<br/>')
//   } else {
//     return '';
//   }
// }
//
// export const checkPermissions = async () => {
//   if (Platform.OS === "ios") {
//     const res = await checkMultiple([
//       PERMISSIONS.IOS.CAMERA,
//       PERMISSIONS.IOS.PHOTO_LIBRARY,
//       PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY
//     ])
//     if (
//       res["ios.permission.CAMERA"] === "denied" ||
//       res["ios.permission.CAMERA"] === "blocked" ||
//       res["ios.permission.PHOTO_LIBRARY"] === "denied" ||
//       res["ios.permission.PHOTO_LIBRARY"] === "blocked" ||
//       res["ios.permission.PHOTO_LIBRARY_ADD_ONLY"] === "denied" ||
//       res["ios.permission.PHOTO_LIBRARY_ADD_ONLY"] === "blocked"
//     ) {
//       await requestMultiple([
//         PERMISSIONS.IOS.CAMERA,
//         PERMISSIONS.IOS.PHOTO_LIBRARY,
//         PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY
//       ])
//     }
//   } else {
//     const res = await checkMultiple([
//       PERMISSIONS.ANDROID.CAMERA,
//       PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
//       PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
//     ])
//     if (
//       res["android.permission.CAMERA"] === "denied" ||
//       res["android.permission.READ_EXTERNAL_STORAGE"] === "denied" ||
//       res["android.permission.WRITE_EXTERNAL_STORAGE"] === "denied"
//     ) {
//       await requestMultiple([
//         PERMISSIONS.ANDROID.CAMERA,
//         PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
//         PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
//       ])
//     }
//   }
// }
//
// export class RNFile {
//   private name: any
//   private uri: any
//   private type: any
//   constructor(uri, name, type) {
//     this.name = name;
//     this.uri = uri;
//     this.type = type;
//   }
// }
//
// export const getFileExtension = (response) => {
//   const path = response.path;
//   const splitPath = path.split('.');
//   const extension = splitPath[splitPath.length - 1];
//   return `.${extension}`;
// }
//

export const arrEqual = (array1, array2) => {
  if (array1.length === array2.length) {
    return array1.every((element, index) => {
      if (element === array2[index]) return true;
      return false;
    });
  }

  return false;
}
//
// export const sortArrayByKey = (array, key) => {
//   const sortedArray = [...array];
//   sortedArray.sort((a, b) => {
//     if (a[key] < b[key]) return -1
//     if (a[key] > b[key]) return 1
//     return 0;
//   });
//   return sortedArray;
// };
//
// export const getDataFiltered = (initialData: Array<any>, keys: Array<string>, filter: any) => {
//   if (initialData === [] || !initialData) return []
//   if (keys === [] || !keys) return initialData
//   if (filter === "" || !filter) return initialData
//
//   let data = []
//   initialData.map((d) => {
//     keys.map((key) => {
//
//       const nestedKeys = key.split('.');
//       let value = d;
//       for (let i = 0; i < nestedKeys.length; i++) {
//         if (value && value.hasOwnProperty(nestedKeys[i])) {
//           value = value[nestedKeys[i]];
//         } else {
//           value = null;
//           break;
//         }
//       }
//       try {
//         if (value && value.toString().toLowerCase().includes(filter.toLowerCase())) {
//           data.push(d);
//         }
//       } catch {}
//
//     })
//   })
//   data = [...new Map(data.map(item => [item.id, item])).values()]
//   return data
// }
//
// export const percent_fmt = (value) => {
//   return numeral(value).format('0,0.00') + '%'
// }
//
// export const coin_value_fmt = (value) => {
//   return numeral(value).format('0,0.000000')
// }
//
//
// export function formatDurationShort(period, maxgroups = 1, units = undefined) {
//   const date = moment(period);
//   const ago = moment.duration(moment().diff(date));
//   const parts = []
//   const duration = moment.duration(ago, units)
//
//   // return nothing when the duration is falsy or not correctly parsed (P0D)
//   if (!duration || duration.toISOString() === "P0D") return "-"
//
//   if (duration.years() >= 1) {
//     const years = Math.floor(duration.years())
//     parts.push(years + "y")
//   }
//
//   if (duration.months() >= 1) {
//     const months = Math.floor(duration.months())
//     parts.push(months + "m")
//   }
//
//   if (duration.days() >= 1) {
//     const days = Math.floor(duration.days())
//     parts.push(days + "d")
//   }
//
//   if (duration.hours() >= 1) {
//     const hours = Math.floor(duration.hours())
//     parts.push(hours + "h")
//   }
//
//   if (duration.minutes() >= 1) {
//     const minutes = Math.floor(duration.minutes())
//     parts.push(minutes + "m")
//   }
//
//   if (duration.seconds() >= 1) {
//     const seconds = Math.floor(duration.seconds())
//     parts.push(seconds + "s")
//   }
//
//   return parts.slice(0, maxgroups).join(", ")
// }
