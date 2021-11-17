import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import VideoPost from "./src/components/organisms/VIdeoPost";
import {DividerShortRegular} from "fluent-icons-react";
import TextPost from "./src/components/organisms/TextPost";
import PhotoPost from "./src/components/organisms/PhotoPost";
import TypePills from "./src/components/organisms/TypePills";
import SearchBar from "./src/components/molecules/SearchBar";
import PlatformPills from "./src/components/organisms/PlatformPills";
// @ts-ignore
import styled from "styled-components/native";
import PostEngagement from "./src/components/molecules/PostEngagement";


const Cont = styled.View`
  background-color: #111121;
  padding: 40px;
`

const PostsContainer = styled.View`
  display: flex;
`

export default function App() {
  return (
    <Cont>
      <SearchBar/>
      <DividerShortRegular size={30} color="transparent"/>
      <TypePills/>
      <PlatformPills/>
      <PostsContainer>
          <VideoPost/>
          <TextPost/>
          <PhotoPost/>
      </PostsContainer>
      <StatusBar style="auto" />
    </Cont>
  );
}
