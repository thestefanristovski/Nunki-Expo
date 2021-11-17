import React from 'react';
import {Button, Pressable, Text, Image, ImageSourcePropType, View} from "react-native";
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

const StyledPressable = styled.Pressable`
  background-color: white;
  border-radius: 30px;
  padding: 0px;
  width: 500px;
  height: 300px;
  border: white 1px solid;
`

const StyledView = styled.View`
  display: inline-block;
  vertical-align: middle;
  line-height: 30px;
  padding-top: 10px;
`

const StyledText = styled.Text`
  color: #6A6A9F;
  font-size: 13px;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  padding: 0px 5px;
`

const PostMetadata = (props: Props) => {
    const {socialMedia, poster, postTime, postFlag, postLocation} = props;

    return(
        <StyledView>
            <PostSource social={socialMedia} poster={poster}/>
            <StyledText>{postTime}</StyledText>
            <PostLocation flag={postFlag} location={postLocation}/>
        </StyledView>
    )
}


PostMetadata.defaultProps = {
    socialMedia: "youtube",
    poster: "Unknown",
    postTime: "just now",
    postFlag: "france",
    postLocation: "FR"
}

export default PostMetadata;
