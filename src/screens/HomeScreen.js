import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import DashboardScreen from './DashboardScreen';
import ProfileScreen from './ProfileScreen';
import { useTheme } from '../context/ThemeContext';
import { View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace('Login');
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              <Button title="Theme" onPress={toggleTheme} />
              <Button title="Logout" color="red" onPress={handleLogout} />
            </View>
          ),
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Dashboard') iconName = 'home-outline';
            else if (route.name === 'Profile') iconName = 'person-outline';
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme === 'dark' ? '#fff' : '#000',
          tabBarStyle: {
            backgroundColor: theme === 'dark' ? '#000' : '#fff',
            borderTopColor: theme === 'dark' ? '#222' : '#ccc',
          },
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </>
  );
};

export default HomeScreen;
