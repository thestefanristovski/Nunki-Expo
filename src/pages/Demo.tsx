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
import ClusterMenu from '../components/organisms/ClusterMenu';


const Cont = styled.View`
  background-color: #111121;
  padding: 40px;
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
    //Query Parameters
    const [queryParams, setQueryParams] = useState([])
    // List of Elements in Grid
    const [results, setResults] = useState<any[]>([])
    const [columns, setColumns] = useState(2);
    //State: Content Type Multiselect Menu
    const [contentTypes, setContentTypes] = useState(["Photos", "Videos", "Text"])
    const [selectedContentTypes, setSelectedContentTypes] = useState(["Photos", "Videos", "Text"])
    //State: Platform Multiselect Menu
    const [platforms, setPlatforms] = useState(["Youtube", "Twitter", "Vimeo", "VK"])
    const [selectedPlatforms, setSelectedPlatforms] = useState(["Youtube", "Twitter", "Vimeo", "VK"])

    //State: Location center and radius
    const [radius, setRadius] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    const [clusters, setCluster] = useState(["Topic 1", "Topic 2", "Topic 3", "Topic 4"])
    const [selectedCluster, setSelectedCluster] = useState(["Topic 1 ", "Topic 2", "Topic 3", "Topic 4"])

    const youtubeBaseUrl = 'https://search.api.nunki.co/youtube/search?'
    const vimeoBaseUrl = 'https://search.api.nunki.co/vimeo/search?'
    const OrderBy = ['relevance', 'recent', 'popular']
    const [selectedOrder, setSelectedOrder] = useState(0);
    // MAKING A QUERY =========================================================
    // TODO adapt to array of parameters

    const fetchData = () => {
        console.log(latitude)
        console.log(longitude)
        console.log(radius)
        const parameters = `min=1605681523&type=video&normalize=true&limit=10&sort=relevant&anyKeywords=${queryParams.join(',')}` 
        + `${latitude && longitude && radius ? `&lat=${latitude}&lng=${longitude}&radius=${radius}`:''}`;
        //const url = 'https://search.api.nunki.co/youtube/search?limit=50&sort=relevant&min=1605681523&type=video&allKeywords='+queryParams.join(',')
        const urlYoutube = youtubeBaseUrl + parameters;
        const urlVimeo = vimeoBaseUrl + parameters;
        console.log(urlYoutube);
        console.log(urlVimeo);
        Promise.all([
            fetch(urlYoutube),
            fetch(urlVimeo)
        ]).then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) => {
            let vids = results;
            console.log(data1.contents);
            console.log(data2.contents);
            vids = vids.concat(data1.contents);
            vids = vids.concat(data2.contents);
            console.log(vids);
            setResults(vids);
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
        console.log(latitude)
        console.log(longitude)
        console.log(radius)
    }, [queryParams, latitude, longitude, radius])


    const onSelectLocation = (latitude: string, longitude: string, radius: string) => {
        console.log('IN FONCTION')
        console.log(latitude)
        console.log(longitude)
        console.log(radius)
        if (latitude && longitude && radius) {
            console.log('IN FONCTION')
            setRadius(radius);
            setLatitude(latitude);
            setLongitude(longitude);
        }
        //setRadius(radius);
    }

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

    // DROPDOWN ORDER BY MENU LISTENER =============================================
    const changedOrderBy = (element: number) => {
        setSelectedOrder(element);
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

    const changedCluster = (element: string, another: string):void  => {
        console.log(element)
        console.log(selectedCluster)
        if (selectedCluster.includes(element)) {
            setSelectedCluster(selectedCluster.filter(selectedItem => selectedItem != element));
        } else if (element === "All") {
            setSelectedCluster(clusters);
        } else {
            setSelectedCluster(selectedCluster.concat(element));
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
                            <DropDown onChangedValue={changedOrderBy}/>
                        </View>
                    </PanelView>

                </>} />
                <Route path = "/advanced" element = {<>
                    <SearchBar onPressSearch={makeQuery} onAddKeyword={onAddKeyword} keywords={queryParams} onDelete={onDeleteKeyword} onAdvanced={true}/>
                    <Advanced/>
                </>} />
                <Route path = "/map" element = {<Map onSelectLocation={onSelectLocation}/>} />
            </Routes>
            <View style={{zIndex:-10}}>
                <Masonry
                    data = {results}
                    numColumns = {columns}
                    // @ts-ignore
                    renderItem = {({item}) => {
                        if (item.content_type === 'video' && selectedContentTypes.includes("Videos")) {
                            let metricTitles = ['views', 'thumbsup', "thumbsdown"]
                            let metricAmounts = [item.views, item.likes, item.dislikes]
                            if (item.network === 'vimeo') {
                                metricTitles = ['views', 'likes', "comments"]
                            }
                            if ((item.network === 'youtube' && selectedPlatforms.includes('Youtube')) || (item.network === 'vimeo' && selectedPlatforms.includes('Vimeo'))) {
                                return <VideoPost title={item.title}
                                                  description={item.text}
                                                  metricTitles={metricTitles}
                                                  metricAmounts={metricAmounts}
                                                  thumbnail={item.image}
                                                  channel={item.user_fullname}
                                                  socialMedia={item.network}
                                                  postTime={formatDistanceToNowStrict(fromUnixTime(item.unix), {addSuffix: true})}
                                                  postLocation={item.location && item.location.coordinates.join(',')}
                                                  postLink={item.link}
                                                  length={item.duration}/>
                            } else {
                                return null
                            }

                        } else {
                            return null
                        }

                    }}
                />
            </View>
            <StatusBar style="auto" />
        </Cont>
        </Router>
    )
}
