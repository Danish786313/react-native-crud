import React from "react";
import { View, Text, Button, TextInput } from "react-native";

const AboutSetting = (props: any) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>About Setting</Text>
            <Text>This is the About Setting screen.</Text>
            <Button
                title="Go to Home page"
                onPress={() => props.navigation.navigate('Home')}
            />
        </View>
    );
}