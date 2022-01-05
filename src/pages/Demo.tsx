import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import VideoPost from "../components/organisms/VIdeoPost";
import SearchBar from "../components/molecules/SearchBar";
// @ts-ignore
import styled from "styled-components/native";
import { useQuery } from 'react-query'
import Masonry from "@react-native-seoul/masonry-list"
import PillMultiselect from "../components/organisms/PillMultiselect";
import Advanced from "../components/organisms/AdvancedSearch";
import DropDown from "../components/molecules/DropDown";
import moment from "moment";
import {fromUnixTime, formatDistanceToNowStrict, parse} from 'date-fns'
import Map from "../components/organisms/Map"
import MainButton from "../components/atoms/MainButton";
import {QueryParamsProvider} from "../state/queryParams";
import TextPost from "../components/organisms/TextPost";
import PhotoPost from "../components/organisms/PhotoPost";
import * as url from "url";


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
    //State: Pagination
    const [last, setLast] = useState<any[]>([])
    //State: Location center and radius
    const [radius, setRadius] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    //State: clusters
    const [clusters, setCluster] = useState(["Topic 1", "Topic 2", "Topic 3", "Topic 4"])
    const [selectedCluster, setSelectedCluster] = useState(["Topic 1 ", "Topic 2", "Topic 3", "Topic 4"])
    //State: Page display
    const [onAdvanced, setOnAdvanced] = useState(false);
    const [onMap, setOnMap] = useState(false);
    //Base URLs
    const youtubeBaseUrl = 'https://search.api.nunki.co/youtube/search?type=video&normalize=true'
    const vimeoBaseUrl = 'https://search.api.nunki.co/vimeo/search?type=video&normalize=true'
    const twitterBaseUrl = 'https://search.api.nunki.co/twitter/search?normalize=true'
    //State: Query Parameters (sent from context)
    const [queryParameters, setQueryParameters] = useState('noQuery')

    // MAKING A QUERY =========================================================

    const fetchData = async (key: any):Promise<any[]> => {
        if (key.queryKey[1] !== 'noQuery') {
            //get previous results or initialize new array
            let res = data;
            if (res === undefined) {
                res = [];
            }

            //fetch data
            let parameters = `&min=3&limit=10&sort=${key.queryKey[1].orderBy}&anyKeywords=${key.queryKey[1].anyKeywords.join(',')}`
                + `${latitude && longitude && radius ? `&lat=${latitude}&lng=${longitude}&radius=${radius}`:''}`;
            if (key.queryKey[1].excludedKeywords.length !== 0) {
                parameters += `&notKeywords=${key.queryKey[1].excludedKeywords.join(',')}`
            }
            if (key.queryKey[1].startDate !== 'noDate') {
                //parameters += `&min=${parse(key.queryKey[1].startDate, 'yyyy/MM/dd', new Date()).getTime()}`
            }
            if (key.queryKey[1].endDate !== 'noDate') {
                //parameters += `&max=${parse(key.queryKey[1].endDate, 'yyyy/MM/dd', new Date()).getTime()}`
            }

            let urlYoutube = youtubeBaseUrl + parameters;
            let urlVimeo = vimeoBaseUrl + parameters;
            let urlTwitter = twitterBaseUrl + parameters;

            if (last.length !== 0) {
                urlYoutube += '&next=' + last[0];
                urlVimeo += '&next=' + last[1];
                urlTwitter += '&next=' + last[2];
            }

            let twitterTypes = []
            if (key.queryKey[1].selectedContentTypes.includes('Video')) {
                twitterTypes.push('video')
            }
            if (key.queryKey[1].selectedContentTypes.includes('Text')) {
                twitterTypes.push('text')
            }
            if (key.queryKey[1].selectedContentTypes.includes('Photos')) {
                twitterTypes.push('image')
            }
            urlTwitter += '&type=' + twitterTypes.join(',')

            console.log(urlTwitter);

            await Promise.all([
                fetch(urlYoutube),
                fetch(urlVimeo),
                fetch(urlTwitter),
            ])
            .then(([resYT, resVim, resTw]) => Promise.all([resYT.json(), resVim.json(), resTw.json()]))
            .then(([dataYT, dataVim, dataTw]) => {
                let next:any[] = [];
                if (dataYT.contents !== undefined && key.queryKey[1].selectedPlatforms.includes('Youtube') && key.queryKey[1].selectedContentTypes.includes('Video')) {
                    // @ts-ignore
                    res = res.concat(dataYT.contents);
                }
                if (dataVim.contents !== undefined && key.queryKey[1].selectedPlatforms.includes('Vimeo') && key.queryKey[1].selectedContentTypes.includes('Video')) {
                    // @ts-ignore
                    res = res.concat(dataVim.contents);
                }
                if (dataTw.contents !== undefined && key.queryKey[1].selectedPlatforms.includes('Twitter')) {
                    // @ts-ignore
                    res = res.concat(dataTw.contents);
                }
                next = next.concat(dataYT.next)
                next = next.concat(dataVim.next)
                next = next.concat(dataTw.next)

                setLast(next)
            })
            console.log(res)
            return res;
        }
        else {
            return [];
        }
    }


    // @ts-ignore
    const { data, refetch, status } = useQuery(["key", queryParameters], fetchData, { refetchOnWindowFocus: false } );

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
    // Listener for changed content type
    const changedContentType = (element: string, another: string):void  => {
        if (selectedContentTypes.includes(element)) {
            setSelectedContentTypes(selectedContentTypes.filter(selectedItem => selectedItem != element));
        } else if (element === "All") {
            setSelectedContentTypes(contentTypes);
        } else {
            setSelectedContentTypes(selectedContentTypes.concat(element));
        }
    }

    // CLUSTERS ====================================================================

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
                            } else if (item.network === 'twitter') {
                                metricTitles = ['likes']
                                metricAmounts = [item.likes]
                            }
                            if (item.network === 'youtube' || item.network === 'vimeo' ) {
                                console.log("YOUTUBE - VIMEO")
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
                            } else if (item.content_type === 'video') {
                                console.log("TWITTER VIDEO")
                                return <VideoPost title={item.title}
                                                  description={''}
                                                  metricTitles={metricTitles}
                                                  metricAmounts={metricAmounts}
                                                  thumbnail={item.user_thumb}
                                                  channel={"@" + item.user_name}
                                                  socialMedia={item.network}
                                                  postTime={formatDistanceToNowStrict(fromUnixTime(item.unix), {addSuffix: true})}
                                                  postLocation={item.user_location}
                                                  postLink={item.link}
                                                  length={item.duration}/>
                            } else {
                                return null
                            }
                        } else if (item.content_type === 'text' && selectedContentTypes.includes("Text")){
                            let metricTitles = ['likes']
                            let metricAmounts = [item.likes]
                            return <TextPost text={item.text}
                                             poster={"@" + item.user_name}
                                             socialMedia={item.network}
                                             postTime={formatDistanceToNowStrict(fromUnixTime(item.unix), {addSuffix: true})}
                                             postLocation={item.user_location}
                                             postLink={item.link}
                                             metricTitles={metricTitles}
                                             metricAmounts={metricAmounts}/>
                        } else if (item.content_type === 'image' && selectedContentTypes.includes("Photos")) {
                            let metricTitles = ['likes']
                            let metricAmounts = [item.likes]
                            return <PhotoPost postLink={item.link}
                                              metricTitles={metricTitles}
                                              metricAmounts={metricAmounts}
                                              text={item.text}
                                              poster={"@" + item.user_name}
                                              socialMedia={item.network}
                                              postTime={formatDistanceToNowStrict(fromUnixTime(item.unix), {addSuffix: true})}
                                              postLocation={item.user_location}
                                              images={item.images}/>
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
