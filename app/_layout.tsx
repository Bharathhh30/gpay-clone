import { Stack } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import React, { useEffect, useState } from "react";
import "../global.css";
import { ActivityIndicator, Alert, Button, StatusBar, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const authenticateUser = async() => {
      const hardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if(!hardware || !isEnrolled){
        Alert.alert("No biometric hardware found or no biometrics enrolled");
        setAuthenticated(false);
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to continue",
        cancelLabel: "Cancel",
        fallbackLabel: "Use PIN",
      })

      if(result.success){
        setAuthenticated(true);
      }else{
        Alert.alert("Authentication failed");
      }
      setChecking(false);
    }
    authenticateUser()
  },[])

  if(checking){
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (!authenticated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="Try Again" onPress={() => setChecking(true)} />
      </View>
    );
  }

  return (
    <>
      <GestureHandlerRootView >
        <StatusBar hidden={false} />
        <Stack screenOptions={{
          headerShown: false,
        }}/>
      </GestureHandlerRootView>
    </>
  )
}
