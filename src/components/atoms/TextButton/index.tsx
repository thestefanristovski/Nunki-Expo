import React from 'react';
import {Button, Pressable, Text} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react";
import {Link} from "react-router-dom";



interface Props {
    onPress: () => void;
    title: string;
    link: string;
}

//TODO: Hover behavior of button (see react-native-web-hover)

const TextButtonContainer = styled.TouchableOpacity`
  background-color: transparent;
  line-height: 2px;
  padding: 5px 2px;
  vertical-align: left;
`

const ButtonText = styled.Text`
  color: white;
  font-size: 14px;
`

const TextButton = (props: Props) => {
    const { onPress, title, link} = props;
    return(
        <Link to={link}>
            <TextButtonContainer onPress={onPress}>
                <ButtonText>{title}</ButtonText>
            </TextButtonContainer>
        </Link>
    )
}


TextButton.defaultProps = {
    onPress: ()=> {},
}

export default TextButton;
