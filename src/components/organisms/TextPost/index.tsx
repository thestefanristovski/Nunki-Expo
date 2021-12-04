import React from 'react';
// @ts-ignore
import styled from "styled-components/native";
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
    poster: string;
    socialMedia: string;
    postTime: string;
    postLocation: string;
}

const PostContainer = styled.View`
  background-color: #191932;
  border-radius: 30px;
  padding: 20px;
  margin: 10px;
  width: fit-content;
`

const StyledText = styled.Text`
  color: white;
  font-size: 13px;
  padding: 20px 0px;
`

const PostTitle = styled.Text`
  color: white;
  font-size: 18px;
  padding: 0px 0px;
  max-width: 400px;
`

const TextPost = (props: Props) => {
    const {metricTitle1, metricAmount1, metricTitle2, metricAmount2, metricTitle3, metricAmount3, text, poster, socialMedia, postTime, postLocation} = props

    return(
        <PostContainer>
            <PostTitle>{text}</PostTitle>
            <PostMetadata poster={poster} socialMedia={socialMedia} postTime={postTime} postLocation={postLocation}/>
            <PostEngagement metricTitle1={metricTitle1} metricAmount1={metricAmount1} metricTitle2={metricTitle2} metricAmount2={metricAmount2} metricTitle3={metricTitle3} metricAmount3={metricAmount3} onPress={() => {}}/>
        </PostContainer>
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
