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
import VideoPost from "./src/components/organisms/VIdeoPost";
import {DividerShortRegular} from "fluent-icons-react";
import TextPost from "./src/components/organisms/TextPost";

export default function App() {
  return (
    <View style={styles.container}>
      <MainButton title="I'm a button"></MainButton>
        <DividerShortRegular size={30} color="transparent"/>
      <VideoPost/>
      <TextPost/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111121',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
