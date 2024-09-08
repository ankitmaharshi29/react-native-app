// components/Dashboard.js
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Home from './Home';
import Profile from './Profile';

const Dashboard = ({ userData, onLogout }) => {
  const [selectedTab, setSelectedTab] = useState('Home'); // Default tab is 'Home'

  return (
    <View style={styles.container}>
      {/* Content Section */}
      <View style={styles.content}>
        {selectedTab === 'Home' ? <Home userData={userData}/> : <Profile userData={userData} onLogout={onLogout} />}
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        {/* Home Tab */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setSelectedTab('Home')}
        >
          <HomeIcon />
        </TouchableOpacity>

        {/* Profile Tab */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setSelectedTab('Profile')}
        >
          <ProfileIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HomeIcon = () => (
  <Svg width={64} height={44} viewBox="0 0 24 24" fill="none">
    <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="#000" />
  </Svg>
);

const ProfileIcon = () => (
  <Svg width={74} height={44} viewBox="0 0 24 24" fill="none">
    <Path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z" fill="#000" />
    <Path d="M12 14c-4.4 0-8 3.6-8 8 0 .5.4 1 1 1h14c.5 0 1-.5 1-1 0-4.4-3.6-8-8-8z" fill="#000" />
  </Svg>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    height:70
  },
  navItem: {
    alignItems: 'center',

  },
});

export default Dashboard;
