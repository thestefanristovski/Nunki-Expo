import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainButton from "./src/components/atoms/MainButton";
import VideoThumbnail from "./src/components/atoms/VideoThumbnail";
import PostSource from "./src/components/atoms/PostSource";
import EngagementMetric from "./src/components/atoms/EngagementMetric";
import PostLocation from "./src/components/atoms/PostLocation";
import PostMetadata from "./src/components/molecules/PostMetadata";
import PostEngagement from "./src/components/molecules/PostEngagement";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <MainButton title="Hello"></MainButton>
      <VideoThumbnail />
      <PostMetadata/>
      <PostEngagement/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
