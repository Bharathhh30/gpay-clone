import { View, Text } from "react-native";
import React from "react";
import PINInput from "@/components/pincom";
import { useLocalSearchParams } from "expo-router";

const pin = () => {
    const { amount ,name} = useLocalSearchParams();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View>
        <Text className="text-black">pin {amount} hello , {name}</Text>
        <PINInput amount={Array.isArray(amount) ? amount.join(",") : amount} name={Array.isArray(name) ? name.join(",") : name} />
        </View>
      
    </View>
  );
};

export default pin;
