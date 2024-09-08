import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Video } from 'expo-av'; // Import Expo AV for video handling
import imageData from '../data/res.json';
import Header from './TagsNav';
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons'; // Import vector icons

const Home = ({ userData }) => {
  const [filteredMedia, setFilteredMedia] = useState(imageData.list); // State to store filtered media items
  const [playingVideoIndex, setPlayingVideoIndex] = useState(null); // State to manage video playback
  const flatListRef = useRef(null); // Ref to manage FlatList scrolling

  const userImage = userData.img; // User image for overlay

  // Filter media items based on selected tag
  const filterMedia = (tag) => {
    if (tag === 'all') {
      setFilteredMedia(imageData.list); // Show all media if "all" is selected
    } else {
      const filteredItems = imageData.list.filter(
        (item) => item.tag === tag || (Array.isArray(item.tag) && item.tag.includes(tag))
      );
      setFilteredMedia(filteredItems);
    }
  };

  // FlatList viewability configuration to manage video playback
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  // Callback when viewable items change to manage which video is playing
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setPlayingVideoIndex(viewableItems[0].index);
    }
  }).current;

  // Render each media item (either an image or a video)
  const renderItem = ({ item, index }) => (
    <View style={styles.mediaItemContainer}>
      <View style={styles.mediaContainer}>
        {item.type === 'image' ? (
          <Image source={{ uri: item.image }} style={styles.media} />
        ) : (
          <Video
            source={{ uri: item.video }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={playingVideoIndex === index}
            isLooping={true}
            style={styles.media}
            useNativeControls
            onPlaybackStatusUpdate={(status) => status.didJustFinish && setPlayingVideoIndex(null)}
          />
        )}
        {/* User image overlay */}
        <Image source={{ uri: userImage }} style={styles.userImageOverlay} />
      </View>
      
      {/* Buttons Container */}
      <View style={styles.buttonContainer}>
        {/* Share Button */}
        <TouchableOpacity style={[styles.actionButton, styles.shareButton]} onPress={() => alert('Share functionality not implemented')}>
          <FontAwesome name="whatsapp" size={24} color="white" />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>

        {/* Download Button */}
        <TouchableOpacity style={[styles.actionButton, styles.downloadButton]} onPress={() => alert('Download functionality not implemented')}>
          <MaterialIcons name="file-download" size={24} color="white" />
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>

        {/* Edit Button */}
        <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => alert('Edit functionality not implemented')}>
          <Feather name="edit" size={24} color="white" />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Render Header component and pass necessary props */}
      <Header imageData={imageData.list} onSelectTag={filterMedia} />

      {/* Media items list */}
      <FlatList
        ref={flatListRef}
        data={filteredMedia}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        contentContainerStyle={styles.scrollView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollView: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  mediaItemContainer: {
    width: Dimensions.get('window').width,
    marginBottom: 20,
  },
  mediaContainer: {
    width: '100%',
    height: 380,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
    alignItems: 'center',
  },
  media: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  userImageOverlay: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
    top: '80%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8, // Add border radius for rounded corners
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6, // Decrease height
    paddingHorizontal: 25, // Increase width
    borderRadius: 25,
    marginHorizontal: 5,
    minWidth: 120, // Minimum width to ensure buttons are not too narrow
  },
  shareButton: {
    
    backgroundColor: '#25D366', // Green color like WhatsApp
  },
  downloadButton: {
    width:150, 
       backgroundColor: '#9b59b6', // Light purple color
  },
  editButton: {
    backgroundColor: '#d3d3d3', // Very light gray color
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
    textAlign: 'center', // Center the text
  },
});

export default Home;
