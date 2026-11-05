import React from "react";
import { View, Text, Button, TextInput } from "react-native";

const Setting = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Setting Screen</Text>
      // goto about settings screen
      
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};

export default Setting;