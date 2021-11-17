import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import VideoPost from "./src/components/organisms/VIdeoPost";
import {DividerShortRegular} from "fluent-icons-react";
import TextPost from "./src/components/organisms/TextPost";
import PhotoPost from "./src/components/organisms/PhotoPost";
import InputField from "./src/components/molecules/InputField";
import TypePills from "./src/components/organisms/TypePills";

export default function App() {
  return (
    <View style={styles.container}>
      <InputField onPress={function (): void {} }></InputField>
      <DividerShortRegular size={30} color="transparent"/>
      <TypePills/>
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
