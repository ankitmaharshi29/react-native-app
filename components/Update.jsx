import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const Update = ({ visible, onClose }) => {
  if (!visible) {
    return null; // Return null to not render anything when not visible
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.title}>Update Available</Text>
        <Text style={styles.message}>There is a new update available. Please update the app.</Text>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    zIndex: 1000, // Ensure it appears on top of other components
  },
  container: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Update;
