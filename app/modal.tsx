import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert, KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

// 1. IMPORT IMAGE PICKER
import * as ImagePicker from 'expo-image-picker';

export default function CreatePostModal() {
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState<string | null>(null); // State for the image
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. FUNCTION TO PICK IMAGE
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Images only (no video)
      allowsEditing: true,  // Crop box
      aspect: [4, 3],       // Aspect ratio
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Save the image path
    }
  };

  const handleSubmit = async () => {
    if (!title || !body) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate Server Request
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert("Success", "Post created successfully!", [
        { text: "OK", onPress: () => router.back() }
      ]);
    }, 2000);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <Text style={styles.header}>Create New Post</Text>

        {/* TITLE INPUT */}
        <Text style={styles.label}>Title</Text>
        <TextInput 
          style={styles.input} 
          placeholder="What's on your mind?" 
          placeholderTextColor="#666"
          value={title}
          onChangeText={setTitle}
        />

        {/* CONTENT INPUT */}
        <Text style={styles.label}>Content</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Write your details here..." 
          placeholderTextColor="#666"
          value={body}
          onChangeText={setBody}
          multiline={true}      
          numberOfLines={4}     
          textAlignVertical="top" 
        />

        {/* 3. IMAGE PICKER UI */}
        <Text style={styles.label}>Add Image</Text>
        
        {image ? (
          // If image selected, show it + Remove button
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: image }} style={styles.imagePreview} />
            <TouchableOpacity onPress={() => setImage(null)} style={styles.removeImageButton}>
              <Ionicons name="close-circle" size={30} color="#ff5252" />
            </TouchableOpacity>
          </View>
        ) : (
          // If no image, show "Upload" button
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Ionicons name="camera" size={24} color="#8ae1ee" />
            <Text style={styles.uploadText}>Upload Photo</Text>
          </TouchableOpacity>
        )}

        {/* SUBMIT BUTTON */}
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.submitButtonText}>Publish Post</Text>
          )}
        </TouchableOpacity>

        {/* CANCEL BUTTON */}
        <TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    marginTop: 20,
    textAlign: 'center',
  },
  label: {
    color: '#8ae1ee',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 20,
  },
  textArea: {
    height: 100, 
  },
  // UPLOAD STYLES
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e1e1e',
    borderWidth: 1,
    borderColor: '#8ae1ee',
    borderStyle: 'dashed', // Dashed border looks cool for uploads
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  uploadText: {
    color: '#8ae1ee',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  imagePreviewContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  removeImageButton: {
    position: 'absolute',
    top: -10,
    right: -1,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  // BUTTONS
  submitButton: {
    backgroundColor: '#8ae1ee',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cancelButton: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelText: {
    color: '#666',
    fontSize: 16,
  }
});