import React from 'react';
import {Button, Pressable, Text, Image, ImageSourcePropType, View} from "react-native";
import styled from "styled-components/native";
import {Icon} from "@iconify/react"
import PostSource from "../../atoms/PostSource";
import PostLocation from "../../atoms/PostLocation";
import EngagementMetric from "../../atoms/EngagementMetric";
import VideoThumbnail from "../../atoms/VideoThumbnail";
import PostMetadata from "../../molecules/PostMetadata";
import PostEngagement from "../../molecules/PostEngagement";


interface Props {
    metricTitle1:string;
    metricAmount1:string;
    metricTitle2:string;
    metricAmount2:string;
    metricTitle3:string;
    metricAmount3:string;
    text: string;
    length: string;
    thumbnail: string;
    poster: string;
    socialMedia: string;
    postTime: string;
    postLocation: string;
}

const StyledView = styled.View`
  background-color: #191932;
  border-radius: 30px;
  padding: 20px;
  margin: 20px;
`

const StyledText = styled.Text`
  color: white;
  font-size: 13px;
  padding: 20px 0px;
`

const StyledTitle = styled.Text`
  color: white;
  font-size: 20px;
  padding: 0px 0px;
`

const TextPost = (props: Props) => {
    const {metricTitle1, metricAmount1, metricTitle2, metricAmount2, metricTitle3, metricAmount3, text, poster, socialMedia, postTime, postLocation} = props

    return(
        <StyledView>
            <StyledTitle>{text}</StyledTitle>
            <PostMetadata poster={poster} socialMedia={socialMedia} postTime={postTime} postLocation={postLocation}/>
            <PostEngagement metricTitle1={metricTitle1} metricAmount1={metricAmount1} metricTitle2={metricTitle2} metricAmount2={metricAmount2} metricTitle3={metricTitle3} metricAmount3={metricAmount3}/>
        </StyledView>
    )
}


TextPost.defaultProps = {
    metricTitle1: "likes",
    metricTitle2: "retweets",
    metricTitle3: "comments",
    metricAmount1: 0,
    metricAmount2: 0,
    metricAmount3: 0,
    text: "Tweet not found",
    poster: "Unknown",
    socialMedia: "twitter",
    postTime: "Just Now",
    postLocation: "Unknown"
}

export default TextPost;
