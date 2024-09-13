import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import Header from './TagsNav';
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { getMedias } from '../services/apis';
import Share from 'react-native-share'; // Import react-native-share


const Home = ({ userData }) => {
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [allMedia, setAllMedia] = useState([]);
  const [playingVideoIndex, setPlayingVideoIndex] = useState(null);
  const [filteredTags, setFilteredTags] = useState([]);
  const flatListRef = useRef(null);

  const userImage = userData?.img || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mediaData = await getMedias();
        setAllMedia(mediaData.list || []);
        setFilteredMedia(mediaData.list || []);
        
        // Dynamically extract tags based on available media
        const tagsInMedia = new Set(['all']); // Always include 'all'
        mediaData.list.forEach(item => {
          if (Array.isArray(item.tag)) {
            item.tag.forEach(tag => tagsInMedia.add(tag));
          } else {
            tagsInMedia.add(item.tag);
          }
        });
        setFilteredTags([...tagsInMedia]); // Convert Set to Array and set state
      } catch (error) {
        console.error('Error fetching media data:', error);
      }
    };
    fetchData();
  }, []);

  const filterMedia = (tag) => {
    if (tag === 'all') {
      setFilteredMedia(allMedia);
    } else {
      const filteredItems = allMedia.filter(
        (item) => item.tag === tag || (Array.isArray(item.tag) && item.tag.includes(tag))
      );
      setFilteredMedia(filteredItems);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setPlayingVideoIndex(viewableItems[0].index);
    }
  }).current;

  const handleShare = async (uri) => {
    try {
      const shareOptions = {
        title: 'Share Media',
        message: 'Check out this amazing content!',
        url: uri,
      };
      await Share.open(shareOptions);
    } catch (error) {
      
    }
  };

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
        <Image source={{ uri: userImage }} style={styles.userImageOverlay} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.shareButton]}
          onPress={() => handleShare(item.type === 'image' ? item.image : item.video)}
        >
          <FontAwesome name="whatsapp" size={24} color="white" />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.downloadButton]} onPress={() => alert('Download functionality not implemented')}>
          <MaterialIcons name="file-download" size={24} color="white" />
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => alert('Edit functionality not implemented')}>
          <Feather name="edit" size={24} color="white" />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.newButton} onPress={() => alert('New functionality not implemented')}>
        <Text style={styles.newButtonText}>अपनी फोटो बदले</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Pass filteredTags to Header component */}
      <Header tags={filteredTags} onSelectTag={filterMedia} />
      <FlatList
        ref={flatListRef}
        data={filteredMedia}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id || index.toString()} // Ensure a unique key
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
    borderRadius: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginHorizontal: 5,
    minWidth: 120,
  },
  shareButton: {
    backgroundColor: '#25D366',
  },
  downloadButton: {
    backgroundColor: '#9b59b6',
  },
  editButton: {
    backgroundColor: '#d3d3d3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
    textAlign: 'center',
  },
  newButton: {
    alignSelf: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  newButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
