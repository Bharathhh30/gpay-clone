import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import { router } from 'expo-router'; // <- Import router from expo-router

const PINInput = ({amount,name}:{amount:string,name:string}) => {
  console.log("Amount received in PINInput:", name)
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newPin = [...pin];
      newPin[index] = text;
      setPin(newPin);

      // Move focus to next input
      if (index < 5) {
        inputs.current[index + 1]?.focus();
      } else {
        inputs.current[index]?.blur();
      }
    } else if (text === '') {
      const newPin = [...pin];
      newPin[index] = '';
      setPin(newPin);
    }
  };

  // Watch for full PIN entry
  useEffect(() => {
    if (pin.every(d => d !== '')) {
      Keyboard.dismiss(); // Hide keyboard
      const fullPin = pin.join('');
      console.log('Entered PIN:', fullPin);
      router.push({
        pathname : '/(tabs)/final',
        params: { amount: amount ,
          name : name,
        }, // Pass the amount as a parameter
      }); // <- Navigate to final screen
    }
  }, [pin]);

  return (
    <View style={styles.container}>
      {pin.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => (inputs.current[index] = ref)}
          value={digit}
          onChangeText={text => handleChange(text, index)}
          keyboardType="number-pad"
          maxLength={1}
          style={styles.input}
          secureTextEntry
          autoFocus={index === 0}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
    marginTop: 30,
  },
  input: {
    width: 50,
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 24,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    color: 'black',
  },
});

export default PINInput;
