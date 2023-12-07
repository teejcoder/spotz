import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { Link } from 'expo-router'

export default class Map extends Component {
  render() {
    return (
      <View>
        <Link href="/">
          <Text>
            Go back
          </Text>
        </Link>

        <Text>
          Map
        </Text>

      </View>
    )
  }
}