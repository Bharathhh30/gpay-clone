import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import BottomSheetComponent from "@/components/BottomSheet";

export default function ResultScreen() {
  const { upiId, name } = useLocalSearchParams();
  const [amount, setAmount] = useState("");
  const [isContinueClicked, setIsContinueClicked] = useState(false);

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handleContinueClick = () => {
    setIsContinueClicked(true); // Set continue clicked state to true
    setIsBottomSheetVisible(true); // Open BottomSheet
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false); // Close BottomSheet
  };

  //   use local seacrch params to get the data as a prop that is passed from the camera screen
  const firstLetter = (name as string)?.charAt(0)?.toUpperCase() || "?";

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="w-16 h-16 rounded-full bg-amber-800 border-slate-500 border justify-center items-center mb-1">
        <Text className="text-white text-3xl font-medium">{firstLetter}</Text>
      </View>
      <Text
        className="text-black mt-2 font-medium text-center"
        style={{ fontSize: 16, textAlign: "center" }}
      >
        Paying {name}
      </Text>
      {/* sheild check - Banking name : name but end..... */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MaterialCommunityIcons
          name="shield-check"
          size={16}
          color="green"
          style={{ marginRight: 6 }}
        />
        <Text
          className="text-black font-medium text-center"
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ fontSize: 14, maxWidth: "85%" }}
        >
          Banking name: {name}
        </Text>
      </View>

      <Text className="text-slate-800 mt-2 pt-2 font-normal ">
        UPI ID: {upiId}
      </Text>
      {/* text input */}
      {/* <Text className="text-teal-400">Hi</Text> */}
      <View className="flex-row items-center justify-center mt-4 w-full h-36 px-4">
        <MaterialIcons name="currency-rupee" size={36} color="black" />
        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="#000000"
          selectionColor="black"
          className="text-black text-7xl  mt-3 font-normal h-28 pb-3 bg-transparent"
          style={{
            minWidth: 10, // prevent collapse
            paddingLeft: 4,
          }}
        />
      </View>
      {/* Bottom button */}
      <View className="items-end justify-end pr-4 pb-6">
        {!isContinueClicked && (
          <TouchableOpacity
            className="bg-blue-600 px-6 py-3 rounded-xl"
            onPress={handleContinueClick}
          >
            <Text className="text-white text-base font-semibold">Continue</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Bottom Sheet Component */}
      <BottomSheetComponent
        isVisible={isBottomSheetVisible}
        amount={amount}
        name={name as string} // Pass the name prop to BottomSheetComponent
        onClose={handleCloseBottomSheet} // Close BottomSheet when it's swiped down
      />
    </View>
  );
}
