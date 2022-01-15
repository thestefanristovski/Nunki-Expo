// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View, LogBox} from 'react-native';
import VideoPost from "../components/organisms/VIdeoPost";
import SearchBar from "../components/molecules/SearchBar";
import styled from "styled-components/native";
import { useQuery } from 'react-query'
import Masonry from "@react-native-seoul/masonry-list"
import PillMultiselect from "../components/organisms/PillMultiselect";
import Advanced from "../components/organisms/AdvancedSearch";
import {fromUnixTime, formatDistanceToNowStrict, parse} from 'date-fns'
import Map from "../components/organisms/Map"
import MainButton from "../components/atoms/MainButton";
import {QueryParamsProvider} from "../state/queryParams";
import TextPost from "../components/organisms/TextPost";
import PhotoPost from "../components/organisms/PhotoPost";
import ClusterMenu from "../components/organisms/ClusterMenu";


const SettingsContainer = styled.View`
  background-color: #111121;
  padding: 30px 30px 10px;
`

const PanelView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 20px;
  align-self: stretch;
  justify-content: space-between;
`

LogBox.ignoreAllLogs();

export default function Demo() {
    // List of Elements in Grid
    const [columns, setColumns] = useState(2);
    //State: Content Type Multiselect Menu
    const [contentTypes] = useState(["Photos", "Videos", "Text"])
    const [selectedContentTypes, setSelectedContentTypes] = useState(["Photos", "Videos", "Text"])
    //State: Pagination
    const [last, setLast] = useState<any[]>([])
    //State: clusters
    const [clusters, setCluster] = useState([])
    const [selectedClusters, setSelectedCluster] = useState([])
    const [clustersData, setClustersData] = useState([])
    //State: Page display
    const [onAdvanced, setOnAdvanced] = useState(false);
    const [onMap, setOnMap] = useState(false);
    const [mapSelected, setMapSelected] = useState(false)
    //Base URLs
    const youtubeBaseUrl = 'https://search.api.nunki.co/youtube/search?type=video&normalize=true'
    const vimeoBaseUrl = 'https://search.api.nunki.co/vimeo/search?type=video&normalize=true'
    const twitterBaseUrl = 'https://search.api.nunki.co/twitter/search?normalize=true'
    const clusteringBaseUrl = 'https://search.api.nunki.co/clustering/cluster?'
    //State: Query Parameters (sent from context)
    const [queryParameters, setQueryParameters] = useState('noQuery')

    // MAKING A QUERY =========================================================

    const fetchClusters = async (clusteringRequest:string, jsonBody:any) => {
        fetch(clusteringRequest, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(jsonBody) // body data type must match "Content-Type" header
        })
            .then(response => response.json())
            .then(clusterResults => {
                let clusterNames = []
                let clusterData = []
                if (clusterResults.clusters) {
                    clusterResults.clusters.forEach(item => {
                        clusterNames.push(item.words[0])
                        clusterData.push(item.data)
                    })
                }
                console.log(clusterData)
                setClustersData(clusterData)
                setCluster(clusterNames)
            })
    }

    const fetchData = async (key: any):Promise<any[]> => {

        let params = key.queryKey[1];
        console.log(params);

        if (params !== 'noQuery') {
            //get previous results or initialize new array
            let res = data;
            if (res === undefined) {
                res = [];
            }

            //insert all parameters passed from context
            let parameters = `&limit=10&sort=${params.orderBy}&anyKeywords=${params.anyKeywords.join(',')}`
                + `${params.lat && params.long && params.radius ? `&lat=${params.lat}&lng=${params.long}&radius=${params.radius > 25000 ? 25000 : params.radius}`:''}`
                + `${params.excludedKeywords.length !== 0 ? `&notKeywords=${params.excludedKeywords.join(',')}`: ''}`
                + `${params.startDate !== 'noDate' ? `&min=${(parse(key.queryKey[1].startDate, 'yyyy/MM/dd', new Date()).getTime())/1000}`:''}`
                + `${params.endDate !== 'noDate' ? `&max=${(parse(key.queryKey[1].endDate, 'yyyy/MM/dd', new Date()).getTime())/1000}`:''}`

            let urlYoutube = youtubeBaseUrl + parameters;
            let urlVimeo = vimeoBaseUrl + parameters;
            let urlTwitter = twitterBaseUrl + parameters + '&type=' + params.selectedContentTypes.join(',').toLowerCase();

            //attach the next parameter if load more was pressed
            if (last.length !== 0) {
                urlYoutube += '&next=' + last[0];
                urlVimeo += '&next=' + last[1];
                urlTwitter += '&next=' + last[2];
            }

            //fetch data
            await Promise.all([
                fetch(urlYoutube),
                fetch(urlVimeo),
                fetch(urlTwitter),
            ])
            .then(([resYT, resVim, resTw]) => Promise.all([resYT.json(), resVim.json(), resTw.json()]))
            .then(([dataYT, dataVim, dataTw]) => {
                let next:any[] = [];
                if (dataYT.contents !== undefined && params.selectedPlatforms.includes('Youtube') && params.selectedContentTypes.includes('Video')) {
                    res = res.concat(dataYT.contents);
                }
                if (dataVim.contents !== undefined && params.selectedPlatforms.includes('Vimeo') && params.selectedContentTypes.includes('Video')) {
                    res = res.concat(dataVim.contents);
                }
                if (dataTw.contents !== undefined && params.selectedPlatforms.includes('Twitter')) {
                    res = res.concat(dataTw.contents);
                }
                //set next attributes for load more
                next = next.concat([dataYT.next, dataVim.next, dataTw.next])
                setLast(next)
            }).then(() => {
                let clusteringRequest = clusteringBaseUrl + `exclude=${params.anyKeywords.join(',')}`
                    + `&cluster_num=4`;
                let jsonBody = {
                    "network":"Twitter",
                    "length":res?.length,
                    "next":"",
                    "contents":res?.filter((item) => {console.log(item.network); return item.network !== 'vimeo'}),
                };

                console.log(jsonBody);
                console.log(JSON.stringify(jsonBody));
                fetchClusters(clusteringRequest, jsonBody)
            })

            console.log(res);
            return res;
        }
        else {
            return [];
        }
    }

    const { data, refetch, status } = useQuery(["key", queryParameters], fetchData, { refetchOnWindowFocus: false } );

    const makeQuery = async (text:string) => {
        setQueryParameters(text);
    }

    useEffect(() => {
        return () => {
            // This is the cleanup function
        }
    }, []);

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
        console.log(selectedClusters)
        if (selectedClusters.includes(element)) {
            setSelectedCluster(selectedClusters.filter(selectedItem => selectedItem != element));
        } else if (element === "All") {
            setSelectedCluster(clusters);
        } else {
            setSelectedCluster(selectedClusters.concat(element));
        }
    }

    //FUNCTIONS FOR PAGE STATE CHANGE ==================================================
    const onChangeAdvanced = (changeTo: boolean) => {
        setOnAdvanced(changeTo);
    }

    const onChangeMap = (changeTo: boolean) => {
        /*
        if (changeTo) {
            setMapSelected(false);
        }
         */
        setOnMap(changeTo);
    }

    const onSelectLocation = (mapSelected:boolean) => {
        setOnMap(false);
        setMapSelected(mapSelected)
    }

    return (
        <QueryParamsProvider>
            <SettingsContainer>
                <SearchBar onPressSearch={makeQuery} onAdvanced={onAdvanced} onChangeAdvanced={onChangeAdvanced} onChangeMap={onChangeMap} onMap={onMap} hasLocation={mapSelected}/>
                {!onMap && !onAdvanced &&
                <PanelView>
                    <View>
                        <PillMultiselect options={contentTypes} selected={selectedContentTypes} onSelected={changedContentType} />
                    </View>
                </PanelView>}
                {onAdvanced && <Advanced/>}
                {onMap && <Map onSelectLocation={onSelectLocation}/>}
            </SettingsContainer>
            {clusters.length!==0 && <ClusterMenu onSelected={changedCluster} options={clusters} selected={selectedClusters} optionsData={clustersData}/>}
            <View style={{zIndex:-10}}>
                {status === 'success' && <Masonry
                    data = {data}
                    numColumns = {columns}
                    renderItem = {({item}) => {
                        if (item.content_type === 'video' && selectedContentTypes.includes("Videos")) {
                            let metricTitles = ['views', 'thumbsup', "thumbsdown"]
                            let metricAmounts = [item.views, item.likes, item.dislikes]
                            if (item.network === 'vimeo') {
                                metricTitles = ['views', 'likes', "comments"]
                            }
                            if (item.location) {
                                let coords = []
                                item.location.coordinates.forEach(element => {coords.push(element.toFixed(2))})
                                item.location.coordinates = coords;
                            }
                            if (item.network === 'youtube' || item.network === 'vimeo' ) {
                                return <VideoPost key={item.text}
                                                  title={item.title}
                                                  description={item.text}
                                                  metricTitles={metricTitles}
                                                  metricAmounts={metricAmounts}
                                                  thumbnail={item.image}
                                                  channel={item.user_fullname}
                                                  socialMedia={item.network}
                                                  postTime={formatDistanceToNowStrict(fromUnixTime(item.unix), {addSuffix: true})}
                                                  postLocation={item.location && item.location.coordinates.join(', ')}
                                                  postLink={item.link}
                                                  length={item.duration}/>
                            } else if (item.network === 'twitter') {
                                metricTitles = ['likes']
                                metricAmounts = [item.likes]
                                return <VideoPost key={item.text}
                                                  title={item.text}
                                                  description={''}
                                                  metricTitles={metricTitles}
                                                  metricAmounts={metricAmounts}
                                                  thumbnail={item.user_thumb}
                                                  channel={"@" + item.user_name}
                                                  socialMedia={item.network}
                                                  postTime={formatDistanceToNowStrict(fromUnixTime(item.unix), {addSuffix: true})}
                                                  postLocation={item.user_location}
                                                  postLink={item.link}
                                                  length={Math.floor(item.duration/1000)}/>
                            } else {
                                return null
                            }
                        } else if (item.content_type === 'text' && selectedContentTypes.includes("Text")){
                            let metricTitles = ['likes']
                            let metricAmounts = [item.likes]
                            return <TextPost key={item.text}
                                             text={item.text}
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
                            return <PhotoPost key={item.text}
                                              postLink={item.link}
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
                    <MainButton title={"Load More"} onPress={refetch}/>
                </View>
                }
                {status === 'loading' && <ActivityIndicator size="large" color="white"/> }
                {status === 'error' &&
                <SettingsContainer>
                    <Text style={{color: 'white'}}>There was an error loading your results.</Text>
                </SettingsContainer>}
            </View>
        </QueryParamsProvider>

    )
}
