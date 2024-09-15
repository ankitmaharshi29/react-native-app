import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginSignUpComponent from './components/auth';
import Dashboard from './components/Dashboard';
import Settings from './components/settings';

const Stack = createStackNavigator();

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (user) => {
    setShowDashboard(true);
    setUserData(user);
  };

  const handleLogout = () => {
    setShowDashboard(false);
    setUserData(null);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!showDashboard ? (
          <Stack.Screen name="Login">
            {(props) => <LoginSignUpComponent {...props} onLogin={handleLogin} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Dashboard">
            {(props) => <Dashboard {...props} userData={userData} onLogout={handleLogout} />}
          </Stack.Screen>
        )}
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
