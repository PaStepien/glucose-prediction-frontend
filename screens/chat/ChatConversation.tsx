import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const ChatConversation = () => {
    return (
        <View style={styles.emptyChatStateContainer}>
            <Text>Hello hello</Text>
            {/* Placeholder for chat messages */}
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