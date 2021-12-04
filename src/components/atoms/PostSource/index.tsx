import React from 'react';
import {Button, Pressable, Text, Image, ImageSourcePropType, View} from "react-native";
// @ts-ignore
import styled from 'styled-components/native';
import {Icon} from "@iconify/react"


interface Props {
    social: string
    poster: string
}

const PostMetaElementContainer = styled.View`
  display: inline-block;
  vertical-align: middle;
  line-height: 30px;
  padding-right: 10px;
`

const PostMetadataText = styled.Text`
  color: white;
  font-size: 13px;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
`

const PostSource = (props: Props) => {
    const {social, poster} = props;
    const iconName = "akar-icons:" + social + "-fill";
    return(
        <PostMetaElementContainer>
            <Icon icon={iconName} style={{color:"white", width:25, lineHeight:25, display:"inline-block", paddingRight:10, verticalAlign:"middle"}}/>
            <PostMetadataText>{poster}</PostMetadataText>
        </PostMetaElementContainer>
    )
}


PostSource.defaultProps = {
    social: "youtube",
    poster: "Unknown",
}

export default PostSource;
