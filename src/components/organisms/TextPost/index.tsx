import React from 'react';
// @ts-ignore
import styled from "styled-components/native";
import PostMetadata from "../../molecules/PostMetadata";
import PostEngagement from "../../molecules/PostEngagement";


interface Props {
    metricTitles:string[];
    metricAmounts:string[];
    text: string;
    poster: string;
    socialMedia: string;
    postTime: string;
    postLocation: string;
    postLink: string;
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
    const {metricAmounts, metricTitles, text, poster, socialMedia, postTime, postLocation, postLink} = props

    const handleClick = () => {
        window.open(postLink)
    }

    return(
        <PostContainer>
            <PostTitle>{text}</PostTitle>
            <PostMetadata poster={poster} socialMedia={socialMedia} postTime={postTime} postLocation={postLocation}/>
            <PostEngagement metricTitles={metricTitles} metricAmounts={metricAmounts} onPress={handleClick}/>
        </PostContainer>
    )
}


TextPost.defaultProps = {
    metricTitles: ['views', 'thumbsup', "thumbsdown"],
    metricAmounts: ["0", "0", "0"],
    text: "Tweet not found",
    poster: "Unknown",
    socialMedia: "twitter",
    postTime: "Just Now",
    postLocation: "Unknown",
    postLink: ""
}

export default TextPost;
