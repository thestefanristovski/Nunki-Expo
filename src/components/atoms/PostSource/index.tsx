import React from 'react';
import {Button, Pressable, Text, Image, ImageSourcePropType, View} from "react-native";
import styled from "styled-components/native";
import {Icon} from "@iconify/react"


interface Props {
    social: string
    poster: string
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
  color: black;
  font-size: 15px;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
`

const PostSource = (props: Props) => {
    const {social, poster} = props;
    const iconName = "akar-icons:" + social + "-fill";
    return(
        <StyledView>
            <Icon icon={iconName} style={{color:"red", width:25, lineHeight:25, display:"inline-block", paddingRight:10, verticalAlign:"middle"}}/>
            <StyledText>{poster}</StyledText>
        </StyledView>
    )
}


PostSource.defaultProps = {
    social: "youtube",
    poster: "Unknown",
}

export default PostSource;
