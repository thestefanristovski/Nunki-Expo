import React from 'react';
import {Button, Pressable, Text, Image, ImageSourcePropType, View} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react"
import PostSource from "../../atoms/PostSource";
import PostLocation from "../../atoms/PostLocation";


interface Props {
    socialMedia:string;
    poster:string;
    postTime:string;
    postFlag:string
    postLocation:string
}

const MetadataContainer = styled.View`
  display: inline-block;
  vertical-align: middle;
  line-height: 30px;
  padding-top: 10px;
`

const PostMetadataTextSecondary = styled.Text`
  color: #6A6A9F;
  font-size: 13px;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  padding: 0px 5px;
`

const PostMetadata = (props: Props) => {
    const {socialMedia, poster, postTime, postFlag, postLocation} = props;

    if (postLocation === "undefined") {
        return(
            <MetadataContainer>
                <PostSource social={socialMedia} poster={poster}/>
                <PostMetadataTextSecondary>{postTime}</PostMetadataTextSecondary>
            </MetadataContainer>
        )
    } else {
        return(
            <MetadataContainer>
                <PostSource social={socialMedia} poster={poster}/>
                <PostMetadataTextSecondary>{postTime}</PostMetadataTextSecondary>
                <PostLocation flag={postFlag} location={postLocation}/>
            </MetadataContainer>
        )
    }
}


PostMetadata.defaultProps = {
    socialMedia: "youtube",
    poster: "Unknown",
    postTime: "just now",
    postFlag: "france",
    postLocation: "FR"
}

export default PostMetadata;
