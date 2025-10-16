import * as React from "react";
import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" ,gap:10}}>
      <Text>Home Screen</Text>
      <Button title="Go to Profile" onPress={() => navigation.navigate("Profile")} />
    </View>
  );
}
