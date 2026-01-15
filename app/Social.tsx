import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Social = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Social</Text>
    </View>
  )
}

export default Social

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    Text: {
        color: '#0814f1ff',
    }
})