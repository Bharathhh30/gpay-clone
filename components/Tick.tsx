import React, { useRef } from 'react';
import LottieView from 'lottie-react-native';

const Final = () => {
  const animationRef = useRef<LottieView>(null);

  return (
    <LottieView
      ref={animationRef}
      source={require('../assets/final.json')}
      autoPlay
      loop={false}
      onAnimationFinish={() => {
        animationRef.current?.pause(); // pause at end
      }}
      style={{ width: 400, height: 400 , marginBottom: -200, marginTop: -260 }}
      
    />
  );
}; 

export default Final;
