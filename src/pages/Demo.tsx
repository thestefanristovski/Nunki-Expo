import { StatusBar } from 'expo-status-bar';
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
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
import MainButton from "../components/atoms/MainButton";
import {queryParamsContext, QueryParamsProvider} from "../state/queryParams";


const Cont = styled.View`
  background-color: #111121;
  padding: 30px;
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
    // List of Elements in Grid
    const [columns, setColumns] = useState(2);
    //State: Content Type Multiselect Menu
    const [contentTypes, setContentTypes] = useState(["Photos", "Videos", "Text"])
    const [selectedContentTypes, setSelectedContentTypes] = useState(["Photos", "Videos", "Text"])
    //State: Platform Multiselect Menu
    const [platforms, setPlatforms] = useState(["Youtube", "Twitter", "Vimeo", "VK"])
    const [selectedPlatforms, setSelectedPlatforms] = useState(["Youtube", "Twitter", "Vimeo", "VK"])
    //State: Pagination
    const [last, setLast] = useState<any[]>([])

    //State: Location center and radius
    const [radius, setRadius] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    const [clusters, setCluster] = useState(["Topic 1", "Topic 2", "Topic 3", "Topic 4"])
    const [selectedCluster, setSelectedCluster] = useState(["Topic 1 ", "Topic 2", "Topic 3", "Topic 4"])

    const youtubeBaseUrl = 'https://search.api.nunki.co/youtube/search?'
    const vimeoBaseUrl = 'https://search.api.nunki.co/vimeo/search?'
    const OrderBy = ['relevant', 'recent', 'popular']
    const [selectedOrder, setSelectedOrder] = useState(0);
    //State: Page display
    const [onAdvanced, setOnAdvanced] = useState(false);
    const [onMap, setOnMap] = useState(false);

    const [queryParameters, setQueryParameters] = useState('noQuery')

    // MAKING A QUERY =========================================================

    const fetchData = async (key: any):Promise<any[]> => {
        if (key.queryKey[1] !== 'noQuery') {
            //get previous results or initialize new array
            let res = data;
            if (res === undefined) {
                res = [];
            }

            console.log("LOG")
            console.log(key.queryKey[1])

            //fetch data
            const parameters = `min=1605681523&type=video&normalize=true&limit=10&sort=${OrderBy[selectedOrder]}&anyKeywords=${key.queryKey[1]}`
                + `${latitude && longitude && radius ? `&lat=${latitude}&lng=${longitude}&radius=${radius}`:''}`;
            let urlYoutube = youtubeBaseUrl + parameters;
            let urlVimeo = vimeoBaseUrl + parameters;
            if (last.length !== 0) {
                urlYoutube += '&next=' + last[0];
                urlVimeo += '&next=' + last[1];
            }

            await Promise.all([
                fetch(urlYoutube),
                fetch(urlVimeo)
            ]).then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
                .then(([data1, data2]) => {
                    let next:any[] = [];
                    if (data1.contents !== undefined) {
                        // @ts-ignore
                        res = res.concat(data1.contents);
                    }
                    if (data2.contents !== undefined) {
                        // @ts-ignore
                        res = res.concat(data2.contents);
                    }
                    next = next.concat(data1.next)
                    next = next.concat(data2.next)

                    setLast(next)
                })

            return res;
        }
        else {
            return [];
        }
    }


    // @ts-ignore
    const { data, refetch, status } = useQuery(["key", queryParameters], fetchData );

    const makeQuery = async (text:string) => {
        setQueryParameters(text);
    }

    useEffect(() => {
        console.log(latitude)
        console.log(longitude)
        console.log(radius)
    }, [latitude, longitude, radius])

    // LISTENER FOR MAP ===================================================


    const onSelectLocation = (latitude: string, longitude: string, radius: string) => {
        console.log(latitude)
        console.log(longitude)
        console.log(radius)
        if (latitude && longitude && radius) {
            setRadius(radius);
            setLatitude(latitude);
            setLongitude(longitude);
        }
        setOnMap(false);
        //setRadius(radius);
    }

    // VISUAL =================================================================

    //Recalculate the number of columns to display for grid
    React.useEffect(() => {
        function handleResize() {
            setColumns(Math.round(window.innerWidth/500));
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

    //FUNCTIONS FOR PAGE STATE CHANGE ==================================================
    const onChangeAdvanced = (changeTo: boolean) => {
        setOnAdvanced(changeTo);
    }

    const onChangeMap = (changeTo: boolean) => {
        setOnMap(changeTo);
    }

    let mapSelected = true;
    if (Number(latitude)===0 && Number(longitude)===0 && Number(radius)===0) {
        mapSelected = false;
    }

    return (
        <QueryParamsProvider>
            <Cont>
                <SearchBar onPressSearch={makeQuery} onAdvanced={onAdvanced} onChangeAdvanced={onChangeAdvanced} onChangeMap={onChangeMap} onMap={onMap} hasLocation={mapSelected}/>
                {!onMap && !onAdvanced &&
                <PanelView>
                    <View>
                        <PillMultiselect options={contentTypes} selected={selectedContentTypes} onSelected={changedContentType} />
                    </View>
                    <View>
                        <DropDown onChangedValue={changedOrderBy}/>
                    </View>
                </PanelView>}
                {onAdvanced && <Advanced/>}
                {onMap && <Map onSelectLocation={onSelectLocation}/>}
            </Cont>
            <View style={{zIndex:-10}}>
                {status === 'success' && <Masonry
                    // @ts-ignore
                    data = {data}
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
                />}
                {data !== undefined && data.length !== 0 &&
                <View style={{marginVertical: 50,  marginHorizontal: 30}}>
                    <MainButton title={"Load More"} onPress={makeQuery}/>
                </View>
                }
                {status === 'loading' && <ActivityIndicator size="large" color="white"/> }
                {status === 'error' &&
                <Cont>
                    <Text style={{color: 'white'}}>There was an error loading your results.</Text>
                </Cont>}
            </View>
        </QueryParamsProvider>

    )
}
