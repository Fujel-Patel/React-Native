import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, Stack } from 'expo-router'

const NotificationDetail = () => {
  // 1. Get the parameters passed from the list
  const { id, title, date } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      {/* 2. Configure the Header Title dynamically */}
      <Stack.Screen options={{ title: 'Details' }} />

      <Text style={styles.idText}>ID: {id}</Text>
      
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.body}>
          Here is where the full content of the notification would go. 
          In a real app, you might fetch more data using the ID: {id}.
        </Text>
      </View>
    </View>
  )
}

export default NotificationDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    justifyContent: 'center',
  },
  idText: {
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1a1a1a',
    padding: 30,
    borderRadius: 20,
    borderTopWidth: 4,
    borderTopColor: '#8ae1ee',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    color: '#888',
    marginBottom: 20,
  },
  body: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 24,
  }
})