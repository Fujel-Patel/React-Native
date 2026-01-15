import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useCallback } from 'react'
import { Stack, useRouter } from 'expo-router'
import { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';

type NotificationItem = {
  id: number;
  title: string;
  body: string;
}

const ExploreScreen = () => {
  const router = useRouter(); // Initialize router

  const [data, setData] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const Response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      const json = await Response.json();
      const shuffled = json.sort(() => 0.5 - Math.random());
      setData(shuffled)
    }
    catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  // run mount
  useEffect(() => {
    fetchData();
  }, []);

  // 2. RUN ON PULL (Refresh)
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [])

  const handlePress = (item: NotificationItem) => {
    // NAVIGATE AND PASS DATA
    router.push({
      pathname: "/notification/[id]",
      params: {
        id: item.id,
        title: item.title,
        date: 'just now'
      }
    });
  }

  // 2. THE RENDER FUNCTION (How to draw one row)
  // The 'item' comes automatically from the FlatList loop
  const renderRow = ({ item }: { item: NotificationItem }) => {
    return (
      <TouchableOpacity onPress={() => handlePress(item)}>
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body}>{item.body}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size={'large'} color="#8ae1ee">
          <Text style={{ color: 'white', marginTop: 10 }}>Loading Data.....</Text>
        </ActivityIndicator>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      {/* 3. THE COMPONENT */}
      <FlatList
        data={data}       // The Array
        renderItem={renderRow}     // The Drawer Function
        keyExtractor={item => item.id.toString()} // Unique ID

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#8ae1ee']}
            tintColor="#8ae1ee"
          />
        }

        contentContainerStyle={{ paddingBottom: 50 }} // Padding at bottom so last item isn't cut off
      />
      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/modal')}
      >
        <Ionicons name="add" size={30} color="#005f73" />
      </TouchableOpacity>
    </View>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({
  container: {
    flex: 1, // IMPORTANT: FlatList needs a container with height (flex:1) to scroll
    backgroundColor: '#121212',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 5,
  },
  // Row/Card Style
  card: {
    backgroundColor: '#000000ff', // Dark Gray card on Black background
    padding: 20,
    marginBottom: 15, // Space between rows
    borderRadius: 12,
    borderLeftWidth: 4, // Nice colored strip on the left
    borderLeftColor: '#8ae1ee',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    color: '#888',
    fontSize: 12,
    marginTop: 5,
  },
  fab: {
    position: 'absolute', // Allows it to float over other content
    bottom: 30,           // Distance from bottom
    right: 20,            // Distance from right
    width: 60,
    height: 60,
    borderRadius: 30,     // Circle
    backgroundColor: '#8ae1ee',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,         // Shadow on Android
    shadowColor: '#000',  // Shadow on iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  }
})