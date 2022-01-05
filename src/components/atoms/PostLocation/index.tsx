import React from 'react';
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react"


interface Props {
    flag: string
    location: string
}

const PostMetaElementContainer = styled.View`
  display: inline-block;
  vertical-align: middle;
  line-height: 30px;
  padding: 0px 10px;
`

const PostMetadataText = styled.Text`
  color: white;
  font-size: 13px;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
`

const PostLocation = (props: Props) => {
    const {flag, location} = props;
    const icon: string = "fluent:location-12-filled";
    return(
        <PostMetaElementContainer>
            <Icon icon={icon} style={{color:"white", width:25, lineHeight:25, display:"inline-block", paddingRight:0, verticalAlign:"middle"}}/>
            <PostMetadataText>{location}</PostMetadataText>
        </PostMetaElementContainer>
    )
}


PostLocation.defaultProps = {
    flag: "france",
    location: "Nice, FR",
}

export default PostLocation;
