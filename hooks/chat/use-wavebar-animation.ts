import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function useWaveBarAnimation(isActive: boolean, anim: Animated.Value, maxHeight: number, duration: number, animMinValue: number) {
    var animatedLoop = useRef<Animated.CompositeAnimation | null>(null);
   
    useEffect(() => {
    if (isActive) {
      animatedLoop.current = Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: maxHeight,
            duration,
            useNativeDriver: false,
          }),
          Animated.timing(anim, {
            toValue: animMinValue,
            duration,
            useNativeDriver: false,
          }),
        ])
      )
      animatedLoop.current.start();
    } else {
        animatedLoop.current?.stop();
      Animated.timing(anim, {
        toValue: animMinValue,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isActive]);
}