import React from 'react';
import {Button, Pressable, Text, View} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react";


interface Props {
    title: string;
    onPress: () => void;
}

const StyledText  = styled.Text`
    color: white;
    font-size: 15px;
    text-align: center;
    vertical-align: middle;
    display: inline-block;
`;

//TODO: Hover behavior of button (see react-native-web-hover)

const StyledView = styled.View`
  background-color: #6083FF;
  border-radius: 8px;
  padding: 5px;
  vertical-align: middle;
  display: inline-block;
  margin-right: 10px;
`

const StyledPressable = styled.Pressable`
  display: inline-block;
  margin-left: 8px;
  vertical-align: middle;
`

const KeywordPill = (props: Props) => {
    const {title, onPress} = props;
    return(
        <StyledView>
            <StyledText>{title}</StyledText>
            <StyledPressable onPress={onPress}>
                <Icon icon={"ci:off-close"} style={{width:15, height:15, color: "white"}}/>
            </StyledPressable>
        </StyledView>
    )
}


KeywordPill.defaultProps = {
    title: "Hello",
    onPress: ()=> {},
}

export default KeywordPill;
