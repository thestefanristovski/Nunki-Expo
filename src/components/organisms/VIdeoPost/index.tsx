import React from 'react';
// @ts-ignore
import styled from "styled-components/native";
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
    title: string;
    description: string;
    length: string;
    thumbnail: string;
    channel: string;
    socialMedia: string;
    postTime: string;
    postLocation: string;
}

const StyledView = styled.View`
  background-color: #191932;
  border-radius: 30px;
  padding: 20px;
  margin: 10px;
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

const VideoPost = (props: Props) => {
    const {metricTitle1, metricAmount1, metricTitle2, metricAmount2, metricTitle3, metricAmount3, title, description, length, thumbnail, channel, socialMedia, postTime, postLocation} = props

    return(
        <StyledView>
            <StyledTitle>{title}</StyledTitle>
            <StyledText>{description}</StyledText>
            <VideoThumbnail length={length} imageSrc={thumbnail}/>
            <PostMetadata poster={channel} socialMedia={socialMedia} postTime={postTime} postLocation={postLocation}/>
            <PostEngagement metricTitle1={metricTitle1} metricAmount1={metricAmount1} metricTitle2={metricTitle2} metricAmount2={metricAmount2} metricTitle3={metricTitle3} metricAmount3={metricAmount3}/>
        </StyledView>
    )
}


VideoPost.defaultProps = {
    metricTitle1: "thumbsup",
    metricTitle2: "thumbsdown",
    metricTitle3: "views",
    metricAmount1: 0,
    metricAmount2: 0,
    metricAmount3: 0,
    title: "Unknown",
    description: "Description not found",
    length: "00:00",
    thumbnail: "https://images.unsplash.com/photo-1635669390010-3adc3ea258c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    channel: "Unknown",
    socialMedia: "youtube",
    postTime: "Just Now",
    postLocation: "Unknown"
}

export default VideoPost;
