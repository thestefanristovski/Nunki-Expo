import React from 'react';
// @ts-ignore
import styled from "styled-components/native";
import {PlayFilled} from "fluent-icons-react"


interface Props {
    length: string;
    imageSrc: string;
    onPress: () => void;
}

//TODO: Hover behavior of button (see react-native-web-hover)

const ThumbnailContainer = styled.TouchableOpacity`
  background-color: transparent;
  border-radius: 30px;
  padding: 0px;
  //width: 420px;
  //height: 250px;
  aspect-ratio: 16/9;
`

const ThumbnailImage = styled.Image`
  border-radius: 30px;
  //width: 420px;
  height: inherit;
  aspect-ratio: 16/9;
  border: #6083FF 1.5px solid;
`

const PlayButtonIcon = styled(PlayFilled)`
  width: 50px;
  height: 50px;
`

const VideoInfoContainer = styled.View`
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
        <ThumbnailContainer onPress={onPress}>
            <ThumbnailImage source={{uri: imageSrc}} resizeMode='cover'/>
            <VideoInfoContainer>
                <PlayButtonIcon color="#fff" size={50}/>
                <StyledText>{length}</StyledText>
            </VideoInfoContainer>
        </ThumbnailContainer>
    )
}


VideoThumbnail.defaultProps = {
    length: "00:00",
    imageSrc: "https://images.unsplash.com/photo-1635669390010-3adc3ea258c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    onPress: ()=> {},
}

export default VideoThumbnail;
