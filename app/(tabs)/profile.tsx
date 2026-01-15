import { StyleSheet, Text, TextInput, View, Pressable, KeyboardAvoidingView, Platform, Alert, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => { // Capitalized component name (Standard React practice)
  const router = useRouter();
  const [name, setName] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  const handleSave = async () => {
    const storedName = await AsyncStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    } else {
      if (!name.trim()) {
        Alert.alert("Oops!", "Please enter your name first.");
        return;
      }

      setSavedMessage("Profile updated!"); // Show message in UI

      Alert.alert(
        "Success",
        "Your profile has been saved.",
        [{ text: "OK", onPress: () => router.back() }]
      );
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user-token');
    await AsyncStorage.removeItem('user-name');
    router.replace('/login');
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >

      {/* logout */}
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.logout}
      >
        <Entypo style={styles.logout} name="log-out" size={30} color="white" />
      </TouchableOpacity>
      <View style={styles.card}>

        {/* 1. Profile Image with GLOW */}
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/Fujel.png')}
            style={styles.avatar}
            contentFit="cover" // Better than resizeMode in expo-image
          />
        </View>

        <Text style={styles.title}>Edit Profile</Text>

        {/* 2. Input Section */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.editInput}
          value={name}
          onChangeText={setName}
          placeholder='Set your name'
          placeholderTextColor="#666" // Make placeholder visible on dark bg
        />

        {/* 3. Button */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Save Changes</Text>
        </Pressable>

        {/* 4. Success Message */}
        {savedMessage !== '' && (
          <Text style={styles.successText}>✓ {savedMessage}</Text>
        )}
      </View>
    </KeyboardAvoidingView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Matches home screen dark background
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#000000',
    borderRadius: 20,
    width: '100%',
    padding: 25,
    paddingTop: 40, // Added padding top to make room for the image content

    // SHADOWS (Blue Glow)
    shadowColor: '#8ae1ee',
    shadowOffset: { width: 0, height: 0 }, // 0,0 for even glow
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#333', // Subtle border to separate card from black background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // CHANGED: White text to see it on black card
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  imageContainer: {
    // Positioning
    alignSelf: 'center',
    marginTop: -75, // Pulls it out of the card
    marginBottom: 10,

    // Size
    width: 110,  // Slightly bigger
    height: 110,
    borderRadius: 55,

    // The Glow
    backgroundColor: '#000',
    shadowColor: '#8ae1ee',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 20,
    zIndex: 999, // Ensures it stays on top
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#000', // Black border to blend with container
  },
  label: {
    fontSize: 14,
    color: '#8ae1ee', // CHANGED: Blue label looks cool in dark mode
    marginBottom: 8,
    marginLeft: 5,
    fontWeight: '600',
  },
  editInput: {
    width: '100%',
    height: 50, // CHANGED: Taller is better
    backgroundColor: '#1a1a1a', // CHANGED: Dark gray background (not white)
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12, // More rounded
    paddingHorizontal: 15,
    marginBottom: 25,
    fontSize: 16,
    color: 'white', // White text when typing
  },
  button: {
    backgroundColor: '#8ae1ee',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#8ae1ee',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }] // Tiny shrink effect when clicking
  },
  buttonText: {
    color: '#000', // Black text on blue button is easiest to read
    fontSize: 16,
    fontWeight: 'bold'
  },
  successText: {
    marginTop: 20,
    color: '#00c853', // Bright Green
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logout: {
    position: 'absolute',
    top: 10,
    right: 10
  }
})