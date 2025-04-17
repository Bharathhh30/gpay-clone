import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';

interface BottomSheetComponentProps {
  isVisible: boolean;
  onClose: () => void;
  name? : string
  amount?: string; // Optional prop for amount
}

const BottomSheetComponent: React.FC<BottomSheetComponentProps> = ({ isVisible, onClose ,amount,name}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Handle sheet changes
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      onClose();
    }
    console.log('handleSheetChanges', index);
  }, [onClose]);

  return (
    <BottomSheet
      
      ref={bottomSheetRef}
      index={isVisible ? 0 : -1} // 0 to open, -1 to close
      snapPoints={['30%']}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      style={styles.bottomSheet} // Apply shadow to the BottomSheet container
    //   enablePanDownToClose = {true}
      handleIndicatorStyle = {{display:'none'}}
    >
      <BottomSheetView style={styles.contentContainer} className='  w-full border-t-2 border-slate-200'>
        <View className='flex-1 items-center justify-center'> 
            <Text>Choose account to pay with</Text>
            <Text>State Bank of India</Text>
            <View className='flex-row items-center justify-between  px-4 mt-4'>
                <Text>Balance: </Text>
                <Text className='text-blue-600'>Check now</Text>
            </View>
            <TouchableOpacity className='bg-blue-600 px-6 py-3 w-72 rounded-3xl items-center mt-4' onPress={ () => {router.push(
              {pathname: '/(tabs)/pin',
                params: {amount: amount,
                  name : name,
                }, // Pass the amount as a parameter
              }
            )}}>
                <Text className='text-white text-base font-semibold'>Pay ₹{amount}</Text>
            </TouchableOpacity>
            
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    // Adding shadow to the top of the BottomSheet
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 3 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    elevation: 5, // Shadow for Android
    
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
    borderTopEndRadius : 20,
    borderTopStartRadius : 20,
  },
});

export default BottomSheetComponent;
