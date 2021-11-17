import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainButton from "./src/components/atoms/MainButton";
import VideoPost from "./src/components/organisms/VIdeoPost";
import {DividerShortRegular} from "fluent-icons-react";
import TextPost from "./src/components/organisms/TextPost";
import PhotoPost from "./src/components/organisms/PhotoPost";
import InputField from "./src/components/molecules/InputField";
import TypePills from "./src/components/organisms/TypePills";
import KeywordPill from "./src/components/atoms/KeywordPill";
import SearchBar from "./src/components/molecules/SearchBar";

export default function App() {
  return (
    <View style={styles.container}>
      <InputField onPress={function (): void {} }></InputField>
      <DividerShortRegular size={30} color="transparent"/>
      <TypePills/>
      <VideoPost/>
      <TextPost/>
      <PhotoPost/>
      <SearchBar/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111121',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
