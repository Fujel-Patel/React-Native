import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// 1. ADD THIS DUMMY DATA AT THE TOP (Outside Component)
const STORIES = [
  { id: '1', name: 'You', img: 'https://reactnative.dev/img/tiny_logo.png', isMyStory: true },
  { id: '2', name: 'Fujel', img: 'https://i.pravatar.cc/150?img=12' },
  { id: '3', name: 'Alice', img: 'https://i.pravatar.cc/150?img=32' },
  { id: '4', name: 'Bob', img: 'https://i.pravatar.cc/150?img=11' },
  { id: '5', name: 'Zara', img: 'https://i.pravatar.cc/150?img=5' },
  { id: '6', name: 'Mike', img: 'https://i.pravatar.cc/150?img=3' },
];

const HomeScreen = () => {
  const router = useRouter();
  const [name, setName] = useState('User');

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('user-token');
      if(!token){
        router.replace('/login');
      }else{
        const storedName = await AsyncStorage.getItem('user-name');
        if(storedName) setName(storedName);
      }
    };
    // check-login
    checkLogin();
  }, [])
  return (
    <View style={styles.container}>

      {/* 1. HEADER SECTION */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning,</Text>
          <Text style={styles.username}>{name}</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
          <ImageBackground
            source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
            style={styles.avatar}
            imageStyle={{ borderRadius: 25 }}
          />
        </TouchableOpacity>
      </View>

      {/* 2. MAIN SCROLLABLE CONTENT */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 2. STORIES SECTION */}
        <View style={{marginBottom: 25, height: 140}} >
          <Text style={styles.sectionTitle}>Recent Stories</Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              paddingRight: 20,
              alignItems: 'center',
            }}
          >
              {
                STORIES.map((story) => (
                  <TouchableOpacity
                  key={story.id}
                  style= {styles.storyContainer}
                  >
                    <View>
                      <ImageBackground
                      source={{uri: story.img}}
                      style={styles.storyAvatar}
                      imageStyle={{borderRadius: 35}}
                      >
                        {
                          story.isMyStory && (
                            <View style={styles.addStoryBadge}>
                              <Ionicons name='add' size={14} color={'white'} />
                            </View>
                          )
                        }
                      </ImageBackground>
                    </View>
                    <Text style={styles.storyName}>{story.name}</Text>
                  </TouchableOpacity>
                ))
              }
          </ScrollView>
        </View>

        {/* HERO CARD (Kept bright for contrast) */}
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Welcome Back!</Text>
          <Text style={styles.heroSubtitle}>You have 5 new notifications today.</Text>
          <TouchableOpacity
            style={styles.heroButton}
            onPress={() => router.push('/(tabs)/explore')}
          >
            <Text style={styles.heroButtonText}>Check Updates</Text>
          </TouchableOpacity>
        </View>

        {/* QUICK ACTIONS GRID */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.gridContainer}>
          {/* Action 1: Profile */}
          <Link href="/(tabs)/profile" asChild>
            <TouchableOpacity style={styles.gridItem}>
              {/* Changed BG to #333 to look good in dark mode */}
              <View style={[styles.iconBox, { backgroundColor: '#333' }]}>
                <Ionicons name="person" size={24} color="#8ae1ee" />
              </View>
              <Text style={styles.gridLabel}>My Profile</Text>
            </TouchableOpacity>
          </Link>

          {/* Action 2: Notifications */}
          <Link href="/(tabs)/explore" asChild>
            <TouchableOpacity style={styles.gridItem}>
              <View style={[styles.iconBox, { backgroundColor: '#333' }]}>
                <Ionicons name="notifications" size={24} color="#d500f9" />
              </View>
              <Text style={styles.gridLabel}>Alerts</Text>
            </TouchableOpacity>
          </Link>

          {/* Action 3: Settings */}
          <TouchableOpacity style={styles.gridItem} onPress={() => alert('Coming Soon!')}>
            <View style={[styles.iconBox, { backgroundColor: '#333' }]}>
              <Ionicons name="settings" size={24} color="#ff6d00" />
            </View>
            <Text style={styles.gridLabel}>Settings</Text>
          </TouchableOpacity>

          {/* Action 4: Help */}
          <TouchableOpacity style={styles.gridItem} onPress={() => router.push('/modal')}>
            <View style={[styles.iconBox, { backgroundColor: '#333' }]}>
              <Ionicons name="help-circle" size={24} color="#00c853" />
            </View>
            <Text style={styles.gridLabel}>Help</Text>
          </TouchableOpacity>

          {/* Action 5: Social */}
          <TouchableOpacity style={styles.gridItem} onPress={() => router.push('/Social')}>
            <View style={[styles.iconBox, { backgroundColor: '#333' }]}>
              <Ionicons name="help-circle" size={24} color="#00c853" />
            </View>
            <Text style={styles.gridLabel}>Help</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // DARK BACKGROUND
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  // HEADER
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  greeting: {
    fontSize: 16,
    color: '#aaa', // Light Grey for Greeting
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // White for Name
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: '#8ae1ee'
  },
  // HERO CARD
  heroCard: {
    backgroundColor: '#8ae1ee', // Keep the brand color
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
    elevation: 10,
  },
  heroTitle: {
    color: '#000', // Black text looks better on bright blue
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  heroSubtitle: {
    color: '#333',
    marginBottom: 20,
  },
  heroButton: {
    backgroundColor: '#121212', // Black button on Blue card
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // GRID
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#fff', // White Title
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#1E1E1E', // DARK GREY CARD
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333', // Subtle border
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  gridLabel: {
    fontWeight: '600',
    color: '#fff', // White Text
  },

  // STORIES
  storyContainer: {
    alignItems: 'center',
    marginRight: 20, // Space between circles
  },
  storyRing: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 2,
    borderColor: '#d500f9', // Purple "Active Story" color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  noRing: {
    borderColor: 'transparent', // No border for your own story
  },
  storyAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#333',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  storyName: {
    color: 'white',
    fontSize: 12,
    marginVertical: 10
  },
  addStoryBadge: {
    backgroundColor: '#8ae1ee',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#121212',
    bottom: 0,
    right: 0,
    position: 'absolute', // Sticks to the corner
  }
})