import React, { useState } from "react";
import { Platform, View } from "react-native";
import {
  adaptNavigationTheme,
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { StacksProvider } from "@mobily/stacks";
import "react-toastify/dist/ReactToastify.css";

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { NavigationContainer } from "@react-navigation/native";
import "./App.css";
import { Navigation } from "./router/stack";
import { ToastContainer } from "react-toastify";

/**
 *   primary: string;
  primaryContainer: string;
  secondary: string;
  secondaryContainer: string;
  tertiary: string;
  tertiaryContainer: string;
  surface: string;
  surfaceVariant: string;
  surfaceDisabled: string;
  background: string;
  error: string;
  errorContainer: string;
  onPrimary: string;
  onPrimaryContainer: string;
  onSecondary: string;
  onSecondaryContainer: string;
  onTertiary: string;
  onTertiaryContainer: string;
  onSurface: string;
  onSurfaceVariant: string;
  onSurfaceDisabled: string;
  onError: string;
  onErrorContainer: string;
  onBackground: string;
  outline: string;
  outlineVariant: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  shadow: string;
  scrim: string;
  backdrop: string;
  elevation: MD3ElevationColors;
 */
const theme = {
  ...DefaultTheme,
  roundness: 1,
  colors: {
    ...DefaultTheme.colors,
    primary: "#00e676",
    primaryContainer: "orange",
    secondaryContainer: "purple",
    tertiaryContainer: "magenta",
    secondary: "orange",
    tertiary: "purple",
    background: "white",
    surface: "#00e676",
  },
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
  materialDark: theme,
});

function App() {
  return (
    <StacksProvider spacing={4}>
      <PaperProvider theme={theme}>
        <React.Fragment>
          {Platform.OS === "web" ? (
            <style type="text/css">{`
        @font-face {
          font-family: 'MaterialCommunityIcons';
          src: url(${require("react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf")}) format('truetype');
        }
      `}</style>
          ) : null}
          <ToastContainer />
          <View
            style={{
              height: "100vh",
              width: "100vw",
              backgroundColor: "black",
            }}
          >
            <NavigationContainer theme={DarkTheme}>
              <Navigation />
            </NavigationContainer>
          </View>
        </React.Fragment>
      </PaperProvider>
    </StacksProvider>
  );
}

export default App;
