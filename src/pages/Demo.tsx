import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text } from 'react-native';
import VideoPost from "../components/organisms/VIdeoPost";
import {DividerShortRegular} from "fluent-icons-react";
import TextPost from "../components/organisms/TextPost";
import PhotoPost from "../components/organisms/PhotoPost";
import SearchBar from "../components/molecules/SearchBar";
import PlatformPills from "../components/organisms/PillMultiselect";
// @ts-ignore
import styled from "styled-components/native";
import PostEngagement from "../components/molecules/PostEngagement";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Masonry from "@react-native-seoul/masonry-list"
import PillMultiselect from "../components/organisms/PillMultiselect";

const Cont = styled.View`
  background-color: #111121;
  padding: 40px;
`

const PostsContainer = styled.View`
  display: flex;
`


export default function Demo() {
    //API CALLS
    const baseUrl = 'http://localhost:3000/youtube/search'
    const [queryParams, setQueryParams] = useState('')
    // List of Elements in Grid
    const [videos, setVideos] = useState<any[]>([])
    const [columns, setColumns] = useState(2);
    //State: Content Type Multiselect Menu
    const [contentTypes, setContentTypes] = useState(["Photos", "Videos", "Text"])
    const [selectedContentTypes, setSelectedContentTypes] = useState(["Photos", "Videos", "Text"])
    //State: Platform Multiselect Menu
    const [platforms, setPlatforms] = useState(["Youtube", "Twitter", "Vimeo", "VK"])
    const [selectedPlatforms, setSelectedPlatforms] = useState(["Youtube", "Twitter", "Vimeo", "VK"])

//   const { isLoading, error, data } = useQuery('repoData', () => {
//     const url = 'http://localhost:3000/youtube/search?sort=relevance&min=1605681523&type=video&'+queryParams
//      fetch(url).then(res =>
//        res.json()
//       ).then(res => console.log(res))
//      }
//   )

    const fetchData = () => {
        const url = 'http://localhost:3000/youtube/search?sort=relevance&min=1605681523&type=video&q='+queryParams
        fetch(url).then(res =>
            res.json()
        ).then(res => {
            console.log(res.contents)
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



    React.useEffect(() => {
        function handleResize() {
            setColumns(Math.round(window.innerWidth/470));
        }

        window.addEventListener('resize', handleResize)
    })

    //TODO Unite the two functions
    const changedContentType = (element: string, another: string):void  => {
        console.log(element)
        console.log(selectedContentTypes)
        if (selectedContentTypes.includes(element)) {
            setSelectedContentTypes(selectedContentTypes.filter(selectedItem => selectedItem != element));
        } else if (element === "All") {
            setSelectedContentTypes(contentTypes);
        } else {
            setSelectedContentTypes(selectedContentTypes.concat(element));
        }
    }

    const changedPlatform = (element: string, another: string):void  => {
        console.log(element)
        console.log(selectedPlatforms)
        if (selectedPlatforms.includes(element)) {
            setSelectedPlatforms(selectedPlatforms.filter(selectedItem => selectedItem != element));
        } else if (element === "All") {
            setSelectedPlatforms(platforms);
        } else {
            setSelectedPlatforms(selectedPlatforms.concat(element));
        }
    }

    return (
        <Cont>
        <SearchBar onPress={makeQuery} onChange={setQueryParams}/>
        <DividerShortRegular size={30} color="transparent"/>
        <PillMultiselect title={"Content Types"} options={contentTypes} selected={selectedContentTypes} onSelected={changedContentType}/>
        <PillMultiselect title={"Platforms"} options={platforms} selected={selectedPlatforms} onSelected={changedPlatform}/>
        <Masonry
        data = {videos}
        numColumns = {columns}
        renderItem = {({item}) => <VideoPost metricTitle1={'views'} metricAmount1={item.views}
                                             title={item.title}
                                             metricTitle2={'thumbsup'} metricAmount2={item.likes}
                                             metricTitle3={'thumbsdown'} metricAmount3={item.dislikes}
                                             description={item.text.substring(0, 300)}
                                             thumbnail={item.image}
                                             channel={item.userfullname}
                                             socialMedia={item.network}
                                             postTime={item.unix}
                                             postLocation={item.location.coordinates.join(',')}
                                             videoLink={item.link}
                                             length={item.duration}/>}
        />
        <StatusBar style="auto" />
      </Cont>
    )
}
