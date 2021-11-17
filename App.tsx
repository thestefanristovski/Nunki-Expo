import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainButton from "./src/components/atoms/MainButton";
import VideoPost from "./src/components/organisms/VIdeoPost";
import {DividerShortRegular} from "fluent-icons-react";
import TextPost from "./src/components/organisms/TextPost";
import PhotoPost from "./src/components/organisms/PhotoPost";

export default function App() {
  return (
    <View style={styles.container}>
      <MainButton title="I'm a button"></MainButton>
        <DividerShortRegular size={30} color="transparent"/>
      <VideoPost/>
      <TextPost/>
      <PhotoPost/>
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
