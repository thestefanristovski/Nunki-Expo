import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
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
import {BrowserRouter as Router, Routes, Route, Link, Outlet} from "react-router-dom";
import Advanced from "../components/organisms/AdvancedSearch";
import DropDown from "../components/molecules/DropDown";
import moment from "moment";
import {fromUnixTime, formatDistanceToNowStrict} from 'date-fns'
import MultiselectFilterMenu from "../components/organisms/MultiselectFilterMenu";
import KeywordFilterMenu from "../components/organisms/KeywordFilterMenu";
import SliderFilterMenu from "../components/organisms/SliderFilterMenu";
import Map from "../components/organisms/Map"


const Cont = styled.View`
  background-color: #111121;
  padding: 40px;
`

const PostsContainer = styled.View`
  display: flex;
`

const PanelView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 20px;
  align-self: stretch;
  justify-content: space-between;
`

export default function Demo() {
    //API CALLS
    const baseUrl = 'http://localhost:3000/youtube/search'
    const [queryParams, setQueryParams] = useState([])
    // List of Elements in Grid
    const [videos, setVideos] = useState<any[]>([])
    const [columns, setColumns] = useState(2);
    //State: Content Type Multiselect Menu
    const [contentTypes, setContentTypes] = useState(["Photos", "Videos", "Text"])
    const [selectedContentTypes, setSelectedContentTypes] = useState(["Photos", "Videos", "Text"])
    //State: Platform Multiselect Menu
    const [platforms, setPlatforms] = useState(["Youtube", "Twitter", "Vimeo", "VK"])
    const [selectedPlatforms, setSelectedPlatforms] = useState(["Youtube", "Twitter", "Vimeo", "VK"])

    // MAKING A QUERY =========================================================
    // TODO adapt to array of parameters

    const fetchData = () => {
        //const url = 'https://search.api.nunki.co/youtube/search?limit=50&sort=relevant&min=1605681523&type=video&allKeywords='+queryParams.join(',')
        const url = 'https://search.api.nunki.co/youtube/search?min=1605681523&type=video&normalize=true&sort=relevant&anyKeywords=' + queryParams.join(',');
        console.log(url);
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

    // SEARCH BAR KEYWORD METHODS ==============================================

    // A keyword needs to be added
    const onAddKeyword = async (text: string) => {
        if (text.endsWith(',')) {
            const keyword:string = text.substring(0, text.lastIndexOf(','));
            const keywords:string[] = queryParams;
            if (!keywords.includes(keyword)) {
                // @ts-ignore
                setQueryParams(keywords.concat(keyword));
            }
        } else {
            const keywords:string[] = queryParams;
            if (!keywords.includes(text)) {
                // @ts-ignore
                setQueryParams(keywords.concat(text));
            }
        }
    }

    // A keyword is deleted
    const onDeleteKeyword = (text:string) => {
        const keywords:string[] = queryParams;
        // @ts-ignore
        setQueryParams(keywords.filter(item => item !== text));
    }

    useEffect(() => {
        console.log("YO");
        console.log(queryParams);
    }, [queryParams])



    // VISUAL =================================================================

    //Recalculate the number of columns to display for grid
    React.useEffect(() => {
        function handleResize() {
            setColumns(Math.round(window.innerWidth/600));
        }

        window.addEventListener('resize', handleResize)
    })

    // MULTISELECT MENU LISTENERS =================================================
    //TODO Unite the two functions

    // Listener for changed content type
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

    // Listener for changed platform
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
        <Router>
        <Cont>
            <Routes>
                <Route path = "/" element = {<>
                    <SearchBar onPressSearch={makeQuery} onAddKeyword={onAddKeyword} keywords={queryParams} onDelete={onDeleteKeyword}/>
                    <PanelView>
                        <View>
                            <PillMultiselect options={contentTypes} selected={selectedContentTypes} onSelected={changedContentType} />
                        </View>
                        <View>
                            <DropDown/>
                        </View>
                    </PanelView>
                    <PillMultiselect title={"Platforms"} options={platforms} selected={selectedPlatforms} onSelected={changedPlatform} />
                </>} />
                <Route path = "/advanced" element = {<>
                    <SearchBar onPressSearch={makeQuery} onAddKeyword={onAddKeyword} keywords={queryParams} onDelete={onDeleteKeyword} onAdvanced={true}/>
                    <Advanced/>
                </>} />
                <Route path = "/map" element = {<Map/>} />
            </Routes>
            <Masonry
            data = {videos}
            numColumns = {columns}
            renderItem = {({item}) => <VideoPost metricTitle1={'views'} metricAmount1={item.views}
                                                 title={item.title}
                                                 metricTitle2={'thumbsup'} metricAmount2={item.likes}
                                                 metricTitle3={'thumbsdown'} metricAmount3={item.dislikes}
                                                 description={item.text.substring(0, 300)}
                                                 thumbnail={item.image}
                                                 channel={item.user_fullname}
                                                 socialMedia={item.network}
                                                 postTime={formatDistanceToNowStrict(fromUnixTime(item.unix), {addSuffix: true})}
                                                 postLocation={item.location && item.location.coordinates.join(',')}
                                                 videoLink={item.link}
                                                 length={item.duration}/>}
            />
            <StatusBar style="auto" />
        </Cont>
        </Router>
    )
}
