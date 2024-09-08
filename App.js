// App.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginComponent from './components/auth';
import Dashboard from './components/Dashboard';

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (user) => {  // Accept user data from LoginComponent
    setShowDashboard(true);  // Show the Dashboard when login is successful
    setUserData(user);  // Set user data after login
  };

  const handleLogout = () => {
    setShowDashboard(false);  // Go back to login screen
    setUserData(null);  // Clear user data
  };

  return (
    <View style={styles.container}>
      {!showDashboard ? (
        <LoginComponent onLogin={handleLogin} />  // Pass handleLogin to LoginComponent
      ) : (
        <Dashboard userData={userData} onLogout={handleLogout} /> 
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
