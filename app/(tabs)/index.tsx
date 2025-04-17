import { Pressable, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from "react";
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { Link, router } from "expo-router";

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions()
  const isPermissionGranted = Boolean(permission?.granted)

  // useEffect(()=>{
  //   (async()=> {
  //     const {status} = await Camera.requestCameraPermissionsAsync();
  //     setPermission(status === 'granted');
  //   })()
  // },[])

  // if (hasPermission === null) {
  //   return <View><Text>Requesting permission...</Text></View>;
  // }
  // if (hasPermission === false) {
  //   return <View><Text>No access to camera</Text></View>;
  // }

  return (
    <View className="flex-1 space-y-20 items-center justify-center bg-white">
      <View  >
          <TouchableOpacity 
            className=" justify-center items-center" 
            onPress={()=>router.push('/(tabs)/camera')}
          >
            <MaterialIcons name="qr-code-scanner" size={36} color="blue" />
            <Text> Scan any {"\n"} QR code</Text>
          </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity onPress={requestPermission}>
          <Text className="text-black">Request Permissions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
