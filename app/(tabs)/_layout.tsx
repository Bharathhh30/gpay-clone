import { View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const _layout = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Stack screenOptions={{
        headerShown: false
      }} />
    </View>
  );
};

export default _layout;
