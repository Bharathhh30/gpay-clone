import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Final from "@/components/Tick";
import { useLocalSearchParams } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Feather } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";

const FinalScreen = () => {
  const amount = useLocalSearchParams();
  const now = new Date();

  const day = now.getDate();
  const month = now.toLocaleString("default", { month: "long" });
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedTime = `${formattedHours}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;
  const formattedDateTime = `${day} ${month} ${year}, ${formattedTime}`;

  return (
    <View className="flex-1 bg-white items-center justify-center  px-6">
      <Final />

      {/* Amount */}
      <Text className="text-4xl font-medium text-black mt-40">
        ₹{Number(amount.amount).toLocaleString("en-IN")}.00
      </Text>

      {/* Paid to */}
      <Text className="text-base text-gray-700 mt-12">Paid to</Text>
      <Text className="text-2xl font-normal text-black text-center mt-1">
        {amount.name}
      </Text>

      {/* Banking name row */}
      <View className="flex-row items-center justify-center mt-2 px-2">
        <MaterialCommunityIcons
          name="shield-check"
          size={16}
          color="green"
          style={{ marginRight: 4 }}
        />
        <Text
          className="text-sm text-gray-800 font-medium"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Banking name: {amount.name}
        </Text>
      </View>

      {/* Date and time */}
      <Text className="text-base text-gray-600 mt-2">{formattedDateTime}</Text>

      {/* logo */}
      <View className=" mt-32">
        {/* <Text className="text-xs font-medium ">Powered By</Text> */}
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/UPI_logo.svg/1200px-UPI_logo.svg.png",
          }}
          width={50}
          height={50}
          resizeMode="contain"
        />
      </View>
      <View className="flex-row justify-center gap-2 items-center w-full px-6 mt-8 mb-20">
        <TouchableOpacity className="flex-row items-center bg-transparent border border-black px-4 py-3 rounded-full">
          <Entypo name="share" size={24} color="black" />
          <Text className="text-black ml-2 font-medium">Share screenshot</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-[#d6e4ff] px-6 py-4 rounded-full">
          <Text className="text-black font-semibold">Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FinalScreen;
