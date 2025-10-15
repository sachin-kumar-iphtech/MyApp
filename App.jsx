import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function App() {
  // State variable "count" with initial value 0
  const [count, setCount] = useState(0);

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Count: {count}</Text>

      {/* Button to increase count */}
      <Button title="Increase" onPress={() => setCount(count + 1)} />

      {/* Spacer */}
      <View style={{ height: 10 }} />

      {/* Button to decrease count */}
      <Button title="Decrease" onPress={() => setCount(count - 1)} />

      {/* Spacer */}
      <View style={{ height: 10 }} />

      {/* Button to reset count */}
      <Button title="Reset" onPress={() => setCount(0)} />
    </View>
  );
}
