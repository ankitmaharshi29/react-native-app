import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Header = ({ tags, onSelectTag }) => {
  const [selectedTag, setSelectedTag] = useState('all'); // State to track the selected tag

  // Handle tag selection and notify parent component
  const handleTagSelection = (tag) => {
    setSelectedTag(tag);
    onSelectTag(tag);
  };

  return (
    <View style={styles.header}>
      {tags.map((tag, index) => (
        <TouchableOpacity
          key={index} // Use index as part of the key
          style={[styles.button, selectedTag === tag && styles.selectedButton]}
          onPress={() => handleTagSelection(tag)}
        >
          <Text style={[styles.buttonText, selectedTag === tag && styles.selectedButtonText]}>
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};



const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    elevation: 5,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 25,
    backgroundColor: '#fff',
    margin: 5,
  },
  selectedButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedButtonText: {
    color: '#fff',
  },
});

export default Header;
