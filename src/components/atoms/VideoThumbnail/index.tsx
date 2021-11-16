import React from 'react';
import {Button, Pressable, Text, Image, ImageSourcePropType, View} from "react-native";
import styled from "styled-components/native";
import {PlayFilled} from "fluent-icons-react"


interface Props {
    length: string;
    imageSrc: string;
    onPress: () => void;
}

//TODO: Hover behavior of button (see react-native-web-hover)

const StyledPressable = styled.Pressable`
  background-color: white;
  border-radius: 30px;
  padding: 0px;
  width: 500px;
  height: 300px;
  border: white 1px solid;
`

const StyledImage = styled.Image`
  border-radius: 30px;
  width: 500px;
  height: 300px;
`

const StyledIcon = styled(PlayFilled)`
  width: 50px;
  height: 50px;
`

const StyledView = styled.View`
  position: absolute;
  left:45%;
  top:43%;
  bottom: 0;
  right: 0;
  background-color: transparent;
  width: 50px;
  height: 60px;
  padding: 0;
  margin: 0;
  border-radius: 20px;
`

const StyledText = styled.Text`
  color: white;
  text-align: center;
`

const VideoThumbnail = (props: Props) => {
    const {length, imageSrc, onPress} = props;
    return(
        <StyledPressable onPress={onPress}>
            <StyledImage source={{uri: imageSrc}} resizeMode='cover'/>
            <StyledView>
                <StyledIcon color="#fff" size={50}/>
                <StyledText>{length}</StyledText>
            </StyledView>
        </StyledPressable>
    )
}


VideoThumbnail.defaultProps = {
    length: "00:00",
    imageSrc: "https://images.unsplash.com/photo-1635669390010-3adc3ea258c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    onPress: ()=> {},
}

export default VideoThumbnail;
