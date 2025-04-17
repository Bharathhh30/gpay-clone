import { View, Text } from "react-native";
import React from "react";
import Final from "@/components/Tick";
import { useLocalSearchParams } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const final = () => {
  const amount = useLocalSearchParams();
  console.log("Amount received in Final:", amount); //it came as a araay
  const now = new Date();

  // Format parts
  const day = now.getDate();
  const month = now.toLocaleString("default", { month: "long" }); // e.g., April
  const year = now.getFullYear();

  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Format hours for 12-hour clock
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const ampm = hours >= 12 ? "pm" : "am";

  const formattedTime = `${formattedHours}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;

  const formattedDateTime = `${day} ${month} ${year}, ${formattedTime}`;
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="">
        <Final />
      </View>
      <View className="p-4  justify-center items-center">
        <Text className="text-5xl p-2">₹{amount.amount}.00</Text>
        <Text className="text-black mt-2">Paid to</Text>
        <Text className="text-black mt-2 font-semibold text-2xl">
          {amount.name}
        </Text>

        <View className="w-full items-center justify-center">
  <View className="flex-row items-center w-80">
    <MaterialCommunityIcons
      name="shield-check"
      size={18}
      color="green"
      style={{ marginRight: 6 }}
    />
    <Text
      className="text-black font-medium"
      style={{ fontSize: 14 }}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      Banking name: {amount.name}
    </Text>
  </View>
</View>


        <Text className="text-black text-lg">{formattedDateTime}</Text>
      </View>
    </View>
  );
};

export default final;
