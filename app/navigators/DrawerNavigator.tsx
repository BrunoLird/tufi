import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Camera } from 'expo-camera';
import { colors } from "app/theme";
import { HomeScreen, PagarScreen, QrScreen, TransferirScreen, SettingsScreen } from "../screens";
import { ROUTES } from "../utils/constants";

const Tab = createBottomTabNavigator();
const { width: screenWidth } = Dimensions.get('window');

interface CustomTabBarIconProps {
  name: any;
  label: string;
  focused: boolean;
}

const CustomTabBarIcon: React.FC<CustomTabBarIconProps> = ({ name, label, focused }) => (
  <View style={styles.boxIcon}>
    <MaterialCommunityIcons name={name} size={30} color={focused ? "#9cb72b" : "#748c94"} />
    <Text
      style={{
        color: focused ? "#9cb72b" : "#748c94",
        fontSize: 12,
        fontWeight: "bold",
      }}
    >
      {label}
    </Text>
  </View>
);

interface CustomTabBarButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
}

const CustomTabBarButton: React.FC<CustomTabBarButtonProps> = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: colors.palette.primaryT200,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  boxIcon: {
    alignItems: "center",
    justifyContent: "center",
    top: 10,
  },
  shadow: {
    shadowColor: colors.palette.primaryT200,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    width: screenWidth,
    height: screenWidth,
  },
  line: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: 2,
  },
  verticalLine: {
    height: '100%',
  },
  horizontalLine: {
    width: '100%',
    height: 2,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
});

export function DrawerNavigator() {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <Tab.Navigator
        initialRouteName={ROUTES.HOME}
        screenOptions={{
          headerShown: true,
          tabBarStyle: {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            backgroundColor: "#fff",
            borderRadius: 15,
            height: 90,
            ...styles.shadow,
          },
          tabBarShowLabel: false,
          headerStyle: {
            backgroundColor: '#9cb72b',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen
          name={ROUTES.HOME}
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => <CustomTabBarIcon name="home" label="Home" focused={focused} />,
          }}
        />
        <Tab.Screen
          name={ROUTES.PAGAR}
          component={PagarScreen}
          options={{
            tabBarIcon: ({ focused }) => <CustomTabBarIcon name="credit-card" label="Pagar" focused={focused} />,
          }}
        />
        <Tab.Screen
          name={ROUTES.QR}
          component={QrScreen}
          options={{
            tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="qrcode-scan" size={30} color={focused ? "#fff" : "#fff"} />,
            tabBarButton: (props) => <CustomTabBarButton {...props} onPress={() => setCameraOpen(true)} />,
          }}
        />
        <Tab.Screen
          name={ROUTES.TRANSFERIR}
          component={TransferirScreen}
          options={{
            tabBarIcon: ({ focused }) => <CustomTabBarIcon name="bank-transfer" label="Transferir" focused={focused} />,
          }}
        />
        <Tab.Screen
          name={ROUTES.SETTINGS}
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => <CustomTabBarIcon name="cog" label="Settings" focused={focused} />,
          }}
        />
      </Tab.Navigator>

      {cameraOpen && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={cameraOpen}
          onRequestClose={() => setCameraOpen(false)}
        >
          <View style={styles.cameraContainer}>
            <Camera style={styles.camera}  />
            <View style={styles.overlay}>
              <View style={[styles.line, { left: '33.33%' }, styles.verticalLine]} />
              <View style={[styles.line, { left: '66.66%' }, styles.verticalLine]} />
              <View style={[styles.line, { top: '33.33%' }, styles.horizontalLine]} />
              <View style={[styles.line, { top: '66.66%' }, styles.horizontalLine]} />
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => setCameraOpen(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </>
  );
}
