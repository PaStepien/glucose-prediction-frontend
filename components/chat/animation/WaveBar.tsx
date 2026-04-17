import { useWaveBarAnimation } from "@/hooks/chat/use-wavebar-animation";
import { LinearGradient } from "expo-linear-gradient";
import { useRef } from "react";
import { Animated, StyleSheet } from "react-native";

export default function WaveBar({maxHeight, duration, isActive, minHeight} : {maxHeight: number, duration: number, isActive: boolean, minHeight: number}) {
    const anim = useRef(new Animated.Value(minHeight)).current;

    useWaveBarAnimation(isActive, anim, maxHeight, duration, minHeight);

    return (
        <LinearGradient
            colors={['#b8a8f0', '#e8a8d8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Animated.View
                style={[styles.bar, { height: anim }]}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    bar: {
        width: 10,
        borderRadius: 999,
        alignSelf: 'center',
    },
});
