import React from 'react';
import {Button, Pressable, Text, Image, ImageSourcePropType, View} from "react-native";
import styled from "styled-components/native";
import {Icon} from "@iconify/react"


interface Props {
    flag: string
    location: string
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
  padding: 0px 10px;
`

const StyledText = styled.Text`
  color: white;
  font-size: 13px;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
`

const PostLocation = (props: Props) => {
    const {flag, location} = props;
    const icon: string = "twemoji:flag-for-flag-" + flag;
    return(
        <StyledView>
            <Icon icon={icon} style={{color:"black", width:25, lineHeight:25, display:"inline-block", paddingRight:0, verticalAlign:"middle"}}/>
            <StyledText>{location}</StyledText>
        </StyledView>
    )
}


PostLocation.defaultProps = {
    flag: "france",
    location: "Nice, FR",
}

export default PostLocation;
