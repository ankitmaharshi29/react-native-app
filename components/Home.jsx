import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Video } from 'expo-av'; // Import Expo AV for video handling
import imageData from '../data/res.json';
import Header from './TagsNav';

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
      
      {/* Download button */}
      <TouchableOpacity style={styles.downloadButton} onPress={() => alert('Download functionality not implemented')}>
        <Text style={styles.downloadButtonText}>Download</Text>
      </TouchableOpacity>
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
  mediaContainer: {
    marginBottom: 20,
    width: Dimensions.get('window').width,
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
  downloadButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#03DAC6',
    borderRadius: 25,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Home;
