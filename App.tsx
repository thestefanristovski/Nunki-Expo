import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text } from 'react-native';
import VideoPost from "./src/components/organisms/VIdeoPost";
import {DividerShortRegular} from "fluent-icons-react";
import TextPost from "./src/components/organisms/TextPost";
import PhotoPost from "./src/components/organisms/PhotoPost";
import SearchBar from "./src/components/molecules/SearchBar";
import PlatformPills from "./src/components/organisms/PillMultiselect";
// @ts-ignore
import styled from "styled-components/native";
import PostEngagement from "./src/components/molecules/PostEngagement";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Demo from './src/pages/Demo';


const queryClient = new QueryClient()

const StyledBcg = styled.View`
  background-color: #111121;
  height: 100%;
`

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledBcg>
        <Demo />
      </StyledBcg>
    </QueryClientProvider>
  );
}
