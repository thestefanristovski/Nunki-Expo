import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text } from 'react-native';
import VideoPost from "../components/organisms/VIdeoPost";
import {DividerShortRegular} from "fluent-icons-react";
import TextPost from "../components/organisms/TextPost";
import PhotoPost from "../components/organisms/PhotoPost";
import TypePills from "../components/organisms/TypePills";
import SearchBar from "../components/molecules/SearchBar";
import PlatformPills from "../components/organisms/PlatformPills";
// @ts-ignore
import styled from "styled-components/native";
import PostEngagement from "../components/molecules/PostEngagement";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'


const Cont = styled.View`
  background-color: #111121;
  padding: 40px;
`

const PostsContainer = styled.View`
  display: flex;
`


export default function Demo() {
    const baseUrl = 'http://localhost:3000/youtube/search'
  const [videos, setVideos] = useState<any[]>([])
  const [queryParams, setQueryParams] = useState('')

//   const { isLoading, error, data } = useQuery('repoData', () => {
//     const url = 'http://localhost:3000/youtube/search?sort=relevance&min=1605681523&type=video&'+queryParams
//      fetch(url).then(res =>
//        res.json()
//       ).then(res => console.log(res))
//      }
//   )

    const fetchData = () => {
        const url = 'http://localhost:3000/youtube/search?sort=relevance&min=1605681523&type=video&'+queryParams
        fetch(url).then(res =>
            res.json()
        ).then(res => {
            setVideos(res.contents)
        })
    }

    const { isLoading, error, data, refetch } = useQuery("key", fetchData, {
        refetchOnWindowFocus: false,
        enabled: false // needed to handle refetchs manually
    });
  
    const makeQuery = () => {
        refetch()
    }
    
    return (
        <Cont>
        <SearchBar onPress={makeQuery} onChange={setQueryParams}/>
        <DividerShortRegular size={30} color="transparent"/>
        <TypePills/>
        <PlatformPills/>
        <PostsContainer>
            {videos.map((video, index) => (
                <VideoPost metricTitle1={'views'} metricAmount1={video.views} 
                title={video.title}
                metricTitle2={'likes'} metricAmount2={video.likes} 
                metricTitle3={'dislikes'} metricAmount3={video.dislikes} 
                description={video.description}
                thumbnail={video.thumbnail}
                channel={video.channel}/>
            ))}
        </PostsContainer>
        <StatusBar style="auto" />
      </Cont>
    )
}