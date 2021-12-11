import React from 'react';
// @ts-ignore
import styled from "styled-components/native";
import VideoThumbnail from "../../atoms/VideoThumbnail";
import PostMetadata from "../../molecules/PostMetadata";
import PostEngagement from "../../molecules/PostEngagement";


interface Props {
    metricTitles:string[];
    metricAmounts:string[];
    title: string;
    description: string;
    length: string;
    thumbnail: string;
    channel: string;
    socialMedia: string;
    postTime: string;
    postLocation: string;
    postLink: string;
}

const PostContainer = styled.View`
  background-color: #191932;
  border-radius: 30px;
  padding: 20px;
  margin: 20px;
  //width: fit-content;
  //max-width: 600px;
`

const PostText = styled.Text`
  color: white;
  font-size: 12px;
  padding: 20px 0px;
  //max-width: 400px;
  margin-top: 0px;
`

const PostTitle = styled.Text`
  color: white;
  font-size: 18px;
  padding: 0px 0px;
  //max-width: 400px;
  margin-bottom: 0px;
`

const VideoPost = (props: Props) => {

    const {metricTitles, metricAmounts, title, description, length, thumbnail, channel, socialMedia, postTime, postLocation, postLink} = props

    const handleClick = () => {
        window.open(postLink)
    }

    //format length
    function pad(num:number, size:number) {
        let numb = num.toString();
        while (numb.length < size) numb = "0" + numb;
        return numb;
    }

    const lenSeconds = Number(length)
    const mins = Math.floor(lenSeconds/60)
    const secs = lenSeconds - mins*60
    const formattedTime = pad(mins, 2) + ":" + pad(secs, 2);

    return(
        <PostContainer>
            <PostTitle>{title}</PostTitle>
            <PostText>{description.substring(0,140)}</PostText>
            <VideoThumbnail length={formattedTime} imageSrc={thumbnail}/>
            <PostMetadata poster={channel} socialMedia={socialMedia} postTime={postTime} postLocation={postLocation}/>
            <PostEngagement metricTitles={metricTitles} metricAmounts={metricAmounts} onPress={handleClick}/>
        </PostContainer>
    )
}


VideoPost.defaultProps = {
    title: "Unknown",
    description: "Description not found",
    length: "00:00",
    thumbnail: "https://images.unsplash.com/photo-1635669390010-3adc3ea258c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    channel: "Unknown",
    socialMedia: "youtube",
    postTime: "Just Now",
    postLocation: "Unknown",
    videoLink: "https://www.youtube.com/watch?v=cULMPGmFdIQ&ab_channel=A24",
    metricTitles: ['views', 'thumbsup', "thumbsdown"],
    metricAmounts: ["0", "0", "0"]
}

export default VideoPost;
