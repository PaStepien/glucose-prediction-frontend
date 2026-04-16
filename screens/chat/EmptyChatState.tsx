import React from "react";
import { StyleSheet, View } from "react-native";

import AssistantSuggestions from "@/components/chat/AssitantSuggestions";
import WelcomeMessage from "@/components/chat/WelcomeMessage";

export const EmptyChatState = () => {
    return (
        <View style={styles.emptyChatStateContainer}>
            <WelcomeMessage />
            <AssistantSuggestions />
        </View>
    );
}

const styles = StyleSheet.create({
    emptyChatStateContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});