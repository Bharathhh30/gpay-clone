import React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

// Define dimensions for the inner box (adjust as needed)
const innerDimension = 300;

export const Overlay = () => {
  return (
    <View style={styles.container}>
      {/* Outer semi-transparent black overlay */}
      <StatusBar translucent backgroundColor="transparent" style='light' />
      <View style={styles.overlay} />

      {/* Inner focused area (transparent center box) */}
      <View style={[styles.innerBox, { width: innerDimension, height: innerDimension }]}>
        {/* <Text style={styles.overlayText}>Scan a QR code</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent black
  },
  innerBox: {
    position: 'absolute',
    top: height / 2 - innerDimension / 2,
    left: width / 2 - innerDimension / 2,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,  // Rounded corners
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
