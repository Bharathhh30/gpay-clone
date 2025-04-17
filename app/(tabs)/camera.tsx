import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Overlay } from './overlay';
import { router } from 'expo-router';
import { useFocusEffect } from 'expo-router';


export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const parseUpiData = (upiString: string) => {
    const queryString = upiString.split('?')[1];
    const params = new URLSearchParams(queryString);
  
    const upiId = params.get('pa');
    const name = params.get('pn')?.replace(/%20/g, ' '); // Decode spaces
  
    return { upiId, name };
  };


  const handleBarCodeScanned = ({data}:{data:string}) =>{
    if(!scanned){
        setScanned(true);
        console.log(data)
        const { upiId, name } = parseUpiData(data);

        router.push({
            pathname : '/(tabs)/amount',
            params : {  upiId: upiId, name: name }
        })
    }
  }

//  enable scanning again when coming back to this screen, you can reset scanned inside a useFocusEffect
    useFocusEffect(() => {
    setScanned(false); // Reset scan flag when screen regains focus
    });


  if (!permission) {
    return <View className='bg-transparent'></View>;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-black mb-4">Camera access is required.</Text>
        <Text onPress={requestPermission} className="text-blue-600 underline">
          Grant Permission
        </Text>
      </View>
    );
  }

  return (
    <View className='flex-1'>
        <StatusBar  translucent backgroundColor="transparent" style='light' />
        <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={handleBarCodeScanned}
        />
        <Overlay />
    </View>
  );
}
