import React from 'react';
// @ts-ignore
import styled from "styled-components/native";
import PostMetadata from "../../molecules/PostMetadata";
import PostEngagement from "../../molecules/PostEngagement";
import FBCollage from "react-native-fb-collage";


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
    images: string[];
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
  font-size: 18px;
  padding: 0px 0px;
`

const PhotoPost = (props: Props) => {
    const {metricTitle1, metricAmount1, metricTitle2, metricAmount2, metricTitle3, metricAmount3, text, poster, socialMedia, postTime, postLocation, images} = props

    return(
        <StyledView>
            <StyledTitle>{text}</StyledTitle>
            <FBCollage
            images={images}
            width={420}/>
            <PostMetadata poster={poster} socialMedia={socialMedia} postTime={postTime} postLocation={postLocation}/>
            <PostEngagement metricTitle1={metricTitle1} metricAmount1={metricAmount1} metricTitle2={metricTitle2} metricAmount2={metricAmount2} metricTitle3={metricTitle3} metricAmount3={metricAmount3}/>
        </StyledView>
    )
}


PhotoPost.defaultProps = {
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
    postLocation: "Unknown",
    images: ['https://images.unsplash.com/photo-1637090404371-e04d03de9be5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80', 'https://images.unsplash.com/photo-1593642633279-1796119d5482?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=688&q=80', 'https://images.unsplash.com/photo-1637090404371-e04d03de9be5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80', 'https://images.unsplash.com/photo-1593642633279-1796119d5482?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=688&q=80']
}

export default PhotoPost;
