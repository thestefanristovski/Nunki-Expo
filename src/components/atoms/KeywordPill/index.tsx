import React from 'react';
import {Button, Pressable, Text, View} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react";


interface Props {
    title: string;
    onPress: (param:string) => void;
}

const PillText  = styled.Text`
    color: white;
    font-size: 15px;
    text-align: center;
    vertical-align: middle;
    display: inline-block;
`;

//TODO: Hover behavior of button (see react-native-web-hover)

const PillContainer = styled.View`
  background-color: #6083FF;
  border-radius: 8px;
  padding: 5px;
  vertical-align: middle;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 5px;
  margin-top: 5px;
`

const PillCloseButtonContainer = styled.TouchableOpacity`
  display: inline-block;
  margin-left: 8px;
  vertical-align: middle;
`

const KeywordPill = (props: Props) => {
    const {title, onPress} = props;
    return(
        <PillContainer>
            <PillText>{title}</PillText>
            <PillCloseButtonContainer onPress={() => onPress(title)}>
                <Icon icon={"ci:off-close"} style={{width:15, height:15, color: "white"}}/>
            </PillCloseButtonContainer>
        </PillContainer>
    )
}


KeywordPill.defaultProps = {
    title: "Hello",
    onPress: ()=> {},
}

export default KeywordPill;
